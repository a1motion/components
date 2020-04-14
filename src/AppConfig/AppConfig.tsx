import React, { useContext, useState, useEffect } from "react";

export interface IAppConfig {
  mode: "light" | "dark" | "system";
}
export const defaultAppConfig: IAppConfig = {
  mode: "light",
};
export const AppConfig = React.createContext(defaultAppConfig);

const getTheme = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export function useAppConfig() {
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">(getTheme());
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (window.matchMedia) {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? "dark" : "light");
      };

      mql.addListener(handler);
      return () => mql.removeListener(handler);
    }
  }, []);
  const { ...config } = useContext(AppConfig);
  if (config.mode === "system") {
    config.mode = systemTheme;
  }

  return config;
}

export type WithAppConfigProps = {
  config: IAppConfig;
};
export function withAppConfig<
  T extends WithAppConfigProps = WithAppConfigProps
>(WrappedComponent: React.ComponentType<T>) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  const Component: React.FC<T> = (props) => {
    const config = useAppConfig();
    return <WrappedComponent {...props} config={config} />;
  };

  Component.displayName = displayName;
  return Component;
}
