import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/legacy/image"
import { useRouter } from "next/router"
import { useState } from "react"

import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  //Ferramenta de renderização
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  //teste
  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      })
      const { checkoutUrl } = response.data

      //como estamos direcionando o user para uma página externa (stripe) que
      //não faz parte da nossa aplicação, usamos o seguinte método:
      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert("Falha ao redirecionar checkout!")
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={500} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>
          Comprar Agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

//quais são as páginas e parâmetros que queremos criar as versões estáticas
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "" },
      },
    ],
    fallback: true,
  }
}

interface ProductId {
  params: {
    id: string
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: ProductId) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  }
}
