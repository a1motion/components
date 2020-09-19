import React, { ComponentType, SFC } from "react";
import { css, cx } from "linaria";
import CodeBlock from "./CodeBlock";

export interface PlaygroundComponentProps {
  className?: string;
  style?: any;
  wrapper?: ComponentType<any>;
  component: any;
  position: number;
  code: string;
  scope: Record<string, any>;
  language?: string;
  showLivePreview?: boolean;
  useScoping?: boolean;
}

const PlaygroundWrapper = css`
  border: 1px solid var(--basic-border-color);
  border-radius: 4px;
  margin-bottom: 24px;
`;

const ComponentWrapper = css`
  padding: 20px;
  border-bottom: 1px solid var(--basic-border-color);
`;

const CodeWrapper = css`
  background-color: #eee;
`;

const PlaygroundComponent: SFC<PlaygroundComponentProps> = ({
  component: Component,
  code,
  className,
}) => (
  <div className={PlaygroundWrapper}>
    <div className={cx(ComponentWrapper, className)}>
      {typeof Component === "function" ? <Component /> : Component}
    </div>
    <CodeBlock language={"jsx"} className={CodeWrapper}>
      {code}
    </CodeBlock>
  </div>
);

export interface PlaygroundProps {
  className?: string;
  style?: any;
  wrapper?: ComponentType<any>;
  children: any;
  __scope: Record<string, any>;
  __position: number;
  __code: string;
  useScoping?: boolean;
  language?: string;
}
export const Playground: SFC<PlaygroundProps> = ({
  className,
  children,
  style,
  wrapper,
  __scope,
  __position,
  __code,
  language,
  useScoping,
}) => {
  return (
    <PlaygroundComponent
      component={children}
      className={className}
      style={style}
      wrapper={wrapper}
      scope={__scope}
      position={__position}
      code={__code}
      language={language}
      useScoping={useScoping}
    />
  );
};
