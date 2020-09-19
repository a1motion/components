import React from "react";
import { css, cx } from "linaria";
import "../global.css";
import { PolymorphicComponent } from "../utils";

// eslint-disable-next-line @typescript-eslint/ban-types
export type BoxProps = {
  direction?: "row" | "column";
};

const BoxContainer = css`
  display: flex;
`;

const BoxDirectionRow = css`
  flex-direction: row;
`;

const BoxDirectionColumn = css`
  flex-column: column;
`;

const Box: PolymorphicComponent<BoxProps> = ({
  as,
  direction,
  className,
  ...props
}) => {
  const Component = as || "div";
  return (
    <Component
      {...props}
      className={cx(
        BoxContainer,
        direction === "row" && BoxDirectionRow,
        direction === "column" && BoxDirectionColumn,
        className
      )}
    />
  );
};

export default Box;
