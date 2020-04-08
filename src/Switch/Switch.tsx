import React, { useState } from "react";
import { css, cx } from "linaria";
import { colors, createTransitions } from "../utils";
import AccessibleText from "../AccessibleText/AccessibleText";
import Loader from "../Loader/Loader";

const SwitchWrapper = css`
  display: flex;
  flex-direction: column;
  line-height: 2em;
  position: relative;
  font-size: 16px;
`;

const SwitchInput = css`
  opacity: 0;
  position: absolute;
`;

const SwitchLabel = css`
  content: "";
  cursor: pointer;
  width: 3.5em;
  height: 2em;
  display: inline-block;
  background-color: ${colors["color-basic-400"]};
  border-radius: 1em/50%;
  position: relative;
  transition: ${createTransitions("background-color")};
  &.checked {
    background-color: ${colors["color-primary"]};
  }
  &.checked:after {
    content: "";
    left: calc(100% - 1.8em);
  }
  &:after {
    background-color: ${colors["color-basic-100"]};
    border-radius: 50%;
    content: "";
    display: block;
    left: 0.2em;
    top: 0.2em;
    bottom: 0.2em;
    width: 1.6em;
    position: absolute;
    transition: ${createTransitions("left")};
  }
`;

const SwitchLoader = css`
  position: absolute;
  top: 0.4em;
  left: calc(100% - 1.6em);
  bottom: 0.4em;
  .${SwitchLabel}.checked & {
    left: 0.4em;
  }
  transition: ${createTransitions("left")};
`;

export type SwitchProps = {
  title: string;
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (e: boolean) => void;
  loading?: boolean;
};

const Switch: React.FC<SwitchProps> = ({
  title,
  value,
  defaultValue,
  onChange,
  loading,
}) => {
  const [_value, _setValue] = useState(defaultValue ?? false);
  const trueValue = value ?? _value;
  return (
    <div className={cx(SwitchWrapper)}>
      <label className={cx(SwitchLabel, trueValue && "checked")}>
        {loading && (
          <Loader
            size={"1.2em"}
            className={SwitchLoader}
            color={trueValue ? colors["color-basic-100"] : undefined}
          />
        )}
        <input
          title={title}
          type={"checkbox"}
          className={cx(SwitchInput)}
          checked={trueValue}
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
