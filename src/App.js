import { ShopContextProvider } from './ShopContext/ShopContext';
import Pages from "./Pages";
import { ThemeProvider } from '@mui/material';
import theme from './Styles/theme'

function App() {

  return (

      <ShopContextProvider>
         <ThemeProvider theme={theme} >
         <Pages />     
         </ThemeProvider>
         
      </ShopContextProvider>
  );
}

export default App;
