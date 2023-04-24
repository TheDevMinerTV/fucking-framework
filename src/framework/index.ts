import { FuckingComponent } from './Component';
import { FuckingFramework } from './Framework';

export const init = (el: Element, rootElement: FuckingComponent) => {
  const fw = new FuckingFramework(el, rootElement);

  console.log('FuckingFramework initialized');

  return fw;
};
