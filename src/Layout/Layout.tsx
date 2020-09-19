import React from "react";
import { css, cx } from "linaria";
import { PolymorphicComponent } from "../utils";

const LayoutStyles = css`
  color: var(--text-color);
  background-color: var(--layout-background-color);
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const Layout: PolymorphicComponent<{}> = ({ as, className, ...props }) => {
  const Component = as || "div";
  return <Component {...props} className={cx(LayoutStyles, className)} />;
};

export default Layout;
