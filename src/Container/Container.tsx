import React from "react";
import { css, cx } from "linaria";
import "../global.css";

const ContainerStyles = css`
  margin: 0 auto;
  max-width: 1400px;
  width: 95%;
  @media only screen and (min-width: 601px) {
    width: 90%;
  }
  @media only screen and (min-width: 993px) {
    width: 85%;
  }
  @media only screen and (min-width: 1200px) {
    width: 80%;
  }
`;

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div {...props} className={cx(ContainerStyles, className)} />;
};

export default Container;
