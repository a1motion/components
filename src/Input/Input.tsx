import React, { useState, useCallback } from "react";
import { css, cx } from "linaria";
import Loader from "../Loader/Loader";
import "../global.css";

const StundInputIsActive = css``;
const StundInputLoading = css``;

const StundInputInline = css`
  display: inline-block;
  width: auto;
`;

const StundInputContainer = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 56px;
  border-radius: 6px;
  border: 2px solid var(--basic-border-color);
  background: var(--layout-background-color);
  &:not(.${StundInputInline}) {
    margin: 11px 0;
  }
  &.${StundInputIsActive} {
    border-color: var(--color-primary-5);
  }
`;

const StundInput = css`
  font-size: 16px;
  line-height: 20px;
  border: none;
  font: inherit;
  color: var(--text-color);
  background: var(--layout-background-color);
  transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.25s;
  appearance: none;
  outline: none;
  display: block;
  width: 100%;
  margin: 12px 10px;
  &::placeholder {
    font-weight: 500;
  }

  .${StundInputLoading} & {
    padding-left: 32px;
  }
`;

const InputHasLabel = css`
  margin: 26px 12px 10px;
`;

const StundInputLabel = css`
  color: var(--color-basic-6);
  font-size: 16px;
  font-weight: 800;
  position: absolute;
  top: 2px;
  left: 8px;
  transform: translateY(50%);
  transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.25s;
  padding: 0 4px;
  .${StundInputIsActive} & {
    transform: translateY(0);
    font-size: 13px;
    color: var(--color-primary-6);
  }
  .${StundInputLoading} & {
    left: 33px;
  }
`;

const StundInputSuccess = css`
  border-color: var(--color-success-6) !important;
  & .${StundInput}::placeholder, & .${StundInputLabel} {
    color: var(--color-success-6) !important;
  }
`;

const StundInputError = css`
  border-color: var(--color-danger-6) !important;
  & .${StundInput}::placeholder, & .${StundInputLabel} {
    color: var(--color-danger-6) !important;
  }
`;

const StundInputLoader = css`
  position: absolute;
  left: 10px;
  top: 16px;
`;

export interface BaseInputProps {
  value?: string;
  inline?: boolean;
  label?: string;
  loading?: boolean;
  onChange?: (value: string) => void;
  status?: "success" | "error";
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
  onBlur,
  onFocus,
  autoFocus,
  ...props
}) => {
  const [_value, setValue] = useState(defaultValue || "");
  const [hasFocus, setHasFocus] = useState(autoFocus);
  const active = !!_value || hasFocus;
  const _onChange = useCallback(
    (e) => {
      if (loading) {
        return;
      }

      const { value } = e.target;

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
        status === "success" && StundInputSuccess,
        status === "error" && StundInputError
      )}>
      <input
        {...props}
        value={value || _value}
        onChange={_onChange}
        className={cx(
          StundInput,
          inline && StundInputInline,
          label && InputHasLabel,
          className
        )}
        autoFocus={autoFocus}
        onFocus={(e) => {
          setHasFocus(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setHasFocus(false);
          onBlur?.(e);
        }}
      />
      {label && <span className={cx(StundInputLabel)}>{label}</span>}
      {loading && <Loader className={StundInputLoader} size={20} />}
    </label>
  );
};

export default Input;
