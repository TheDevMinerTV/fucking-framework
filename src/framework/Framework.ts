import { FuckingComponent } from './Component';

export class FuckingFramework {
  constructor(private el: Element, private rootElement: FuckingComponent) {}

  rerender() {
    setTimeout(() => {
      let childNodes: Node[] = [];

      for (const child of this.el.childNodes) {
        childNodes.push(child);
      }

      for (const child of childNodes) {
        this.el.removeChild(child);
      }

      const render = (element: FuckingComponent, i = 0) => {
        // console.log(`${' '.repeat(i)}rendering`, element);

        for (const childEl of element.children()) {
          if (childEl instanceof Node) {
            // console.log(`${' '.repeat(i + 1)}appending`, childEl);

            this.el.appendChild(childEl);
          } else {
            // console.log(`${' '.repeat(i + 1)}sub-rendering`, childEl);

            render(childEl, i + 1);
          }
        }

        // console.log(`${' '.repeat(i + 1)}rendered`, element);
      };

      render(this.rootElement);
    }, 0);
  }
}
