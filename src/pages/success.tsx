import { GetServerSideProps } from "next"
import Image from "next/legacy/image"
import Link from "next/link"
import Stripe from "stripe"
import { stripe } from "../lib/stripe"
import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from "../styles/pages/success"

interface SuccessProps {
  costumerName: string
  product: {
    name: string
    imageUrl: string
  }
  productsImages: string[]
}
export default function Success({
  costumerName,
  product,
  productsImages,
}: SuccessProps) {
  return (
    <SuccessContainer>
      <ImagesContainer>
        {productsImages.map((image, i) => (
          <ImageContainer key={i}>
            <Image src={image} width={90} height={90} alt="" />
          </ImageContainer>
        ))}
      </ImagesContainer>
      <h1>Compra efetuada!</h1>

      <p>
        Uhuul <strong>{costumerName}</strong>, sua compra de{" "}
        <strong>{productsImages.length}</strong> camisetas já está a caminho da
        sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  })

  const costumerName = session.customer_details?.name
  const productsImages = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product
    return product.images[0]
  })

  return {
    props: {
      costumerName,
      productsImages,
    },
  }
}
