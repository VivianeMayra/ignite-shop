import * as Dialog from "@radix-ui/react-dialog"
import { CartButton } from "../CartButton"
import { X } from "@phosphor-icons/react"
import {
  CartClose,
  CartContent,
  CartDialogPortal,
  CartFinalization,
  CartFinalizationDetails,
  CartFinalizationDetailsContainer,
  CartProduct,
  CartProductDetails,
  CartProductImage,
} from "./styles"
import Image from "next/image"
import { useCart } from "../../hooks/useCart"
import { useState } from "react"
import axios from "axios"

export function Cart() {
  const { cartItems, removeCartItem, cartTotal } = useCart()
  const cartQuantity = cartItems.length

  const formattedCartTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post("/api/checkout", {
        products: cartItems,
      })

      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert("Falha de redirecionamento!")
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <CartDialogPortal>
        <CartContent>
          <CartClose>
            <X weight="bold" size={24} />
          </CartClose>

          <h2>Sacola de Compras</h2>
          <section>
            {cartQuantity <= 0 && <p>Parece que seu carrinho está vazio :(</p>}

            {cartItems.map((cartItem) => (
              <CartProduct key={cartItem.id}>
                <CartProductImage>
                  <Image
                    width={90}
                    height={80}
                    alt=""
                    src={cartItem.imageUrl}
                  />
                </CartProductImage>
                <CartProductDetails>
                  <p>{cartItem.name}</p>
                  <strong>{cartItem.price}</strong>
                  <button onClick={() => removeCartItem(cartItem.id)}>
                    Remover
                  </button>
                </CartProductDetails>
              </CartProduct>
            ))}
          </section>

          <CartFinalization>
            <CartFinalizationDetailsContainer>
              <CartFinalizationDetails>
                <p>Quantidade</p>
                <strong>
                  {cartQuantity} {cartQuantity > 1 ? "itens" : "item"}
                </strong>
              </CartFinalizationDetails>
              <CartFinalizationDetails>
                <p>Valor Total</p>
                <strong>{formattedCartTotal}</strong>
              </CartFinalizationDetails>
            </CartFinalizationDetailsContainer>
            <button
              onClick={handleCheckout}
              disabled={isCreatingCheckoutSession || cartQuantity <= 0}
            >
              Finalizar Compra
            </button>
          </CartFinalization>
        </CartContent>
      </CartDialogPortal>
    </Dialog.Root>
  )
}
