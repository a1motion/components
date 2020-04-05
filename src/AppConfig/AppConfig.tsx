import React, { useContext } from "react";

export interface IAppConfig {
  mode: "light" | "dark";
}
export const defaultAppConfig: IAppConfig = {
  mode: "light",
};
export const AppConfig = React.createContext(defaultAppConfig);
export function useAppConfig() {
  return useContext(AppConfig);
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
