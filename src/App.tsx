import "./App.css";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HrRatio } from "./Forms/hr-ratio";
function App() {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Inter',
        textTransform: 'none',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
    
    <Box style={{width:"84%"}}>
      <HrRatio />
    </Box>
    </ThemeProvider>
  );
}

export default App;
