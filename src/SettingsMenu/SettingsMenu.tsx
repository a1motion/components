/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback } from "react";
import { css, cx } from "linaria";
import Card from "../Card/Card";
import { FormItem } from "../Form/Form";
import Title from "../Title/Title";
import "../global.css";

export type SettingsMenuProps = React.ComponentProps<typeof Card> & {};
export type SettingsMenuType = React.FC<SettingsMenuProps> & {
  Item: typeof SettingsMenuItem;
};

const SettingsMenu: SettingsMenuType = ({ children, inline, ...cardProps }) => {
  return (
    <Card {...cardProps} inline={inline ?? true}>
      {children}
    </Card>
  );
};

export type SettingsMenuItemProps = React.ComponentProps<typeof FormItem> & {
  name?: string;
  description?: string;
  action?: React.ReactNode;
  onPress?: () => void;
};

const SettingsItem = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SettingsItemsMain = css`
  flex: 1;
  & h6 {
    margin-bottom: 0;
  }
`;

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({
  children,
  name,
  action,
  onPress,
  ...formItemProps
}) => {
  const renderAction = useCallback(() => {
    if (action) {
      return action;
    }

    if (onPress) {
      return <span>&gt;</span>;
    }

    return null;
  }, [action]);
  return (
    <FormItem {...formItemProps}>
      <div className={cx(SettingsItem)}>
        <div className={cx(SettingsItemsMain)}>
          <Title level={6}>{name}</Title>
        </div>
        <div>{renderAction()}</div>
      </div>
    </FormItem>
  );
};

SettingsMenu.Item = SettingsMenuItem;

export default SettingsMenu;
