import Layout from '../components/Layout'
import Header from '../components/Header'

const App = ({ Component, pageProps }) => (
  <Layout>
    <Header />
    <Component {...pageProps} />
  </Layout>
)

export default App;