/* eslint-disable @typescript-eslint/ban-types */
import { useRef, useEffect } from "react";

export { default as useTheme } from "./useTheme";
export const breakpoints = {
  sm: "601px",
  md: "992px",
  lg: "1200px",
};
export const fontSizes = {
  h1: "3rem",
  h2: "2.5rem",
  h3: "2rem",
  h4: "1.5rem",
  h5: "1.25rem",
  h6: "1.10rem",
};
export const createTransitions = (...props: string[]) =>
  props
    .map((prop) => `${prop} cubic-bezier(0.645, 0.045, 0.355, 1) 0.15s`)
    .join(", ");
export type IntrinsicProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;
// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
export type PropsOf<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;
export interface BoxOwnProps<E extends React.ElementType = React.ElementType> {
  as?: E;
}
export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<PropsOf<E>, keyof BoxOwnProps>;
export type PolymorphicComponentProps<E extends React.ElementType, P> = P &
  BoxProps<E>;
export type PolymorphicComponent<P, D extends React.ElementType = "div"> = <
  E extends React.ElementType = D
>(
  props: PolymorphicComponentProps<E, P>
) => JSX.Element;
export function usePrevious<T>(value: T): T | undefined {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export { default as useIsomorphicEffect } from "./useIsomorphicEffect";
