import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Box from '@mui/material/Box';

/** GLSL vertex shader — UV 좌표 전달 */
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

/** GLSL fragment shader — Simplex Noise 그라데이션 + 스크롤 연동 */
const fragmentShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uResolution;
  uniform float uGrainIntensity;

  varying vec2 vUv;

  // Simplex Noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Film Grain
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    // Simplex Noise로 경계면 일렁임 (시간에 따라 웨이브)
    float wave = snoise(vec2(vUv.x * 1.5, uTime * 0.25)) * 0.08;
    float distortedY = vUv.y + wave;

    // 스크롤에 따라 그라데이션이 아래에서 위로 올라옴
    float scrollEffect = uScrollProgress * 1.2;
    float mask = smoothstep(scrollEffect - 0.3, scrollEffect + 0.2, distortedY);

    // 기본 알파값 (위: 투명 → 아래: 불투명)
    float baseAlpha = 0.0;
    if (distortedY < 0.1) {
      baseAlpha = mix(0.0, 0.05, smoothstep(0.0, 0.1, distortedY));
    } else if (distortedY < 0.3) {
      baseAlpha = mix(0.05, 0.1, smoothstep(0.1, 0.3, distortedY));
    } else if (distortedY < 0.6) {
      baseAlpha = mix(0.1, 0.2, smoothstep(0.3, 0.6, distortedY));
    } else {
      baseAlpha = mix(0.2, 0.3, smoothstep(0.6, 1.0, distortedY));
    }

    // 스크롤에 따라 알파가 점점 증가 (콘텐츠가 올라올수록 진해짐)
    float alpha = baseAlpha * (0.5 + uScrollProgress * 0.5);

    // 배경 색상: #0a0a12 = rgb(10, 10, 18)
    vec3 color = vec3(10.0/255.0, 10.0/255.0, 18.0/255.0);

    // 필름 그레인 (미세한 텍스처 효과)
    float grain = random(vUv * uResolution + uTime) * uGrainIntensity;
    color += grain;

    gl_FragColor = vec4(color, alpha);
  }
`;

/**
 * ResultGradientOverlay 컴포넌트
 *
 * 결과 섹션 전용 Three.js WebGL 기반 그라데이션 오버레이.
 * Simplex Noise로 경계면이 유기적으로 일렁이며, 스크롤에 따라 색상이 전환된다.
 *
 * 동작 흐름:
 * 1. 스크롤하면 그라데이션이 아래에서 위로 올라오며 진해진다
 * 2. 경계면이 Simplex Noise로 시간에 따라 물결치듯 변형된다
 * 3. 필름 그레인 텍스처가 미세하게 오버레이된다
 *
 * Props:
 * @param {object} containerRef - 스크롤 기준 컨테이너의 React ref [Required]
 * @param {boolean} isGrain - 필름 그레인 효과 여부 [Optional, 기본값: true]
 * @param {number} grainIntensity - 필름 그레인 강도 (0~0.1) [Optional, 기본값: 0.02]
 * @param {number} height - 오버레이 높이 [Optional, 기본값: '30vh']
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <ResultGradientOverlay containerRef={containerRef} height="40vh" />
 */
function ResultGradientOverlay({
  containerRef,
  isGrain = true,
  grainIntensity = 0.02,
  height = '30vh',
  sx = {},
}) {
  const canvasContainerRef = useRef(null);
  const animationIdRef = useRef(0);
  const uniformsRef = useRef(null);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const containerWidth = container.offsetWidth || window.innerWidth;
    const containerHeight = container.offsetHeight || window.innerHeight * 0.3;

    /** Three.js 씬 초기화 */
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uResolution: { value: new THREE.Vector2(containerWidth, containerHeight) },
      uGrainIntensity: { value: isGrain ? grainIntensity : 0 },
    };
    uniformsRef.current = uniforms;

    /** 셰이더 머티리얼 생성 */
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /** 스크롤 진행률 추적 */
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const updateScrollTarget = () => {
      if (!containerRef?.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;

      targetScrollProgress = Math.min(1, Math.max(0, scrolled / totalHeight));
    };

    /** 리사이즈 대응 */
    const handleResize = () => {
      const newWidth = container.offsetWidth || window.innerWidth;
      const newHeight = container.offsetHeight || window.innerHeight * 0.3;
      renderer.setSize(newWidth, newHeight);
      uniforms.uResolution.value.set(newWidth, newHeight);
    };

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', handleResize);

    /** 렌더 루프 */
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // 부드러운 스크롤 보간
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;

      uniforms.uTime.value = elapsedTime;
      uniforms.uScrollProgress.value = currentScrollProgress;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    /** 리소스 정리 */
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [containerRef, isGrain, grainIntensity]);

  return (
    <Box
      ref={canvasContainerRef}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: height,
        pointerEvents: 'none',
        zIndex: 0,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(12px)',
        overflow: 'hidden',
        '& canvas': {
          width: '100% !important',
          height: '100% !important',
          display: 'block',
        },
        ...sx,
      }}
    />
  );
}

export default ResultGradientOverlay;
