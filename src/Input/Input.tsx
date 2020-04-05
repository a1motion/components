import React, { useState, useCallback } from "react";
import { css, cx } from "linaria";
import { baseBorderRadius, colors } from "../utils";
import Loader from "../Loader/Loader";
import "../utils/global";

const StundInputContainer = css`
  position: relative;
  display: inline-block;
  display: block;
  width: 100%;
`;

const StundInputIsActive = css``;
const StundInputLoading = css``;

const StundInputInline = css`
  display: inline-block;
  width: auto;
`;

const StundInput = css`
  height: 48px;
  padding: 0 16px;
  border-radius: ${baseBorderRadius};
  background-color: #ffffff !important;
  border: 2px solid ${colors[`color-basic-500`]};
  font-size: 12px;
  font: inherit;
  transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.25s;
  appearance: none;
  outline: none;
  display: block;
  width: 100%;
  &:not(.${StundInputInline}) {
    margin: 11px 0;
  }
  &::placeholder {
    font-weight: 500;
  }
  &:focus {
    border-color: ${colors[`color-primary-400`]};
  }
  &:focus ~ span {
    color: ${colors[`color-primary-600`]};
  }
  .${StundInputLoading} & {
    padding-left: 32px;
  }
`;

const StundInputLabel = css`
  color: ${colors[`color-primary-500`]};
  font-size: 14px;
  font-weight: 800;
  position: absolute;
  top: 2px;
  left: 12px;
  transform: translateY(25%);
  opacity: 0;
  transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.25s;
  background-color: white;
  padding: 0 4px;
  .${StundInputIsActive} & {
    opacity: 1;
    transform: translateY(-11px);
  }
  .${StundInputLoading} & {
    left: 33px;
  }
`;

const StundInputSuccess = css`
  & .${StundInput} {
    border-color: ${colors[`color-success-600`]} !important;
  }
  & .${StundInput}::placeholder, & .${StundInputLabel} {
    color: ${colors[`color-success-600`]} !important;
  }
`;

const StundInputError = css`
  & .${StundInput} {
    border-color: ${colors[`color-danger-600`]} !important;
  }
  & .${StundInput}::placeholder, & .${StundInputLabel} {
    color: ${colors[`color-danger-600`]} !important;
  }
`;

const StundInputLoader = css`
  position: absolute;
  left: 10px;
  top: 14px;
`;

export interface BaseInputProps {
  value?: string;
  inline?: boolean;
  label?: string;
  loading?: boolean;
  onChange?: (value: string) => void;
  status?: `success` | `error`;
}
export type InputProps = BaseInputProps &
  // eslint-disable-next-line quotes, @typescript-eslint/ban-types
  Omit<JSX.IntrinsicElements["input"], "onChange">;

const Input: React.FC<InputProps> = ({
  inline,
  className,
  label,
  value,
  defaultValue,
  onChange,
  loading,
  status,
  ...props
}) => {
  const [active, setActive] = useState<boolean>(!!(value || defaultValue));
  const [_value, setValue] = useState(defaultValue || ``);
  const _onChange = useCallback(
    (e) => {
      if (loading) {
        return;
      }

      const { value } = e.target;
      setTimeout(() => setActive(value.length !== 0), 100);

      setValue(value);
      if (onChange) {
        onChange(value);
      }
    },
    [onChange, loading]
  );
  return (
    <label
      className={cx(
        StundInputContainer,
        inline && StundInputInline,
        active && StundInputIsActive,
        loading && StundInputLoading,
        status === `success` && StundInputSuccess,
        status === `error` && StundInputError
      )}>
      <input
        {...props}
        value={value || _value}
        onChange={_onChange}
        placeholder={label}
        className={cx(StundInput, inline && StundInputInline, className)}
      />
      <span className={cx(StundInputLabel)}>{label}</span>
      {loading && <Loader className={StundInputLoader} size={20} />}
    </label>
  );
};

export default Input;
