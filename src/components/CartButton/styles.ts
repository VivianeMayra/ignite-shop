import { styled } from "../../styles"

export const CartButtonContainer = styled("button", {
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: 6,

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  background: "$gray200",
  color: "$gray350",

  width: "3rem",
  height: "3rem",
  marginRight: "100px",

  span: {
    position: "absolute",
    width: "1.25rem",
    height: "1.25rem",
    borderRadius: "50%",
    top: "-6px",
    right: "-6px",
    color: "white",
    background: "$green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: 700,
  },

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
        color: "$white",
        background: "$green",
        marginRight: "0px",
        span: {
          visibility: "hidden",
        },
      },
    },
  },

  defaultVariants: {
    color: "gray",
  },
})
