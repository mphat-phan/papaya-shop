import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../themes';
import { Provider } from 'react-redux';
import store from '../store';
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
export default MyApp
