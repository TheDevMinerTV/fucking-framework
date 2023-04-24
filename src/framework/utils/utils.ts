import { Signal } from "./signal";

export const $el = (
  type: string,
  attrs: Record<string, string> = {},
  eventHandlers: Record<string, (e: Event) => void> = {},
  children: Node[] = []
): Element => {
  const el = document.createElement(type);

  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }

  for (const [event, handler] of Object.entries(eventHandlers)) {
    el.addEventListener(event, handler);
  }

  el.append(...children);

  return el;
};

export const $text = (text: string | Signal<string> | Signal<number>): Element => {
  return $el("span", {}, {}, [document.createTextNode(typeof text === "string" ? text : text.get().toString())]);
};
