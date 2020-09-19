/* eslint-disable react/no-danger */
/* eslint-disable react/display-name */
import React, { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { MDXProvider } from "@mdx-js/react";
import {
  Title,
  Button,
  Menu,
  Layout,
  useIsomorphicEffect,
  useTheme,
} from "@a1motion/components";
import "typeface-inter";
import "typeface-fira-code";
import { css, cx } from "linaria";
import { styled } from "linaria/react";
import "../../lib/theme.css";
import { Playground } from "../components/Playground";
import CodeBlock from "../components/CodeBlock";

export const globalStyles = css`
  :global() {
    html {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    @supports (font-variation-settings: normal) {
      html {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
          "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif !important;
      }
    }
    pre,
    code {
      font-size: 16px;
      font-family: "Fira Code", source-code-pro, Menlo, Monaco, Consolas,
        "Courier New", monospace;
      font-weight: 400;
    }

    html,
    body {
      display: flex;
      flex: 1 0 auto;
      height: 100vh; /* fix IE11 */
      min-height: 100%; /* fix IE11 */
      flex-direction: column;
    }

    #__next {
      display: flex;
      flex: 1;
    }

    .margin-between-buttons {
      button {
        margin-right: 12px;
      }
    }
  }
`;

const TableStyles = css`
  display: block;
  width: 100%;
  overflow: auto;
  margin-top: 0;
  margin-bottom: 16px;
  border-spacing: 0;
  border-collapse: collapse;
`;

const Table = (props) => {
  return <table {...props} className={cx(TableStyles)} />;
};

export function mixinDarkTheme(
  code: string,
  themeSelector: string = "core-components-theme"
): string {
  return `html[${themeSelector}="dark"] & {
    ${code}
  }
  @media (prefers-color-scheme: dark) {
    html:not([${themeSelector}="light"]) & {
      ${code}
    }
  }`;
}

const TableRowStyles = css`
  background-color: #fff;
  border-top: 1px solid var(--basic-border-color);
  &:nth-child(2n) {
    background-color: #fafcfe;
  }
  ${mixinDarkTheme(`
    background-color: #151515;
    &:nth-child(2n) {
      background-color: #252525;
    }
  `)}
`;

const TableRow = (props) => {
  return <tr {...props} className={cx(TableRowStyles)} />;
};

const TableCellStyles = css`
  padding: 6px 13px;
  border: 1px solid var(--basic-border-color);
  th& {
    font-weight: 600;
  }
`;

const TableCell = (Type: "th" | "td") => (props) => {
  return <Type {...props} className={TableCellStyles} />;
};

const InlineCodeStyles = css`
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(35, 35, 35, 0.1);
  border-radius: 3px;
  ${mixinDarkTheme(`
    background-color: rgba(250, 250, 250, 0.15);
  `)}
`;

const InlineCode = (props) => {
  return <code {...props} className={InlineCodeStyles} />;
};

function range<T>(count: number, generator: (number) => T): T[] {
  return Array.from({ length: count }).map((_, i) => generator(i + 1));
}

function getTextColor({
  count,
  i,
  invertText,
}: {
  count: number;
  i: number;
  invertText: boolean;
}) {
  let color = i > Math.floor((count - 1) / 2) ? "white" : "black";
  if (invertText) {
    color =
      color === "white" ? "var(--text-color-invert)" : "var(--text-color)";
  }

  return color;
}

const Color = styled.div<{ i: number; count: number; invertText: boolean }>`
  color: ${(props) => getTextColor(props)};
  display: flex;
  flex: 1;
  min-height: 64px;
  align-items: center;
  padding: 0 24px;
  font-size: 1.75rem;
  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const Colors = ({ count, type, invertText }) => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        flex: 1;
        margin: 16px 0;
      `}>
      {range(count, (i) => {
        return (
          <Color
            key={i}
            invertText={invertText}
            style={{ backgroundColor: `var(--color-${type}-${i}` }}
            i={i}
            count={count}>
            <span>{`color-${type}-${i}`}</span>
          </Color>
        );
      })}
    </div>
  );
};

