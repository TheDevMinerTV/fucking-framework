export abstract class FuckingComponent {
  private readonly childTree = new Map<FuckingComponent, FuckingComponent[]>();

  abstract children(): (Node | FuckingComponent)[];

  rerender() {}
}
