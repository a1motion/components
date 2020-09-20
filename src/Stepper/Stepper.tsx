import React, { useMemo } from "react";
import { css, cx } from "linaria";

export type StepperProps = {
  className?: string;
};

const StepperContainer = css`
  font-variant: tabular-nums;
  margin: 0;
  padding: 0;
`;

const Stepper: React.FC<StepperProps> & {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  Item: typeof StepperItem;
} = ({ children, className }) => {
  return <ul className={cx(StepperContainer, className)}>{children}</ul>;
};

export type StepperItemProps = {
  className?: string;
  title?: string;
  description?: string;
  active?: boolean;
  completed?: boolean;
};

const StepperItemContainer = css`
  list-style: none;
  padding: 0 0 20px;
  position: relative;
  display: flex;
  min-height: 64px;
`;

const StepperItemTitle = css`
  font-size: 20px;
  line-height: 36px;
  font-weight: 500;
  .${StepperItemContainer}.active & {
    font-weight: 600;
  }
`;

const StepperItemTail = css`
  position: absolute;
  top: 30px;
  left: 10.5px;
  height: calc(100% - 22px);
  border-left: 2px solid #9e9e9e;
  .${StepperItemContainer}.active &,
  .${StepperItemContainer}.completed & {
    border-color: #444444;
  }
  .${StepperItemContainer}:last-child & {
    display: none;
  }
`;

const StepperItemContent = css`
  margin: 0 0 0 18px;
  color: #9e9e9e;
  .${StepperItemContainer}.active & {
    color: #444444;
  }
`;

const StepperItemHead = css`
  margin-top: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 3px solid #9e9e9e;
  .${StepperItemContainer}.active &,
  .${StepperItemContainer}.completed & {
    border-color: #444444;
  }
  line-height: 36px;
`;

const StepperItem: React.FC<StepperItemProps> = ({
  children,
  title,
  description,
  active,
  className,
  completed,
}) => {
  const kids = useMemo(() => {
    if (children) {
      return children;
    }

    return (
      <>
        {title && <h6 className={cx(StepperItemTitle)}>{title}</h6>}
        {description && <p>{description}</p>}
      </>
    );
  }, [children, title, description]);
  return (
    <li
      className={cx(
        StepperItemContainer,
        active && "active",
        completed && "completed",
        className
      )}>
      <div className={StepperItemTail} />
      <div className={StepperItemHead} />
      <div className={cx(StepperItemContent)}>{kids}</div>
    </li>
  );
};

Stepper.Item = StepperItem;

export default Stepper;
export { StepperItem };
