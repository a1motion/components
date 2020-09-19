import React, { useCallback } from "react";
import { LiteralUnion } from "type-fest";
import { css, cx } from "linaria";
import Title, { TitleContainer } from "../Title/Title";
import "../global.css";

type CardTypes = LiteralUnion<"default" | "primary" | "danger", string>;

export interface BaseCardProps {
  header?: React.ReactNode;
  title?: string;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  onClick?: () => void;
  inline?: boolean;
  type?: CardTypes;
}
export type CardProps = BaseCardProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const CardHeaderFooter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CardHeaderFooterDefault = css`
  background: var(--color-basic-1);
`;

const CardHeaderFooterPrimary = css`
  background: var(--card-primary);
`;

const CardHeaderFooterDanger = css`
  background: var(--color-basic-1);
`;

const CardHeader = css`
  border-bottom: 1px solid var(--basic-border-color);
  & .${TitleContainer} {
    margin: 0;
    flex: 1;
  }
`;

const CardHeaderExtra = css`
  flex: 0;
`;

const CardFooter = css`
  border-top: 1px solid var(--basic-border-color);
`;

const CardContainer = css`
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid var(--basic-border-color);
  transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.25s;
`;

const CardInline = css`
  display: inline-block;
  min-width: 326px;
`;

const CardPadded = css`
  padding: 16px;
`;

const Card: React.FC<CardProps> = ({
  children,
  header,
  title,
  extra,
  footer,
  className,
  inline,
  bodyClassName,
  type,
  ...props
}) => {
  const renderHeader = useCallback(() => {
    if (!header && !title && !extra) {
      return null;
    }

    const classes = cx(
      CardPadded,
      CardHeaderFooter,
      CardHeader,
      type === "primary" && CardHeaderFooterPrimary,
      type === "default" && CardHeaderFooterDefault,
      type === "danger" && CardHeaderFooterDanger
    );

    const backgroundColor =
      type && !["primary", "default", "danger"].includes(type)
        ? { backgroundColor: type }
        : undefined;

    if (!header) {
      return (
        <div className={classes} style={backgroundColor}>
          <Title level={6}>{title}</Title>
          {extra && <div className={cx(CardHeaderExtra)}>{extra}</div>}
        </div>
      );
    }

    return (
      <div className={classes} style={backgroundColor}>
        {header}
      </div>
    );
  }, [header, title, extra, type]);
  return (
    <div
      className={cx(CardContainer, inline && CardInline, className)}
      {...props}>
      {renderHeader()}
      <div className={cx(CardPadded, bodyClassName)}>{children}</div>
      {footer && (
        <div className={cx(CardPadded, CardHeaderFooter, CardFooter)}>
          {footer}
        </div>
      )}
    </div>
  );
};

Card.defaultProps = {
  type: "default",
};

export default Card;
