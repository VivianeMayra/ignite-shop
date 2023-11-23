import { styled } from "../../styles"

export const CartButtonContainer = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: 6,
  position: "relative",

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  background: "$gray200",
  color: "$gray350",

  width: "3rem",
  height: "3rem",
  marginRight: "100px",

  "@media (max-width: 480px)": {
    marginRight: 0,
  },

  variants: {
    color: {
      gray: {
        background: "$gray200",
        color: "$gray350",
      },
      green: {
        marginRight: "0px",
      },
    },
  },

  defaultVariants: {
    color: "gray",
  },
})
