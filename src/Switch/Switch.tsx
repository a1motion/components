import React, { useState } from "react";
import { css, cx } from "linaria";
import { colors } from "../utils";
import AccessibleText from "../AccessibleText/AccessibleText";

const SwitchWrapper = css`
  display: flex;
  flex-direction: column;
  line-height: 2rem;
  position: relative;
`;

const SwitchInput = css`
  opacity: 0;
  position: absolute;
`;

const SwitchLabel = css`
  content: "";
  cursor: pointer;
  width: 3.5rem;
  height: 2rem;
  display: inline-block;
  background-color: ${colors["color-basic-400"]};
  border-radius: 1rem/50%;
  position: relative;
  transition: 0.2s background-color ease;
  &.checked {
    background-color: ${colors["color-primary"]};
  }
  &.checked:after {
    content: "";
    left: calc(100% - 1.8rem);
  }
  &:after {
    background-color: ${colors["color-basic-100"]};
    border-radius: 50%;
    content: "";
    display: block;
    left: 0.2rem;
    top: 0.2rem;
    bottom: 0.2rem;
    width: 1.6rem;
    position: absolute;
    transition: left 0.2s ease;
  }
`;

export type SwitchProps = {
  title: string;
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (e: boolean) => void;
};

const Switch: React.FC<SwitchProps> = ({
  title,
  value,
  defaultValue,
  onChange,
}) => {
  const [_value, _setValue] = useState(defaultValue ?? false);
  return (
    <div className={cx(SwitchWrapper)}>
      <label className={cx(SwitchLabel, _value && "checked")}>
        <input
          title={title}
          type={"checkbox"}
          className={cx(SwitchInput)}
          checked={value ?? _value}
          onChange={(e) => {
            _setValue(e.target.checked);
            onChange?.(e.target.checked);
          }}
        />
        <AccessibleText text={title} />
      </label>
    </div>
  );
};

export default Switch;
