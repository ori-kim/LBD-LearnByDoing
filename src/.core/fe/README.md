# 프론트엔드 Component 

[ateals - 바닐라 TS를 통해 응집도 높은 프론트엔드 컴포넌트 만들기](https://blog.ateals.me/posts/%EB%B0%94%EB%8B%90%EB%9D%BC%20TS%EB%A5%BC%20%ED%86%B5%ED%95%B4%20%EC%9D%91%EC%A7%91%EB%8F%84%20%EB%86%92%EC%9D%80%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EB%A7%8C%EB%93%A4%EA%B8%B0)

> 구조는 [rune](https://marpple.github.io/rune/tutorial/event.html)를 통해 영감 받았습니다. (매우가아아아득)

## defineComponent

컴포넌트를 선언할 수 있습니다.


```ts
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
```

Component class를 상속받아 2가지 메서드를 오버 라이딩합니다.

- template : 실제 돔에 렌더링될 탬플릿입니다.
- onRender : element가 돔에 렌더링 되었을 때 동작하는 핸들러입니다.


또한 여러가지 헬퍼 메서드를 지원합니다.

### delegate

이벤트 위임을 위한 메서드입니다. 

```ts
class Button extends View {
  template() {
    return html`<div ${this.selector}>
      <button class="btn">버튼</button>
      <button>버튼</button>

      <button>버튼</button>
      <button>버튼</button>
    </div>`;
  }

  protected onRender(): void {
    console.log('Button rendered');

    this.delegate('button.btn', 'click', () => {
      console.log(this.target('button.btn'), '버튼 클릭');
    });
  }
}
```

### target

엘리먼트를 선택할 수 있는 메서드입니다. 인자로 하위 태그의 css 셀렉터를 넘겨 자식 엘리먼트를 선택할 수 있습니다.

```ts

const Button = defineComponent(
  class extends Component<{ color: string }> {
    template() {
      return html`
      <div>
        <button
          ${style({
            color: this.state.color,
          })}
        >
          ${this.state.color}
        </button>
      </div>`;
    }

    protected onRender(): void {
      this.target("button")!.addEventListener('click', () => {
        this.state.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      });
    }
  },
);
```


## Style

TS의 Tmpl 내부에 style을 넣을때 객체 리터럴로 넣었을때 DX가 좋을 것이라고 판단했습니다. typescript 타입에 CSSStyleDeclaration라는 css 속성 interface가 있기 때문에 style 자동완성도 도움 받을 수 있습니다.

덕분에 개발자는 css 속성을 최고조로 암기하지 않고 "아 그거 뭐더라?"를 줄일 수 있습니다.

```ts
console.log(
  `${style({
    color: 'red',
    backgroundColor: 'blue',
    marginBottom: '1rem',
  })}`,
);

//style="color:red; background-color:blue; margin-bottom:1rem;"
```