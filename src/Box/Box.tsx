import React from "react";
import { css, cx } from "linaria";

export type BoxProps = {};

const BoxContainer = css`
  display: flex;
`;

const Box: React.FC<BoxProps> = ({ children }) => {
  return <div className={cx(BoxContainer)}>{children}</div>;
};

export default Box;
