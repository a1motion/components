import React, { forwardRef, ForwardRefExoticComponent } from "react";
import { css, cx } from "linaria";
import { styled } from "linaria/react";
import { PolymorphicComponentProps } from "../utils";

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

type BoxType<E extends React.ElementType = "div"> = ForwardRefExoticComponent<
  PolymorphicComponentProps<E, BoxProps>
>;

const Box: BoxType = forwardRef(
  ({ as, direction, className, ...props }, ref) => {
    const Component = as || "div";
    return (
      <BoxInternal
        {...props}
        ref={ref}
        as={Component}
        className={cx(
          BoxContainer,
          direction === "row" && BoxDirectionRow,
          direction === "column" && BoxDirectionColumn,
          className
        )}
      />
    );
  }
);

Box.displayName = "Box";

export default Box;
