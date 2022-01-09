import { SiteFrame } from '../components/common/site-frame';
import type { AppProps } from 'next/app'
import { StylesProvider } from '@material-ui/core/styles';
import 'react-flexbox-grid/dist/react-flexbox-grid.css'

const MyApp = ({ Component, pageProps}: AppProps) => {

  return (
    <StylesProvider>
      <SiteFrame>
        <Component {...pageProps} />
      </SiteFrame>
    </StylesProvider>
  );
}

export default MyApp;