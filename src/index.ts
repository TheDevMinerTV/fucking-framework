import { init } from "./framework";
import { FuckingComponent } from "./framework/Component";
import { newSignal } from "./framework/utils/signal";
import { $e, $el, $t, $text } from "./framework/utils/utils";

const main = () => {
  const el = document.querySelector("#app");
  if (!el) {
    throw new Error("Could not find #app element");
  }

  const HomeComponent: FuckingComponent = () => {
    return [$e`h1 ${$text("Hey!")}`, CounterComponent];
  };

  const CounterComponent: FuckingComponent = () => {
    const i = newSignal("i", 0);

    const onClick = () => {
      i.set((i) => i + 1);

      fw.rerender();
    };

    return [
      $el("button", {}, { click: onClick }, [$t`+1`]),
      $e`br`,
      $e`span ${$t`Count: ${i}`}`,
      $el(
        "div",
        {},
        {},
        new Array(i.get())
          .fill(0)
          .map((_, i) => $e`div ${$text(i.toString())} ${$e`br`}`)
      ),
    ];
  };

  const fw = init(el, HomeComponent);
  fw.rerender();
};

main();
