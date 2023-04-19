import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    "red": "#ed1d24",
    "blue": "#0072c6",
    "yellow": "#fbb034",
    "black": '#000000'
  },
  fonts: {
    body: "'Comic Sans MS', 'sans-serif'",
    heading: "'Comic Sans MS', 'sans-serif'"
  },

  styles: {
    global: {
      body: {
        color: "black"
      },
    },
  },
});

