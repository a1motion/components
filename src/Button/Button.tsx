import React, {
  useMemo,
  useCallback,
  useState,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { css, cx } from "linaria";
import { darken, rgba, lighten } from "polished";
import { colors, baseBorderRadius, createTransitions } from "../utils";
import Loader from "../Loader/Loader";
import "../utils/global";

export const StundButton = css`
  color: ${colors["color-basic-800"]};
  outline: 0;
  background: ${colors["color-basic-200"]};
  font-size: 16px;
  line-height: 1.25;
  padding: 8px 16px;
  vertical-align: middle;
  cursor: pointer;
  display: inline-block;
  user-select: none;
  text-align: center;
  letter-spacing: 0.5px;
  border: none;
  border-radius: ${baseBorderRadius};
  transition: ${createTransitions("background-color", "box-shadow", "opacity")};
  border: 1px solid ${colors["color-basic-500"]};
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  position: relative;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:not([disabled]):hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: ${lighten(0.025)(colors["color-basic-200"])};
  }
  &:not([disabled]):active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    background: ${darken(0.025)(colors["color-basic-200"])};
  }
  a& {
    text-decoration: none;
  }
`;

const StundButtonLink = css`
  border: none;
  padding: 0 !important;
  background: none !important;
  box-shadow: none !important;
  color: ${colors["color-basic-700"]};
  a&:hover {
    text-decoration: underline;
  }
  &:hover,
  &:active {
    color: ${darken(0.05, colors["color-primary"])};
  }
`;

const StundButtonOutline = css`
  background: none;
  box-shadow: none !important;
  &:not([disabled]):hover {
    background: ${darken(0.02)(colors["color-basic-200"])};
  }
  &:not([disabled]):active {
    border-color: ${colors["color-basic-600"]};
    background: ${darken(0.05)(colors["color-basic-200"])};
  }
`;

const StundButtonPrimary = css`
  border-color: ${darken(0.1)(colors["color-primary"])};
  box-shadow: 0 2px 0 ${rgba(colors["color-primary"], 0.1)};
  &:not(.${StundButtonOutline}) {
    color: ${colors["color-basic-100"]};
    background: ${colors["color-primary"]};
  }
  &:not([disabled]):hover {
    box-shadow: 0 2px 4px ${rgba(colors["color-primary"], 0.25)};
    background: ${darken(0.1)(colors["color-primary"])};
  }
  &:not([disabled]):active {
    box-shadow: 0 2px 4px ${rgba(colors["color-primary"], 0.4)};
    background: ${darken(0.2)(colors["color-primary"])};
  }
  &.${StundButtonOutline} {
    color: ${darken(0.2, colors["color-primary"])};
    &:not([disabled]):hover {
      background: ${lighten(0.4)(colors["color-primary"])};
    }
    &:not([disabled]):active {
      border-color: ${darken(0.1)(colors["color-primary"])};
      background: ${lighten(0.3)(colors["color-primary"])};
    }
  }
`;

const StundButtonDanager = css`
  border-color: ${darken(0.1)(colors["color-danger"])};
  box-shadow: 0 2px 0 ${rgba(colors["color-danger"], 0.1)};
  &:not(.${StundButtonOutline}) {
    color: ${colors["color-basic-100"]};
    background: ${colors["color-danger"]};
  }
  &:not([disabled]):hover {
    box-shadow: 0 2px 4px ${rgba(colors["color-danger"], 0.25)};
    background: ${darken(0.05)(colors["color-danger"])};
  }
  &:not([disabled]):active {
    box-shadow: 0 2px 4px ${rgba(colors["color-danger"], 0.4)};
    background: ${darken(0.1)(colors["color-danger"])};
  }
  &.${StundButtonOutline} {
    color: ${darken(0.1, colors["color-danger"])};
    &:not([disabled]):hover {
      background: ${lighten(0.4)(colors["color-danger"])};
    }
    &:not([disabled]):active {
      border-color: ${darken(0.1)(colors["color-danger"])};
      background: ${lighten(0.35)(colors["color-danger"])};
    }
  }
`;

const StundButtonSmall = css`
  font-size: 12px;
  padding: 4px 10px;
`;

const StundButtonLarge = css`
  font-size: 18px;
  padding: 12px 20px;
`;

const StundButtonLabel = css`
  display: inline-block;
  transition: all 0.25s;
  font-weight: 600;
  .${StundButtonLink} & {
    font-weight: 800;
  }
`;

const StundButtonLoading = css`
  opacity: 0;
`;

const StundButtonLoader = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface BaseButtonProps {
  label?: string;
  status?: "default" | "primary" | "danger";
  type?: "default" | "link" | "outline";
  size?: "small" | "normal" | "large";
  loading?: boolean;
  // eslint-disable-next-line quotes
  htmlType?: JSX.IntrinsicElements["button"]["type"];
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
          <span
            className={cx(StundButtonLabel, _loading && StundButtonLoading)}>
            {children || label}
          </span>
        );
      }

      return children;
    }, [children, label, _loading]);
    const classes = useMemo(() => {
      return cx(
        StundButton,
        status === "primary" && StundButtonPrimary,
        status === "danger" && StundButtonDanager,
        type === "link" && StundButtonLink,
        type === "outline" && StundButtonOutline,
        size === "small" && StundButtonSmall,
        size === "large" && StundButtonLarge,
        className
      );
    }, [status, size, className]);

    const kids = (
      <>
        {_loading && (
          <span className={StundButtonLoader}>
            <Loader
              size={16}
              color={
                ["primary", "danger"].includes(status!)
                  ? colors["color-basic-200"]
                  : colors["color-primary-500"]
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
