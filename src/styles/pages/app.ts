import { styled } from ".."

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "70vh",

  "@media (max-width: 480px)": {
    minHeight: "100vh",
  },
})

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  button: {
    marginLeft: "auto",
  },
})
