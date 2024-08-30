import { Component } from './Component';
import { zip } from './FP';

export class Tmpl {
  constructor(
    private strings: TemplateStringsArray,
    private values: any[],
  ) {}

  private _merge = (value: unknown) => (Array.isArray(value) ? value.reduce((a, b) => html`${a}${b}`) : value);

  private parse = (value: unknown) => {
    if (value instanceof Component) return value.render().outerHTML;
    if (value instanceof Tmpl) return value.toHtml();

    return value ? `${value}` : '';
  };

  toHtml(): string {
    const parsedValues = this.values.map((v) => this.parse(this._merge(v)));

    return zip(this.strings, parsedValues).flat().join('');
  }
}

export const html = (strings: TemplateStringsArray, ...values: any[]) => {
  return new Tmpl(strings, values);
};
