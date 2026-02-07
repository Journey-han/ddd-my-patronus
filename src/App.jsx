import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { defaultTheme as theme } from './styles/themes';
import PatronusPage from './pages/PatronusPage';

function HomePage() {
  return (
    <Box
      sx={{
        p: 4,
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        backgroundColor: '#0a0a12',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontFamily: '"Cinzel", serif',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #87CEEB 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Patronus Finder
      </Typography>
      <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
        당신의 수호령을 찾아보세요
      </Typography>
      <Button
        component={Link}
        to="/patronus"
        variant="outlined"
        sx={{
          mt: 2,
          px: 4,
          py: 1.5,
          borderColor: 'rgba(135, 206, 235, 0.5)',
          color: '#87CEEB',
          fontFamily: '"Cinzel", serif',
          '&:hover': {
            borderColor: '#87CEEB',
            backgroundColor: 'rgba(135, 206, 235, 0.1)',
          },
        }}
      >
        Start
      </Button>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/patronus" element={<PatronusPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
