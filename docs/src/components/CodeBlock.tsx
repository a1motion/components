import React from "react";
import Highlight, { defaultProps, PrismTheme } from "prism-react-renderer";
// import vsdark from "./themes/vsdark";
import vslight from "./themes/vslight";
import { cx } from "linaria";

const CodeBlock: React.FC<{ className?: string; language?: string }> = ({
  children,
  className: _className,
  language: _language,
}) => {
  const language = _language || (_className.replace(/language-/, "") as any);
  return (
    <Highlight
      {...defaultProps}
      code={(children as any).trim()}
      theme={vslight as PrismTheme}
      language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cx(className, _className)}
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
