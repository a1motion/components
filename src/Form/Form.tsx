import React, { useCallback, FormEvent } from "react";
import { css, cx } from "linaria";
import { colors } from "../utils";

export type FormProps = {
  allowSubmit?: boolean;
} & React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

const FormContainer = css`
  padding: 4px;
`;

const Form: React.FC<FormProps> & {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  Item: typeof FormItem;
} = ({ children, className, allowSubmit, onSubmit, ...props }) => {
  const _onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      if (!allowSubmit) {
        e.preventDefault();
      }

      onSubmit?.(e);
    },
    [allowSubmit, onSubmit]
  );
  return (
    <form
      {...props}
      onSubmit={_onSubmit}
      className={cx(FormContainer, className)}>
      {children}
    </form>
  );
};

export type FormItemProps = {
  hint?: string;
  status?: "error";
  float?: "right";
};

const FormItemContainer = css`
  margin: 0 0 24px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormItemHint = css`
  margin: 8px 8px 0 8px;
  font-weight: 500;
`;

const FormItemHintError = css`
  color: ${colors["color-danger-600"]};
`;

const FormItemChildrenContainerFloatRight = css`
  display: flex;
  justify-content: flex-end;
`;

const FormItem: React.FC<FormItemProps> = ({
  children,
  hint,
  status,
  float,
}) => {
  return (
    <div className={FormItemContainer}>
      <div
        className={cx(
          float === "right" && FormItemChildrenContainerFloatRight
        )}>
        {children}
      </div>
      {hint && (
        <div
          className={cx(FormItemHint, status === "error" && FormItemHintError)}>
          {hint}
        </div>
      )}
    </div>
  );
};

Form.Item = FormItem;

export default Form;
export { FormItem };
