import '@styles/globals.css'
import Web3Provider from 'providers/web3'

const Noop = ({children}) => <>{children}</>

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? Noop
  return (
    <Web3Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Provider>
  )

}

export default MyApp
