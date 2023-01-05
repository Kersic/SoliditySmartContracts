import '@styles/globals.css'
import Web3Provider from 'providers/web3'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const Noop = ({children}) => <>{children}</>

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? Noop
  return (
    <Web3Provider>
      <Layout>
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </Web3Provider>
  )

}

export default MyApp
