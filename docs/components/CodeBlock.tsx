import React, { useState } from "react";
import { css, cx } from "linaria";
import { useTheme, useIsomorphicEffect } from "@a1motion/components";
import Highlight, { defaultProps, PrismTheme } from "prism-react-renderer";
import vsdark from "./themes/vsdark";
import vslight from "./themes/vslight";

const CodeBlockStyles = css`
  border-radius: 4px;
`;

const CodeBlock: React.FC<{ className?: string; language?: string }> = ({
  children,
  className: _className,
  language: _language,
}) => {
  const [show, setShow] = useState(false);
  useIsomorphicEffect(() => {
    if (process.browser) {
      setTimeout(() => {
        setShow(true);
      }, 0);
    }
  }, []);
  const theme = useTheme();
  if (!show) {
    return (
      <div
        className={CodeBlockStyles}
        style={{
          padding: 20,
          height: (children as string).trim().split("\n").length * 24 + 40,
        }}
      />
    );
  }

  const language =
    _language || ((_className ?? "").replace(/language-/, "") as any);
  return (
    <Highlight
      {...defaultProps}
      code={(children as any).trim()}
      theme={(theme === "dark" ? vsdark : vslight) as PrismTheme}
      language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cx(className, _className, CodeBlockStyles)}
          style={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
