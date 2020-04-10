import React from "react";
import { css, cx } from "linaria";
import { styled } from "linaria/react";
import "../global.css";

const avatar = css`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
`;

const InternalAvatar = styled.span<{ size?: number }>`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  line-height: ${(props) => `${props.size}px`};
`;

const image = css`
  display: block;
  width: 100%;
  height: 100%;
`;

export type AvatarProps = {
  size?: number;
  // eslint-disable-next-line quotes
} & JSX.IntrinsicElements["img"];

const Avatar: React.FC<AvatarProps> = ({ src, size = 64 }) => (
  <InternalAvatar
    className={cx(avatar)}
    style={{ width: size, height: size, lineHeight: `${size}px` }}
    size={size}>
    <img src={src} className={image} />
  </InternalAvatar>
);

export default Avatar;
