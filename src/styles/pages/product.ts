import { styled } from ".."

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  justifyItems: "stretch",
  gap: "1rem",
  margin: "0 auto",
  "@media (max-width: 480px)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
})

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 400,
  height: 400,
  background: "White",
  borderRadius: 8,
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  img: {
    objectFit: "cover",
  },
  "@media (max-width: 480px)": {
    maxWidth: 350,
  },
})

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "80%",

  h1: {
    fontSize: "$2xl",
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    display: "block",
    fontSize: "$2xl",
    color: "$green_light",
  },

  p: {
    marginTop: "2.5rem",
    fontSize: "$md",
    lineHeight: 1.6,
    color: "$gray300",
  },

  button: {
    marginTop: "auto",
    backgroundColor: "$green",
    border: 0,
    color: "$white",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green_light",
    },
  },
})
