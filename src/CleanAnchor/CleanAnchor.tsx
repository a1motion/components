import React from "react";
import { css, cx } from "linaria";
import type { IntrinsicProps } from "../utils";

const CleanedAnchor = css`
  color: inherit;
  text-decoration: none;
`;

const CleanAnchor: React.FC<IntrinsicProps<HTMLAnchorElement>> = ({
  className,
  ...props
}) => {
  return <a {...props} className={cx(CleanedAnchor, className)} />;
};

export default CleanAnchor;
