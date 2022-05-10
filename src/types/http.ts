export interface Message<T> {
  //返回信息
  code: number;
  message: string;
  data: T;
  serverTime: Date;
}

