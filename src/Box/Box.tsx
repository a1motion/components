import React from "react";
import { css, cx } from "linaria";
import { styled } from "linaria/react";
import { PolymorphicComponent } from "../utils";

// eslint-disable-next-line @typescript-eslint/ban-types
export type BoxProps = {
  direction?: "row" | "column";
  flex?: 1 | 0 | "auto" | string;
};

const BoxContainer = css`
  display: flex;
`;

const BoxDirectionRow = css`
  flex-direction: row;
`;

const BoxDirectionColumn = css`
  flex-direction: column;
`;

const BoxInternal = styled.div`
  flex: ${(props: any) => props.flex || "auto"};
`;

const Box: PolymorphicComponent<BoxProps> = ({
  as,
  direction,
  className,
  ...props
}) => {
  const Component = as || "div";
  return (
    <BoxInternal
      as={Component}
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
