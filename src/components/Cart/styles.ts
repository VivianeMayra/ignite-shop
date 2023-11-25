import * as Dialog from "@radix-ui/react-dialog"
import { styled } from "../../styles"

export const CartDialogPortal = styled(Dialog.Portal, {
  display: "flex",
  flexDirection: "column",
})

export const CartContent = styled(Dialog.Content, {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "30rem",
  background: "$gray200",
  display: "flex",
  flexDirection: "column",
  padding: "3rem",
  paddingTop: "4.5rem",
  boxShadow: "-4px 0px 30px rgba(0,0,0.8",

  section: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowY: "auto",
  },

  h2: {
    marginBottom: "0.5rem",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "160%",
  },

  "@media (max-width: 480px)": {
    width: "26rem",
  },
})

export const CartClose = styled(Dialog.Close, {
  background: "none",
  border: "none",
  color: "$gray350",
  position: "absolute",
  top: "1.75rem",
  right: "1.75rem",
})

export const CartProduct = styled("div", {
  width: "100%",
  display: "flex",
  gap: "1.25rem",
  marginBottom: "1rem",
  alignItems: "center",
  height: "5.8125rem",
  alignSelf: "stretch",
})

export const CartProductImage = styled("div", {
  width: "6.3125rem",
  height: "5.8125rem",
  background: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,

  img: {
    objectFit: "cover",
  },
})

export const CartProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 5,

  p: {
    color: "$gray300",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "160%",
  },
  strong: {
    color: "$gray400",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "160%",
  },

  button: {
    color: "$green",
    border: "none",
    background: "none",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "160%",
  },
})

export const CartFinalization = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "auto",
  order: 1,

  button: {
    width: "100%",
    background: "$green_light",
    color: "$white",
    fontSize: "$md",
    height: "4.3125rem",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    "&:not(:disabled):hover": {
      background: "$green",
    },
  },
})

export const CartFinalizationDetailsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 7,
  marginBottom: "2rem",
})

export const CartFinalizationDetails = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
})
