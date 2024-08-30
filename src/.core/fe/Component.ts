import { Observable, Store } from './Store';
import { html } from './Tmpl';

const DATA_VIEW_ID = 'data-component-id';

export abstract class Component<T extends object = {}> extends HTMLElement {
  private _element: HTMLElement | null = null;
  public _viewId = Math.floor(Math.random() * 100000);
  public state: Observable<T> = {} as Observable<T>;

  constructor(data: T = {} as T) {
    super();
    this.state = Store(data);

    this.state.onChange((state) => {
      this._update();
    });
  }

  get selector() {
    return `[${DATA_VIEW_ID}="${this._viewId}"]`;
  }

  template(data: T) {
    return html``;
  }
  protected onRender() {}

  connectedCallback() {
    const element = this.render();

    this.replaceWith(element);
  }

  element() {
    if (!this._element) throw new Error('Element not Rendered');

    return this._element;
  }

  target(childSelector?: string) {
    const selector = `${this.selector} ${childSelector || ''}`;

    return document.querySelector(selector) as HTMLElement | null;
  }

  _update() {
    const element = this.render();

    this.target()!.replaceWith(element);
  }

  render() {
    const wapper = document.createElement('div');

    wapper.innerHTML = this.template(this.state).toHtml();

    const element = (wapper.firstElementChild! || '') as HTMLElement;

    element.setAttribute(DATA_VIEW_ID, `${this._viewId}`);

    this._element = element;

    requestAnimationFrame(() => this.onRender());

    return element;
  }

  delegate<T extends keyof DocumentEventMap>(
    target: string,
    eventName: T,
    listener: (e: Event, observed: HTMLElement) => void,
  ) {
    this.target()!.addEventListener(eventName, (e) => {
      const elements = this.target()!.querySelectorAll(target);

      for (const element of elements) {
        const isContain = element.contains(e.target as Node);

        if (isContain) return listener(e, element as HTMLElement);
      }
    });
  }
}

interface DefineComponentOptions {
  name?: string;
}

export const defineComponent = <T extends CustomElementConstructor>(
  constructor: T,
  options: DefineComponentOptions = {},
): T => {
  const name = options.name || Math.random().toString(16).slice(2, 8);

  customElements.define(`c-${name}`, constructor);
  return constructor;
};
