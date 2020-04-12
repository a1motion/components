/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, createContext, useContext, useState } from "react";
import { css, cx } from "linaria";
import { isElement } from "react-is";
import ChevronRight from "react-feather/dist/icons/chevron-right";
import { colors, createTransitions } from "../utils";
import Button from "../Button/Button";
import Collapsible from "../Collapsible/Collapsible";
import "../global.css";

type MenuContextType = {
  activeKeys: string[];
  openKeys: string[];
};

const MenuContext = createContext<MenuContextType>({
  activeKeys: [],
  openKeys: [],
});

export type MenuProps = {
  vertical?: boolean;
  activeKeys?: string[];
  openKeys?: string[];
};

const InternalMenuStyles = css`
  overflow-y: hidden;
  transition: ${createTransitions("height")};
`;

type InternalMenuProps = MenuProps & {
  indent?: number;
};

const InternalMenu: React.FC<InternalMenuProps> = React.forwardRef<
  HTMLUListElement,
  InternalMenuProps
>(({ children, indent = 0 }, ref) => {
  const renderChildren = useCallback(() => {
    return React.Children.map(children, (child) => {
      if (!child) {
        return null;
      }

      if (!isElement(child)) {
        return child;
      }

      if (typeof child === "string") {
        return child;
      }

      const childProps = child.props;
      // https://github.com/ant-design/ant-design/issues/11517#issuecomment-477403055
      if (!childProps || typeof child.type === "string") {
        return child;
      }

      const newProps = {
        indent: indent + 1,
      };

      return React.cloneElement(child, newProps);
    });
  }, [children]);
  return (
    <ul ref={ref} className={cx(InternalMenuStyles)}>
      {renderChildren()}
    </ul>
  );
});

if (process.env.NODE_ENV !== "production") {
  InternalMenu.displayName = "InternalMenu";
}

export type MenuItemProps = {
  title?: string | React.ReactNode;
  id?: string;
  indent?: number;
};

const MenuItemStyles = css`
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
  background-color: #fff;
  transition: ${createTransitions("background-color")};
  position: relative;
  & a {
    line-height: 40px;
    height: 40px;
    width: 100%;
    text-align: left;
  }
`;

const MenuItemActive = css`
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${colors["color-primary"]};
    border-radius: 4px;
  }
`;

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  title,
  id,
  indent = 0,
}) => {
  const { activeKeys } = useContext(MenuContext);
  const renderChildren = useCallback(() => {
    if (children) {
      return children;
    }

    return <div>{title}</div>;
  }, [children, title]);
  return (
    <li
      style={{ paddingLeft: indent * 18 }}
      className={cx(
        MenuItemStyles,
        id && activeKeys.includes(id) && MenuItemActive
      )}>
      {renderChildren()}
    </li>
  );
};

const SubMenuCollapseItem = css`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SubMenuCollapseItemIcon = css`
  transform: rotate(90deg);
  transition: ${createTransitions("transform")};
`;

const SubMenuCollapseItemIconCollapsed = css`
  transform: none;
`;

type SubMenuProps = { collapsible?: boolean } & MenuItemProps;

const SubMenu: React.FC<SubMenuProps> = ({
  title,
  indent = 0,
  id,
  collapsible,
  ...props
}) => {
  const { activeKeys } = useContext(MenuContext);
  const [isCollapsed, setCollapsed] = useState(false);
  const renderTitle = useCallback(() => {
    if (typeof title !== "string") {
      return title;
    }

    return <Button label={title} type={"link"} />;
  }, [title]);
  const renderCollapsible = useCallback(() => {
    if (!collapsible) {
      return null;
    }

    return (
      <div
        className={cx(SubMenuCollapseItem)}
        onClick={() => {
          setCollapsed((c) => !c);
        }}>
        <ChevronRight
          size={24}
          className={cx(
            SubMenuCollapseItemIcon,
            isCollapsed && SubMenuCollapseItemIconCollapsed
          )}
        />
      </div>
    );
  }, [collapsible, isCollapsed, setCollapsed]);
  return (
    <li>
      <div
        style={{ paddingLeft: indent * 18 }}
        className={cx(
          MenuItemStyles,
          id && activeKeys.includes(id) && MenuItemActive
        )}>
        {renderTitle()}
        {renderCollapsible()}
      </div>
      <Collapsible
        {...props}
        collapsed={isCollapsed}
        as={InternalMenu}
        indent={indent}
      />
    </li>
  );
};

const Menu: React.FC<MenuProps> & {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
} = ({ activeKeys = [], openKeys = [], ...props }) => {
  return (
    <MenuContext.Provider value={{ activeKeys, openKeys }}>
      <InternalMenu {...props} indent={0} />
    </MenuContext.Provider>
  );
};

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;
