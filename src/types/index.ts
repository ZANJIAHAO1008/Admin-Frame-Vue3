export type DeepPartial<T> = {
  //如果是object则递归类型 简单类型则使用Partial
  [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
};

export interface PaginationState {
  page: number;
  total: number;
  pageSize: number;
}
