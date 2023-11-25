import Image from "next/legacy/image"
import { HomeContainer, Product } from "../styles/pages/home"
import { useKeenSlider } from "keen-slider/react"
import Link from "next/link"
import "keen-slider/keen-slider.min.css"
import { useMediaQuery } from "react-responsive"
import { GetStaticProps } from "next"
import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import { CartButton } from "../components/CartButton"
import { useCart } from "../hooks/useCart"
import { IProduct } from "../contexts/CartContext"
import { MouseEvent } from "react"

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const isMobile = useMediaQuery({ maxWidth: 480 })
  const slideCount = isMobile ? 1 : 2
  const slideSpacing = isMobile ? 15 : 48
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: slideCount,
      spacing: slideSpacing,
    },
  })

  const { addToCart, checkIfItemAlreadyExists } = useCart()

  function handleAddToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={350} height={350} alt="" />
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span> {product.price}</span>
                </div>
                <CartButton
                  color="green"
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={checkIfItemAlreadyExists(product.id)}
                />
              </footer>
            </Product>
          </Link>
        )
      })}
    </HomeContainer>
  )
}
//conectando aplicação a stripe
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
      numberPrice: price.unit_amount! / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours, tudo que tá dentro do return é um json
  }
}
