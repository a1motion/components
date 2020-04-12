import React from "react";
import { css, cx } from "linaria";
import type { IntrinsicProps } from "../utils";

const CleanedAnchor = css`
  color: inherit;
  text-decoration: none;
`;

const CleanAnchor = React.forwardRef<
  HTMLAnchorElement,
  IntrinsicProps<HTMLAnchorElement>
>(({ className, ...props }, ref) => {
  return <a {...props} ref={ref} className={cx(CleanedAnchor, className)} />;
});

if (process.env.NODE_ENV !== "production") {
  CleanAnchor.displayName = "CleanAnchor";
}

export default CleanAnchor;
