import React, { useCallback } from "react";
import { css, cx } from "linaria";
import { colors } from "../utils";
import Title, { TitleContainer } from "../Title/Title";

export interface BaseCardProps {
  header?: React.ReactNode;
  title?: string;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export type CardProps = BaseCardProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const CardHeaderFooter = css`
  background: rgb(246, 248, 250);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CardHeader = css`
  border-bottom: 1px solid ${colors[`color-basic-500`]};
  & .${TitleContainer} {
    margin: 0;
    flex: 1;
  }
  & div {
    flex: 0;
  }
`;

const CardFooter = css`
  border-top: 1px solid ${colors[`color-basic-500`]};
`;

const CardContainer = css`
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid ${colors[`color-basic-500`]};
  transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.25s;
`;

const CardPadded = css`
  padding: 12px 16px;
`;

const Card: React.FC<CardProps> = ({
  children,
  header,
  title,
  extra,
  footer,
  className,
  ...props
}) => {
  const renderHeader = useCallback(() => {
    if (!header && !title && !extra) {
      return null;
    }

    if (!header) {
      return (
        <div className={cx(CardPadded, CardHeaderFooter, CardHeader)}>
          <Title level={6}>{title}</Title>
          {extra && <div>{extra}</div>}
        </div>
      );
    }

    return (
      <div className={cx(CardPadded, CardHeaderFooter, CardHeader)}>
        {header}
      </div>
    );
  }, [header, title, extra]);
  return (
    <div className={cx(CardContainer, className)} {...props}>
      {renderHeader()}
      <div className={cx(CardPadded)}>{children}</div>
      {footer && (
        <div className={cx(CardPadded, CardHeaderFooter, CardFooter)}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
