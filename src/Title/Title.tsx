import React from "react";
import { css, cx } from "linaria";
import { fontSizes } from "../utils";
import "../global.css";

export interface BaseTitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: "left" | "center" | "right";
  invert?: boolean;
}
// eslint-disable-next-line quotes
export type TitleProps = BaseTitleProps & JSX.IntrinsicElements["h1"];
export const TitleContainer = css`
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.5em;
  color: var(--text-color);
  h1& {
    font-size: ${fontSizes.h1};
  }
  h2& {
    font-size: ${fontSizes.h2};
  }
  h3& {
    font-size: ${fontSizes.h3};
  }
  h4& {
    font-size: ${fontSizes.h4};
  }
  h5& {
    font-size: ${fontSizes.h5};
  }
  h6& {
    font-size: ${fontSizes.h6};
  }
  &.align-left {
    text-align: left;
  }
  &.align-center {
    text-align: center;
  }
  &.align-right {
    text-align: right;
  }
  &.invert {
    color: #fff;
  }
`;

const Title: React.FC<TitleProps> = ({
  level,
  children,
  className,
  align,
  invert,
  ...props
}) => {
  const Component: any = `h${[level || 3]}`;
  return (
    <Component
      className={cx(
        TitleContainer,
        align && `align-${align}`,
        invert && "invert",
        className
      )}
      {...props}>
      {children}
    </Component>
  );
};

Title.defaultProps = {
  level: 3,
};

export default Title;
