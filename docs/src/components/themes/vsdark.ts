import { PrismTheme } from "prism-react-renderer";

const theme: PrismTheme = {
  plain: {
    color: `#d4d4d4`,
    backgroundColor: `#1e1e1e`,
  },
  styles: [
    {
      types: [`prolog`],
      style: {
        color: `rgb(0, 0, 128)`,
      },
    },
    {
      types: [`comment`, `punctuation`],
      style: {
        color: `rgb(106, 153, 85)`,
      },
    },
    {
      types: [`builtin`, `tag`, `changed`, `function`, `keyword`],
      style: {
        color: `rgb(86, 156, 214)`,
      },
    },
    {
      types: [`number`, `variable`, `inserted`],
      style: {
        color: `rgb(181, 206, 168)`,
      },
    },
    {
      types: [`operator`],
      style: {
        color: `rgb(212, 212, 212)`,
      },
    },
    {
      types: [`constant`],
      style: {
        color: `rgb(100, 102, 149)`,
      },
    },
    {
      types: [`attr-name`],
      style: {
        color: `rgb(156, 220, 254)`,
      },
    },
    {
      types: [`deleted`, `string`],
      style: {
        color: `rgb(206, 145, 120)`,
      },
    },
    {
      types: [`class-name`],
      style: {
        color: `rgb(78, 201, 176)`,
      },
    },
    {
      types: [`char`],
      style: {
        color: `rgb(209, 105, 105)`,
      },
    },
  ],
};

export default theme;
