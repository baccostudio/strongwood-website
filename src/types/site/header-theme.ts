export type HeaderThemeToken =
  | "paper"
  | "black"
  | "brown"
  | "secondary"
  | "project"
  | "black-72"
  | "paper-80";

export type HeaderThemeMatchMode = "exact" | "prefix";
export type HeaderThemeRenderKind = "solid" | "split-horizontal";
export type HeaderThemeViewportMode = "all" | "mobile" | "desktop";

export interface HeaderThemeRouteDefault {
  pathname: string;
  theme: HeaderThemeToken;
  match?: HeaderThemeMatchMode;
}

export interface HeaderThemeConfig {
  fallbackTheme: HeaderThemeToken;
  menuOpenTheme: HeaderThemeToken;
  notFoundTheme: HeaderThemeToken;
  footerTheme: HeaderThemeToken;
  routeDefaults: HeaderThemeRouteDefault[];
}

export interface HeaderThemeSolidState {
  kind: "solid";
  theme: HeaderThemeToken;
  color: string;
}

export interface HeaderThemeSplitHorizontalState {
  kind: "split-horizontal";
  topTheme: HeaderThemeToken;
  bottomTheme: HeaderThemeToken;
  topColor: string;
  bottomColor: string;
  cutRatio: number;
}

export type HeaderThemeRenderState =
  | HeaderThemeSolidState
  | HeaderThemeSplitHorizontalState;
