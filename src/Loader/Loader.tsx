import React from "react";
import { css } from "linaria";
import { colors } from "../utils";
import "../utils/global";

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
  border: calc(60px / 10) solid transparent;
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
  size?: number;
  color?: string;
  animationDuration?: number;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 60,
  color = colors["color-primary"],
  animationDuration = 1000,
  className,
}) => (
  <div
    className={`${LoaderBase}${className ? ` ${className}` : ""}`}
    style={{ width: size, height: size }}>
    <div
      className={Circle}
      style={{
        borderWidth: size / 10,
        animationDuration: `${animationDuration}ms`,
        borderTopColor: color,
      }}
    />
    <div
      className={Circle}
      style={{
        borderWidth: size / 10,
        animationDuration: `${animationDuration}ms`,
        borderTopColor: color,
      }}
    />
  </div>
);

export default Loader;
