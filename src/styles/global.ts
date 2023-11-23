import { globalCss } from "."

export const globalStyle = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  body: {
    backgroundColor: "$gray100",
    marginLeft: "3rem",
    color: "$gray300",
    "-webkit-font-smoothing": "antialiased",
    "@media (max-width: 480px)": {
      marginLeft: "10px",
    },
  },
  "body,input, textarea,button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },

  button: {
    cursor: "pointer",
  },
})