const mdComponents = {
  h1: (props) => <Title level={1} {...props} />,
  h2: (props) => <Title level={2} {...props} />,
  h3: (props) => <Title level={3} {...props} />,
  h4: (props) => <Title level={4} {...props} />,
  h5: (props) => <Title level={5} {...props} />,
  h6: (props) => <Title level={6} {...props} />,
  code: (props: any) => <CodeBlock {...props} />,
  table: Table,
  tr: TableRow,
  th: TableCell("th"),
  td: TableCell("td"),
  inlineCode: InlineCode,
  pre: ({ children }: any) => {
    return children;
  },
  Playground,
  Colors,
  Row({ children }) {
    return (
      <div
        className={css`
          display: flex;
          flex-direction: row;
          & + & {
            margin-top: 24px;
          }
        `}>
        {children}
      </div>
    );
  },
  Col({ children, flex }) {
    return (
      <div
        style={{ flex }}
        className={css`
          display: flex;
          flex-direction: column;
        `}>
        {children}
      </div>
    );
  },
};

const LayoutWrapper = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const SidebarStyles = css`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  border-right: 1px solid var(--basic-border-color);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin-top: 64px;
`;

const ContentStyles = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  padding-left: 270px;
`;

const components = [
  {
    name: "Avatar",
    path: "/components/avatar",
  },
  {
    name: "Button",
    path: "/components/button",
  },
  {
    name: "Button Group",
    path: "/components/button-group",
  },
  {
    name: "Card",
    path: "/components/card",
  },
  {
    name: "Clean Anchor",
    path: "/components/clean-anchor",
  },
  {
    name: "Form",
    path: "/components/form",
  },
  {
    name: "Input",
    path: "/components/input",
  },
  {
    name: "Loader",
    path: "/components/loader",
  },
  {
    name: "Menu",
    path: "/components/menu",
  },
  {
    name: "Settings Menu",
    path: "/components/settings-menu",
  },
  {
    name: "Switch",
    path: "/components/switch",
  },
  {
    name: "Tabs",
    path: "/components/tabs",
  },
  {
    name: "Title",
    path: "/components/title",
  },
];

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className={SidebarStyles}>
      <nav>
        <Menu activeKeys={[router.pathname]}>
          <Menu.Item id={"/"}>
            <Link href={"/"} passHref>
              <Button type={"link"}>Home</Button>
            </Link>
          </Menu.Item>
          <Menu.Item id={"/colors"}>
            <Link href={"/colors"} passHref>
              <Button type={"link"}>Colors</Button>
            </Link>
          </Menu.Item>
          <Menu.SubMenu
            collapsible
            id={"/components"}
            title={
              <Link href={"/components"} passHref>
                <Button type={"link"}>Components</Button>
              </Link>
            }>
            {components.map((component) => {
              return (
                <Menu.Item key={component.path} id={component.path}>
                  <Link href={component.path} passHref>
                    <Button type={"link"}>{component.name}</Button>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
        </Menu>
      </nav>
    </div>
  );
};

const Header = () => {
  const theme = useTheme();
  const changeTheme = useCallback(() => {
    document.documentElement.setAttribute(
      "core-components-theme",
      theme === "dark" ? "light" : "dark"
    );
    localStorage.setItem("userTheme", theme === "dark" ? "light" : "dark");
  }, [theme]);
  const [showThemeButton, setShowThemeButton] = useState(false);
  useIsomorphicEffect(() => {
    if (process.browser) {
      setTimeout(() => {
        setShowThemeButton(true);
      }, 0);
    }
  }, []);
  return (
    <header
      className={css`
        height: 64px;
        width: 100%;
        position: fixed;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 12px 16px;
        border-bottom: 1px solid var(--basic-border-color);
        background-color: var(--layout-background-color);
        z-index: 1000;
      `}>
      <div
        className={css`
          flex: 1;
        `}
      />
      <div
        className={css`
          flex: 0 auto;
        `}>
        {showThemeButton && (
          <Button onClick={changeTheme}>
            {theme === "dark" ? "Dark" : "Light"}
          </Button>
        )}
      </div>
    </header>
  );
};

function generateTitle(pathname: string) {
  const component = components.find((a) => a.path === pathname);
  if (component) {
    return `${component.name} - @a1motion/components`;
  }

  return "@a1motion/components";
}

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{generateTitle(router.pathname)}</title>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var a = localStorage.userTheme; if (a) window.document.documentElement.setAttribute('core-components-theme', a);",
          }}
        />
      </Head>
      <MDXProvider components={mdComponents}>
        <Layout className={LayoutWrapper}>
          <Header />
          <div
            className={css`
              display: flex;
              flex-direction: column;
              flex: 1;
              margin-top: 64px;
            `}>
            <Sidebar />
            <div className={ContentStyles}>
              <Component {...pageProps} />
            </div>
          </div>
        </Layout>
      </MDXProvider>
    </>
  );
};

export default App;
