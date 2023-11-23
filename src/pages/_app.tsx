import { AppProps } from "next/app"
import { globalStyle } from "../styles/global"
import logoIgnite from "../assets/logoIgnite.svg"
import { Container, Header } from "../styles/pages/app"
import Image from "next/legacy/image"
import { Cart } from "../components/Cart"
import { CartContextProvider } from "../contexts/CartContext"
import Link from "next/link"
globalStyle()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoIgnite} alt="" />
          </Link>
          <Cart />
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}
