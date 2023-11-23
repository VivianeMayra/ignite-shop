import { ShoppingCart } from "@phosphor-icons/react"
import { CartButtonContainer } from "./styles"
import { ComponentProps } from "react"

type CartButtonProps = ComponentProps<typeof CartButtonContainer>

export function CartButton({ ...rest }: CartButtonProps) {
  return (
    <CartButtonContainer {...rest}>
      <ShoppingCart weight="bold" size={24} />
    </CartButtonContainer>
  )
}
