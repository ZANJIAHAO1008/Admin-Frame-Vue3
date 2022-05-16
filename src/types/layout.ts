import { RouteLocationNormalized } from "vue-router";
import { Language } from "element-plus/lib/locale";
import { BuildPropType } from "element-plus/lib/utils";
export interface HeaderState<T> {
  collapse: T;
  username: T;
  passVisible: boolean;
  baseVisible: boolean;
  versionVisible: boolean;
  driver: any;
}

export interface Tag extends RouteLocationNormalized {
  title?: string;
}

export interface ElConfig {
  locale: Language;
  language: string;
  componentSize: BuildPropType<StringConstructor, "" | "small" | "large", unknown>;
}
