interface RootEvents {
  selector: string;
  listener: EventListener;
}
export class Root {
  private static events: Record<string, RootEvents[]> = {};
  private static root: Element;

  private constructor(root: Element) {
    Root.root = root;

    Root.setEventListeners();
  }

  static create(query: string) {
    const root = document.querySelector(query)!;

    return new Root(root);
  }

  async render(...view: HTMLElement[]) {
    return Root.root.append(...view);
  }

  static getEventsAndRoot(): (typeof Root)['events'] {
    return Root.events;
  }

  static setEventListeners() {
    for (const key of Object.keys(ROOT_EVENT_KEYS)) {
      const eventType = key as keyof HTMLElementEventMap;

      Root.root.addEventListener(eventType, (e) => {
        const target = e?.target as HTMLElement;

        if (!target) return;

        const listeners = Root.events[eventType]!;

        if (!listeners) return;

        listeners?.forEach(({ selector, listener }) => {
          const elements = Root.root.querySelectorAll(selector);

          elements.forEach((element) => {
            if (element === target || element.contains(target)) {
              listener(e);
            }
          });
        });
      });
    }
  }
}

const ROOT_EVENT_KEYS = {
  click: 'click',
  change: 'change',
  input: 'input',
  submit: 'submit',
  keydown: 'keydown',
  keyup: 'keyup',
  keypress: 'keypress',
  focus: 'focus',
  blur: 'blur',
  mouseover: 'mouseover',
  mouseout: 'mouseout',
  mouseenter: 'mouseenter',
  mouseleave: 'mouseleave',
  mousedown: 'mousedown',
  mouseup: 'mouseup',
  contextmenu: 'contextmenu',
  dblclick: 'dblclick',
  wheel: 'wheel',
  drag: 'drag',
  dragstart: 'dragstart',
  dragend: 'dragend',
  dragenter: 'dragenter',
  dragleave: 'dragleave',
  dragover: 'dragover',
  drop: 'drop',
  scroll: 'scroll',
  focusin: 'focusin',
  focusout: 'focusout',
  select: 'select',
  resize: 'resize',
  touchstart: 'touchstart',
  touchend: 'touchend',
  touchmove: 'touchmove',
};
