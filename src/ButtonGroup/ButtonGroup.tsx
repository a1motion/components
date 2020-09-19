import React from "react";
import { css, cx } from "linaria";
import { ButtonBase } from "../Button/Button";
import "../global.css";

const StundButtonGroup = css`
  margin: 4px;
  display: inline-block;
  & .${ButtonBase}:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;
  }
  & .${ButtonBase}:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }
`;

export interface ButtonGroupProps {}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
  return <div className={cx(StundButtonGroup)}>{children}</div>;
};

export default ButtonGroup;
