import { useState } from "react";
import useIsomorphicEffect from "./useIsomorphicEffect";

// User theme is determined by the following:
// 1: html[core-components-theme]
// 2: @media (prefers-color-scheme: dark)
// 3: light

const getUserTheme = () => {
  const usertheme =
    typeof window !== "undefined" &&
    window.document.documentElement.getAttribute("core-components-theme");
  if (usertheme === "dark" || usertheme === "light") {
    return usertheme;
  }

  return undefined;
};

const getSystemTheme = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const getTheme = () => {
  return getUserTheme() || getSystemTheme();
};

export default function useTheme() {
  const [scheme, setScheme] = useState<"dark" | "light">(getTheme());

  useIsomorphicEffect(() => {
    let mq: MediaQueryList | undefined;
    let userThemeWatcher: MutationObserver | undefined;
    const listener = (e: MediaQueryListEvent) => {
      // The `prefers-color-scheme` is only used if there is not a user theme set.
      if (!getUserTheme()) {
        if (e.matches) {
          setScheme("dark");
        } else {
          setScheme("light");
        }
      }
    };

    if ("matchMedia" in globalThis) {
      mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addListener(listener);
    }

    if ("MutationObserver" in globalThis) {
      userThemeWatcher = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "attributes") {
            if (mutation.attributeName === "core-components-theme") {
              setScheme(getTheme());
            }
          }
        }
      });
      userThemeWatcher.observe(document.documentElement, { attributes: true });
    }

    return () => {
      mq?.removeListener(listener);
      userThemeWatcher?.disconnect();
    };
  }, []);

  return scheme;
}
