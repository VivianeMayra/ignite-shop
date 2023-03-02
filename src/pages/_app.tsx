import { AppProps } from "next/app"
import { globalStyle } from "../styles/global"
import logoIgnite from "../assets/logoIgnite.svg"
import { Container, Header } from "../styles/pages/app"
import Image from "next/legacy/image"
globalStyle()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoIgnite} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
