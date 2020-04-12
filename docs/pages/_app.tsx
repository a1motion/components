/* eslint-disable react/display-name */
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { MDXProvider } from "@mdx-js/react";
import { Title, Button, Menu } from "@a1motion/components";
import "typeface-inter";
import "typeface-fira-code";
import { css, cx } from "linaria";
import { Playground } from "../components/Playground";
import CodeBlock from "../components/CodeBlock";

export const globalStyles = css`
  :global() {
    html {
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
        "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    @supports (font-variation-settings: normal) {
      html {
        font-family: "Inter var", -apple-system, BlinkMacSystemFont, "Segoe UI",
          "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
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

const TableRowStyles = css`
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
  &:nth-child(2n) {
    background-color: #fafcfe;
  }
`;

const TableRow = (props) => {
  return <tr {...props} className={cx(TableRowStyles)} />;
};

const TableCellStyles = css`
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
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
`;

const InlineCode = (props) => {
  return <code {...props} className={InlineCodeStyles} />;
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
  padding: 20px 0;
  border-right: 1px solid #eee;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
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
                    <a>
                      <Button type={"link"}>{component.name}</Button>
                    </a>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
          <Menu.Item id={"/"}>
            <Link href={"/"} passHref>
              <Button type={"link"}>Home</Button>
            </Link>
          </Menu.Item>
        </Menu>
      </nav>
    </div>
  );
};

function generateTitle(pathname: string) {
  const component = components.find((a) => a.path === pathname);
  if (component) {
    return `${component.name} - @a1motion/components`;
  }

  return "@a1motion/components";
}

export default ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{generateTitle(router.pathname)}</title>
      </Head>
      <MDXProvider components={mdComponents}>
        <div className={LayoutWrapper}>
          <Sidebar />
          <div className={ContentStyles}>
            <Component {...pageProps} />
          </div>
        </div>
      </MDXProvider>
    </>
  );
};
