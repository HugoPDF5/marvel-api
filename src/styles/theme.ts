import { extendTheme } from "@chakra-ui/react";
import backgroundImage from '/assets/bg-image.jpg'

export const theme = extendTheme({
  colors: {
    "red": "#ed1d24",
    "black": "#000000",
    'gray': "#202020",
    "yellow": "#fbca03"
  },
  fonts: {
    body: "'Inter', 'sans-serif'",
    heading: "'Inter', 'sans-serif'"
  },

  styles: {
    global: {
      body: {
        color: "black",
        bgImage: backgroundImage
      }
    },
  },
});

