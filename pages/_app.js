import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <div className="container mx-auto min-h-screen">
          <Component {...pageProps} />
        </div>
        <Footer />
      </AuthContextProvider>
    </>
  )
}
