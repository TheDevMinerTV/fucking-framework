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
    console.log(`${" ".repeat(i)}rendering component`, element);

    const r = element();

    for (const child of r) {
      if (child instanceof Node) {
        console.log(`${" ".repeat(i + 1)}appending element`, child);

        this.el.appendChild(child);
      } else {
        console.log(`${" ".repeat(i + 1)}sub-rendering component`, child);

        this.renderComponent(child, i + 1);
      }
    }

    console.log(`${" ".repeat(i + 1)}rendered component`, element);
  }
}
