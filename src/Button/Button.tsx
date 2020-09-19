import React, {
  useMemo,
  useCallback,
  useState,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { css, cx } from "linaria";
import { createTransitions } from "../utils";
import Loader from "../Loader/Loader";
import "../global.css";

export const ButtonBase = css`
  color: var(--text-color);
  background: var(--color-basic-1);
  font-size: 16px;
  line-height: 1.25;
  padding: 8px 16px;
  vertical-align: middle;
  cursor: pointer;
  display: inline-block;
  user-select: none;
  text-align: center;
  letter-spacing: 0.5px;
  border-radius: 6px;
  transition: ${createTransitions("background-color", "box-shadow", "opacity")};
  border: 1px solid var(--basic-border-color);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  position: relative;
  .menu-item > & {
    position: static;
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:not([disabled]):hover {
    background: var(--color-basic-2);
  }
  &:not([disabled]):active {
    background: var(--color-basic-3);
  }
  a& {
    text-decoration: none;
  }
`;

const ButtonLink = css`
  border: none;
  padding: 0 !important;
  background: none !important;
  box-shadow: none !important;
  color: var(--text-color);
  a&:hover {
    text-decoration: underline;
  }
  .menu-item & {
    text-align: left;
  }
  .menu-item &:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    content: "";
  }
  li:not(.menu-item-active) > &:hover,
  li:not(.menu-item-active) > &:active {
    color: var(--color-primary-6);
  }
  .menu-item:not(.menu-item-active):hover > & {
    color: var(--color-primary-6) !important;
  }
  .menu-item-active > & {
    color: var(--color-1) !important;
  }
`;

const ButtonOutline = css`
  background: none;
  box-shadow: none !important;
  border-width: 2px;
  &:not([disabled]):hover {
    background: var(--color-basic-1);
  }
  &:not([disabled]):active {
    border-color: var(--basic-border-color);
  }
`;

const ButtonPrimary = css`
  border-color: var(--color-primary-7);
  box-shadow: 0 2px 0 var(--color-primary-6-1);
  &:not(.${ButtonOutline}) {
    color: var(--text-color-dark);
    background: var(--color-primary-6);
  }
  &:not([disabled]):not(.${ButtonOutline}):hover {
    background: var(--color-primary-7);
    border-color: var(--color-primary-6);
  }
  &:not([disabled]):active {
    background: var(--color-primary-6);
  }
  &.${ButtonOutline} {
    color: var(--color-primary-6);
    border-color: var(--color-primary-6);
    &:not([disabled]):hover {
      color: var(--color-primary-5);
      background: var(--color-primary-6-1);
    }
    &:not([disabled]):active {
      color: var(--color-primary-5);
      background: var(--color-primary-6-1);
    }
  }
`;

const ButtonDanager = css`
  border-color: var(--color-danger-7);
  box-shadow: 0 2px 0 var(--color-danger-6-1);
  &:not(.${ButtonOutline}) {
    color: var(--text-color-dark);
    background: var(--color-danger-6);
  }
  &:not([disabled]):not(.${ButtonOutline}):hover {
    background: var(--color-danger-7);
    border-color: var(--color-danger-6);
  }
  &:not([disabled]):active {
    background: var(--color-danger-6);
  }
  &.${ButtonOutline} {
    color: var(--color-danger-6);
    border-color: var(--color-danger-6);
    &:not([disabled]):hover {
      color: var(--color-danger-5);
      background: var(--color-danger-6-1);
    }
    &:not([disabled]):active {
      color: var(--color-danger-5);
      background: var(--color-danger-6-1);
    }
  }
`;

const ButtonControl = css`
  color: var(--color-basic-1);
`;

const ButtonSmall = css`
  font-size: 12px;
  padding: 6px 12px;
`;

const ButtonLarge = css`
  font-size: 18px;
  padding: 12px 24px;
`;

const ButtonLabel = css`
  display: inline-block;
  transition: all 0.25s;
  font-weight: 600;
  .${ButtonLink} & {
    font-weight: 800;
  }
`;

const ButtonLoading = css`
  opacity: 0;
`;

const ButtonLoader = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonBlock = css`
  display: block;
`;

export interface BaseButtonProps {
  label?: string;
  status?: "default" | "primary" | "danger" | "control";
  type?: "default" | "link" | "outline";
  size?: "small" | "normal" | "large";
  loading?: boolean;
  // eslint-disable-next-line quotes
  htmlType?: JSX.IntrinsicElements["button"]["type"];
  block?: boolean;
}
export type ButtonProps = BaseButtonProps &
  // eslint-disable-next-line quotes, @typescript-eslint/ban-types
  Omit<JSX.IntrinsicElements["button"], "type"> &
  // eslint-disable-next-line quotes
  JSX.IntrinsicElements["a"];

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      type,
      label,
      status,
      htmlType,
      className,
      disabled,
      href,
      size,
      loading,
      onClick,
      children,
      block,
      ...props
    },
    ref
  ) => {
    const _loadingDelay = useRef<number | null>(null);
    const [_loading, _setLoading] = useState(loading || false);
    const handleClick = useCallback(
      (e) => {
        if (onClick) {
          onClick(e);
        }
      },
      [loading, onClick]
    );
    useEffect(() => {
      if (loading) {
        _loadingDelay.current = window.setTimeout(() => {
          _setLoading(true);
        }, 250);
      } else {
        if (_loadingDelay.current) {
          clearTimeout(_loadingDelay.current);
        }

        _setLoading(false);
      }
    }, [loading]);
    useEffect(() => {
      return () => clearInterval(_loadingDelay.current!);
    }, []);
    const renderChildren = useCallback(() => {
      if (typeof children === "string" || label) {
        return (
          <span className={cx(ButtonLabel, _loading && ButtonLoading)}>
            {children || label}
          </span>
        );
      }

      return children;
    }, [children, label, _loading]);
    const classes = useMemo(() => {
      return cx(
        ButtonBase,
        status === "primary" && ButtonPrimary,
        status === "danger" && ButtonDanager,
        status === "control" && ButtonControl,
        type === "link" && ButtonLink,
        type === "outline" && ButtonOutline,
        size === "small" && ButtonSmall,
        size === "large" && ButtonLarge,
        block && ButtonBlock,
        className
      );
    }, [status, size, className]);

    const kids = (
      <>
        {_loading && (
          <span className={ButtonLoader}>
            <Loader
              size={16}
              color={
                ["primary", "danger"].includes(status!)
                  ? "var(--color-2)"
                  : "var(--color-primary-6)"
              }
            />
          </span>
        )}
        {renderChildren()}
      </>
    );

    if (href) {
      return (
        <a
          {...props}
          href={href}
          className={classes}
          onClick={handleClick}
          ref={ref as React.RefObject<HTMLAnchorElement>}>
          {kids}
        </a>
      );
    }

    return (
      <button
        {...props}
        className={classes}
        role={"button"}
        disabled={disabled}
        aria-disabled={disabled ? "true" : "false"}
        aria-label={label}
        type={htmlType}
        onClick={handleClick}
        ref={ref as React.RefObject<HTMLButtonElement>}>
        {kids}
      </button>
    );
  }
);

export default Button;
