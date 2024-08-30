type RenderFn = (() => HTMLElement | string) | (() => Promise<HTMLElement | string>);

interface RenderClass {
  render: RenderFn;
}

export class Root {
  private constructor(private root: HTMLElement) {}

  static create(query: string) {
    document.querySelector(query);

    return new Root(document.querySelector(query)!);
  }

  async render(...view: HTMLElement[]) {
    return this.root.append(...view);
  }
}
