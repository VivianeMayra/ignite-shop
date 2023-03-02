import { globalCss } from "."

export const globalStyle = globalCss({
  "*": {
    margin: 0,
    padding: 0,
  },
  body: {
    backgroundColor: "$gray100",
    color: "$gray300",
    "-webkit-font-smoothing": "antialiased",
  },
  "body,input, textarea,button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },
})
