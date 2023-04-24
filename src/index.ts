import { init } from './framework';
import { FuckingComponent } from './framework/Component';
import { $el, $text } from './framework/utils/utils';

const main = () => {
  const el = document.querySelector('#app');
  if (!el) {
    throw new Error('Could not find #app element');
  }

  class HomeComponent extends FuckingComponent {
    private c = [$el('h1', {}, {}, [$text('Hey!')]), new CounterComponent()];

    children() {
      return this.c;
    }
  }

  class CounterComponent extends FuckingComponent {
    private i = 1;

    private onClick() {
      this.i += 1;

      fw.rerender();
    }

    children(): Node[] {
      return [
        $el('button', {}, { click: () => this.onClick() }, [$text('+1')]),
        $el('br'),
        $text(`Count: ${this.i}`)
        // $el(
        //   'div',
        //   {},
        //   {},
        //   new Array(this.i).fill(0).map((_, i) => $el('div', {}, {}, [$el('text', {}, {}, [$text(i.toString())]), $el('br', {}, {}, [])]))
        // )
      ];
    }
  }

  const fw = init(el, new HomeComponent());
  fw.rerender();
};

main();
