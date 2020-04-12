/* eslint-disable @typescript-eslint/ban-types */
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
  h6: "1rem",
};
export const createTransitions = (...props: string[]) =>
  props
    .map((prop) => `${prop} cubic-bezier(0.645, 0.045, 0.355, 1) 0.25s`)
    .join(", ");
export const baseBorderRadius = "4px";
export const colors = {
  "color-primary": "#7272AB",
  "color-danger": "#F32013",
  "color-basic-100": "#FFFFFF",
  "color-basic-200": "#F7F9FC",
  "color-basic-300": "#EDF1F7",
  "color-basic-400": "#E4E9F2",
  "color-basic-500": "#C5CEE0",
  "color-basic-600": "#8F9BB3",
  "color-basic-700": "#2E3A59",
  "color-basic-800": "#222B45",
  "color-basic-900": "#1A2138",
  "color-basic-1000": "#151A30",
  "color-basic-1100": "#101426",
  "color-primary-100": "#EAEAFA",
  "color-primary-200": "#D5D5F6",
  "color-primary-300": "#B7B7E5",
  "color-primary-400": "#9999CC",
  "color-primary-500": "#7272AB",
  "color-primary-600": "#535393",
  "color-primary-700": "#39397B",
  "color-primary-800": "#242463",
  "color-primary-900": "#151552",
  "color-primary-transparent-100": "rgba(114, 114, 171, 0.08)",
  "color-primary-transparent-200": "rgba(114, 114, 171, 0.16)",
  "color-primary-transparent-300": "rgba(114, 114, 171, 0.24)",
  "color-primary-transparent-400": "rgba(114, 114, 171, 0.32)",
  "color-primary-transparent-500": "rgba(114, 114, 171, 0.4)",
  "color-primary-transparent-600": "rgba(114, 114, 171, 0.48)",
  "color-success-100": "#F1FBD1",
  "color-success-200": "#E1F8A5",
  "color-success-300": "#C5EA75",
  "color-success-400": "#A7D651",
  "color-success-500": "#7EBC20",
  "color-success-600": "#65A117",
  "color-success-700": "#4E8710",
  "color-success-800": "#396D0A",
  "color-success-900": "#2B5A06",
  "color-success-transparent-100": "rgba(126, 188, 32, 0.08)",
  "color-success-transparent-200": "rgba(126, 188, 32, 0.16)",
  "color-success-transparent-300": "rgba(126, 188, 32, 0.24)",
  "color-success-transparent-400": "rgba(126, 188, 32, 0.32)",
  "color-success-transparent-500": "rgba(126, 188, 32, 0.4)",
  "color-success-transparent-600": "rgba(126, 188, 32, 0.48)",
  "color-info-100": "#DFF4FF",
  "color-info-200": "#C0E7FF",
  "color-info-300": "#A1D7FF",
  "color-info-400": "#8AC7FF",
  "color-info-500": "#63AEFF",
  "color-info-600": "#4887DB",
  "color-info-700": "#3165B7",
  "color-info-800": "#1F4693",
  "color-info-900": "#13307A",
  "color-info-transparent-100": "rgba(99, 174, 255, 0.08)",
  "color-info-transparent-200": "rgba(99, 174, 255, 0.16)",
  "color-info-transparent-300": "rgba(99, 174, 255, 0.24)",
  "color-info-transparent-400": "rgba(99, 174, 255, 0.32)",
  "color-info-transparent-500": "rgba(99, 174, 255, 0.4)",
  "color-info-transparent-600": "rgba(99, 174, 255, 0.48)",
  "color-warning-100": "#FFF7CC",
  "color-warning-200": "#FFEE99",
  "color-warning-300": "#FFE266",
  "color-warning-400": "#FFD63F",
  "color-warning-500": "#FFC300",
  "color-warning-600": "#DBA200",
  "color-warning-700": "#B78300",
  "color-warning-800": "#936600",
  "color-warning-900": "#7A5100",
  "color-warning-transparent-100": "rgba(255, 195, 0, 0.08)",
  "color-warning-transparent-200": "rgba(255, 195, 0, 0.16)",
  "color-warning-transparent-300": "rgba(255, 195, 0, 0.24)",
  "color-warning-transparent-400": "rgba(255, 195, 0, 0.32)",
  "color-warning-transparent-500": "rgba(255, 195, 0, 0.4)",
  "color-warning-transparent-600": "rgba(255, 195, 0, 0.48)",
  "color-danger-100": "#FFECDA",
  "color-danger-200": "#FFD4B5",
  "color-danger-300": "#FFB790",
  "color-danger-400": "#FF9A75",
  "color-danger-500": "#FF6C47",
  "color-danger-600": "#DB4933",
  "color-danger-700": "#B72B23",
  "color-danger-800": "#931619",
  "color-danger-900": "#7A0D18",
  "color-danger-transparent-100": "rgba(255, 108, 71, 0.08)",
  "color-danger-transparent-200": "rgba(255, 108, 71, 0.16)",
  "color-danger-transparent-300": "rgba(255, 108, 71, 0.24)",
  "color-danger-transparent-400": "rgba(255, 108, 71, 0.32)",
  "color-danger-transparent-500": "rgba(255, 108, 71, 0.4)",
  "color-danger-transparent-600": "rgba(255, 108, 71, 0.48)",
};
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
