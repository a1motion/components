import React, {
  useState,
  useMemo,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { css, cx } from "linaria";
import { styled } from "linaria/react";
import { usePrevious, createTransitions } from "../utils";

const TabsItem = () => {
  return <div />;
};

const TabHeaderContainer = css`
  display: flex;
`;

const TabHeaderItem = css`
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 700;
  &:not(:first-child) {
    margin-left: 8px;
  }
`;

const TabHeaderItemActive = css`
  color: var(--color-primary-6);
`;

export type TabsHeaderProps = {
  tabs: Array<{ key: React.Key; title: React.ReactNode }>;
  activeKey?: React.Key;
  onChange: (key: React.Key) => void;
};

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TabIndicator = styled("div")<{
  indicatorWidth: number;
  indicatorHeight: number;
  indicatorLeft: number;
}>`
  position: absolute;
  height: 0.15rem;
  background-color: var(--color-primary-6);
  transition: ${createTransitions("transform")};
  z-index: 50;

  transform: translateX(${(props) => props.indicatorLeft + 12}px);
  width: ${(props) => props.indicatorWidth - 24}px;
  top: calc(${(props) => props.indicatorHeight}px - 0.15rem);
  left: 0;
`;

const TabsHeader: React.FC<TabsHeaderProps> = ({
  tabs,
  activeKey,
  onChange,
}) => {
  const [
    activeIndicatorLocation,
    setActiveIndicatorLocation,
  ] = useState<Rect | null>(null);
  const refs = useRef<{
    [key: string]: HTMLLIElement | null;
  }>({});
  const previousActiveKey = usePrevious(activeKey);
  useLayoutEffect(() => {
    if (activeKey && previousActiveKey !== activeKey) {
      const cur = refs.current[activeKey]!;
      setActiveIndicatorLocation({
        x: cur.offsetLeft,
        y: cur.offsetTop,
        width: cur.offsetWidth,
        height: cur.offsetHeight,
      });
    }
  }, [activeKey]);
  return (
    <div
      className={css`
        position: relative;
      `}>
      {activeIndicatorLocation !== null ? (
        <TabIndicator
          indicatorWidth={activeIndicatorLocation.width}
          indicatorHeight={activeIndicatorLocation.height}
          indicatorLeft={activeIndicatorLocation.x}
        />
      ) : null}
      <ul className={cx(TabHeaderContainer)} role={"tablist"}>
        {tabs.map((tab) => {
          return (
            <li
              onClick={() => onChange(tab.key)}
              role={"tab"}
              key={tab.key}
              aria-selected={activeKey === tab.key}
              ref={(ref) => (refs.current[tab.key] = ref)}
              className={cx(
                TabHeaderItem,
                activeKey === tab.key && TabHeaderItemActive
              )}>
              {tab.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export type TabsProps = {
  defaultActiveKey?: React.Key;
  activeKey?: React.Key;
  onChange?: (key: React.Key) => void;
};

const Tabs: React.FC<TabsProps> & { Item: typeof TabsItem } = ({
  defaultActiveKey,
  activeKey,
  onChange,
  children,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey);
  const _activeKey = activeKey || internalActiveKey;
  const tabs = useMemo(() => {
    return React.Children.toArray(children).map((child: any) => {
      return {
        key: child.props.tabKey,
        title: child.props.title,
        node: child,
      };
    });
  }, [children]);
  const _onChange = useCallback((key) => {
    onChange?.(key);
    setInternalActiveKey(key);
  }, []);
  return (
    <div>
      <TabsHeader tabs={tabs} activeKey={_activeKey} onChange={_onChange} />
    </div>
  );
};

Tabs.Item = TabsItem;

export default Tabs;
