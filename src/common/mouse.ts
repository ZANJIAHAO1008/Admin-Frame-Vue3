// mouse.js
import { ref } from "vue";
import { useEventListener } from "./event";

export function useMouse() {
  const x = ref<string | number>(0);
  const y = ref<string | number>(0);

  interface Event {
    pageX: string | number;
    pageY: string | number;
  }

  useEventListener(window, "mousemove", (e: Event) => {
    x.value = e.pageX;
    y.value = e.pageY;
  })

  return { x, y };
}
