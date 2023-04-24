import { FuckingComponent } from "./Component";

const setImmediate = (fn: Function) => setTimeout(fn, 0);

export class FuckingFramework {
  constructor(private el: Element, private root: FuckingComponent) {}

  rerender() {
    setImmediate(() => this.render());
  }

  private render() {
    let childNodes: Node[] = [];

    for (const child of this.el.childNodes) {
      childNodes.push(child);
    }

    for (const child of childNodes) {
      this.el.removeChild(child);
    }

    this.renderComponent(this.root);
  }

  private renderComponent(element: FuckingComponent, i = 0) {
    const el = element();

    for (const child of el) {
      if (child instanceof Node) {
        this.el.appendChild(child);
      } else {
        this.renderComponent(child, i + 1);
      }
    }
  }
}
