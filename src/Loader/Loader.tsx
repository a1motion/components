import React from "react";
import { css, cx } from "linaria";

const LoaderBase = css`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  * {
    box-sizing: border-box;
  }
`;
const Circle = css`
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: calc(60px / 5) solid transparent;
  border-top-color: #8884ff;
  animation: half-circle-spinner-animation 1000ms infinite;
  &:not(:first-child) {
    animation-direction: alternate;
  }
  @keyframes half-circle-spinner-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export interface LoaderProps {
  size?: number | string;
  color?: string;
  animationDuration?: number;
  className?: string;
}

function getSizeStyle(size: number | string): number | string {
  if (typeof size === "number") {
    return size / 5;
  }

  return `calc(${size} / 5)`;
}

const Loader: React.FC<LoaderProps> = ({
  size = 60,
  color = "var(--color-primary-6)",
  animationDuration = 1000,
  className,
}) => (
  <div
    className={cx(LoaderBase, className)}
    style={{ width: size, height: size }}>
    <div
      className={Circle}
      style={{
        borderWidth: getSizeStyle(size),
        animationDuration: `${animationDuration}ms`,
        borderTopColor: color,
      }}
    />
    <div
      className={Circle}
      style={{
        borderWidth: getSizeStyle(size),
        animationDuration: `${animationDuration}ms`,
        borderTopColor: color,
      }}
    />
  </div>
);

export default Loader;
