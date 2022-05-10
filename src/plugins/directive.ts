import { copy } from "@/directives"; //自定义指令
export default function load(app: any) {
  app.use(copy);
}
