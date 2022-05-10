import { RouteLocationNormalized } from "vue-router";
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


