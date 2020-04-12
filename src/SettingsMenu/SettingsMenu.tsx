/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback } from "react";
import { css, cx } from "linaria";
import ChevronRight from "react-feather/dist/icons/chevron-right";
import Card from "../Card/Card";
import Title from "../Title/Title";
import "../global.css";
import { colors, createTransitions } from "../utils";

export type SettingsMenuProps = React.ComponentProps<typeof Card> & {};
export type SettingsMenuType = React.FC<SettingsMenuProps> & {
  Item: typeof SettingsMenuItem;
};

const OverrideCardStyles = css`
  padding: 0;
`;

const SettingsMenu: SettingsMenuType = ({ children, inline, ...cardProps }) => {
  return (
    <Card
      {...cardProps}
      inline={inline ?? true}
      bodyClassName={cx(OverrideCardStyles)}>
      {children}
    </Card>
  );
};

export type SettingsMenuItemProps = {
  name?: string;
  description?: string;
  action?: React.ReactNode;
  onPress?: () => void;
  href?: string;
  link?: React.ComponentType<{ href: string; [key: string]: any }>;
};

const SettingsItem = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 12px 16px;
`;

const SettingsItemsMain = css`
  flex: 1;
  & h6 {
    margin-bottom: 0;
  }
`;

const SettingsItemsAction = css`
  flex: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SettingsItemsClickable = css`
  cursor: pointer;
  transition: ${createTransitions("background-color")};
  &:hover {
    background-color: ${colors["color-basic-300"]};
  }
  &:active {
    background-color: ${colors["color-basic-400"]};
  }
`;

const SettingsMenuItemContainer: React.FC<SettingsMenuItemProps> = ({
  children,
  href,
  link,
}) => {
  if (href) {
    const Component = link ? link : "a";
    return <Component href={href}>{children}</Component>;
  }

  return <>{children}</>;
};

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({
  name,
  action,
  onPress,
  href,
  link,
}) => {
  const renderAction = useCallback(() => {
    if (action) {
      return action;
    }

    if (onPress || href) {
      return <ChevronRight size={18} />;
    }

    return null;
  }, [action]);
  return (
    <SettingsMenuItemContainer href={href} link={link}>
      <div
        className={cx(
          SettingsItem,
          (onPress || href) && SettingsItemsClickable
        )}>
        <div className={cx(SettingsItemsMain)}>
          <Title level={6}>{name}</Title>
        </div>
        <div className={cx(SettingsItemsAction)}>{renderAction()}</div>
      </div>
    </SettingsMenuItemContainer>
  );
};

SettingsMenu.Item = SettingsMenuItem;

export default SettingsMenu;
