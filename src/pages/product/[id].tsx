import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/legacy/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product"
import { IProduct } from "../../contexts/CartContext"
import { useCart } from "../../hooks/useCart"

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  //Ferramenta de renderização
  const { isFallback } = useRouter()

  const { addToCart, checkIfItemAlreadyExists } = useCart()

  if (isFallback) {
    return <p>Loading...</p>
  }

  const itemAlreadyInCart = checkIfItemAlreadyExists(product.id)

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={500} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button disabled={itemAlreadyInCart} onClick={() => addToCart(product)}>
          {itemAlreadyInCart
            ? "Produto já está no carrinho"
            : "Colocar na sacola"}
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

// Quais são as páginas e parâmetros que queremos criar as versões estáticas
export const getStaticPaths: GetStaticPaths = async () => {
  // IDs dos produtos
  const productIds = [
    "prod_NRlOqJsPWvGfgi",
    "prod_NRlNQ5iBdEReZS",
    "prod_NRlMSRFM1fsObR",
    "prod_NRlK86bcw0J6ZP",
    "prod_NRlHcW0ad0wcSo",
    "prod_NRkySx8v35OJnZ",
  ]

  // Crie os caminhos usando os IDs dos produtos
  const paths = productIds.map((productId) => ({
    params: { id: productId },
  }))

  return {
    paths,
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
        numberPrice: price.unit_amount! / 100,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  }
}
