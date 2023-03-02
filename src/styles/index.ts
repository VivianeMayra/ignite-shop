import { createStitches } from "@stitches/react"

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      gray100: "#121214",
      gray200: "#202024",
      gray300: "#C4C4CC",
      gray400: "E1E1E6",
      green: "#00875F",
      green_light: "#00B37E",
      white: "#FFFFFF",
    },

    fontSizes: {
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem",
    },
  },
})
