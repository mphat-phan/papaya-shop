import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../themes';
import { Provider } from 'react-redux';
import store from '../store';
import { CssBaseline } from '@mui/material';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';

registerChartJs();
function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline></CssBaseline>
                {
                    getLayout(<Component {...pageProps} />)
                }
                
            </ThemeProvider>
        </Provider>
    )
}
export default MyApp
