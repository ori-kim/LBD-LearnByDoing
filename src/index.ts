import { html, Root, style, Tmpl } from './.core/fe';
import { Component, defineComponent } from './.core/fe/Component';

const Color = defineComponent(
  class extends Component<{ color: string }> {
    template(data: { color: string }): Tmpl {
      return html`<button
      ${style({
        backgroundColor: data.color,
        border: 'none',
        padding: '2rem',
        margin: '1rem',
      })}">${data.color}</button>`;
    }

    protected onRender(): void {
      this.target()!.addEventListener('click', () => {
        this.state.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      });
    }
  },
);

const FlexBox = defineComponent(
  class extends Component<{ children: Component[] }> {
    constructor(...children: Component[]) {
      super({ children });
    }

    template() {
      return html` <div
        ${style({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        ${this.state.children}
      </div>`;
    }
  },
);

const root = Root.create('#app');

root.render(new FlexBox(new Color({ color: 'red' }), new Color({ color: 'blue' })));
