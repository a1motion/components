import React from "react";
import { css, cx } from "linaria";
import "../global.css";

const AccessibleTextStyles = css`
  border: none;
  clip: rect(0 0 0 0);
  height: 0.1rem;
  margin: -0.1rem;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 0.1rem;
`;

export type AccessibleTextProps = {
  text: string;
};

const AccessibleText: React.FC<AccessibleTextProps> = ({ text }) => {
  return <p className={cx(AccessibleTextStyles)}>{text}</p>;
};

export default AccessibleText;
