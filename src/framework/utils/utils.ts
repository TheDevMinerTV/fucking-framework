import { StringableSignal } from "./signal";

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

export const $e = (type: TemplateStringsArray, ...children: Node[]) => {
  return $el(type[0].trim(), {}, {}, children);
};

export const $text = (text: string | StringableSignal): Node => {
  return document.createTextNode(
    typeof text === "string" ? text : text.get().toString()
  );
};

export const $t = (
  strings: TemplateStringsArray,
  ...args: StringableSignal[]
) => {
  const text = strings.reduce((acc, str, i) => {
    const arg = args[i];
    const argStr = arg ? arg.get().toString() : "";

    return acc + str + argStr;
  }, "");

  return $text(text);
};
