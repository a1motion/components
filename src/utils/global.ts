import { css } from "linaria";

export const globals = css`
  :global() {
    html {
      box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    html,
    body {
      color: rgba(0, 0, 0, 0.87);
      font-weight: normal;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      margin: 0;
      padding: 0;
    }

    body,
    div,
    dl,
    dt,
    dd,
    ul,
    ol,
    li,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    pre,
    code,
    form,
    fieldset,
    legend,
    input,
    textarea,
    p,
    blockquote,
    th,
    td,
    hr,
    button,
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      margin: 0;
      padding: 0;
    }

    html {
      font-size: 14px;
    }

    @media only screen and (min-width: 992px) {
      html {
        font-size: 14.5px;
      }
    }

    @media only screen and (min-width: 1200px) {
      html {
        font-size: 15px;
      }
    }

    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
  }
`;
