import { PrismTheme } from "prism-react-renderer";

const theme: PrismTheme = {
  plain: {
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "rgb(0, 128, 0)",
      },
    },
    {
      types: ["builtin", "function", "keyword"],
      style: {
        color: "rgb(0, 0, 255)",
      },
    },
    {
      types: ["number", "variable", "inserted"],
      style: {
        color: "rgb(9, 134, 88)",
      },
    },
    {
      types: ["operator"],
      style: {
        color: "rgb(0, 0, 0)",
      },
    },
    {
      types: ["constant"],
      style: {
        color: "rgb(129, 31, 63)",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "rgb(128, 0, 0)",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "rgb(255, 0, 0)",
      },
    },
    {
      types: ["deleted", "string"],
      style: {
        color: "rgb(163, 21, 21)",
      },
    },
    {
      types: ["changed", "punctuation"],
      style: {
        color: "rgb(4, 81, 165)",
      },
    },
  ],
};

export default theme;
