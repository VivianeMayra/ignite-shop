import Image from "next/legacy/image"
import { HomeContainer, Product } from "../styles/pages/home"
import { useKeenSlider } from "keen-slider/react"
import Link from "next/link"
import "keen-slider/keen-slider.min.css"
import { useMediaQuery } from "react-responsive"
import { GetStaticProps } from "next"
import { stripe } from "../lib/stripe"
import Stripe from "stripe"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const isMobile = useMediaQuery({ maxWidth: 480 })
  const slideCount = isMobile ? 1 : 3
  const slideSpacing = isMobile ? 15 : 48
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: slideCount,
      spacing: slideSpacing,
    },
  })

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
              <Image src={product.imageUrl} width={520} height={500} alt="" />
              <footer>
                <strong>{product.name}</strong>
                <span> {product.price}</span>
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
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
