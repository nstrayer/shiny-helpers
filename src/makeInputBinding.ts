import { Shiny } from "./OptionalShiny";

/**
 * A custom element that extends this interface will be treated as an input
 * binding by Shiny when paired with `makeInputBinding()`.
 */
export interface CustomElementInput<T = string> extends HTMLElement {
  id: string;
  value: T;
  onChangeCallback: (x: boolean) => void;
}

/**
 * Given a tag name for a custom element that is a CustomElementInput<T>, this
 * will hook up the proper input binding and register it with Shiny.
 * @param tagName Name of the tag that corresponds to the input binding
 * @param elementComponent The component that will be used to render the input.
 * This is used for type-checking the input.
 * @returns Nothing
 */
export function makeInputBinding<El extends CustomElementInput<unknown>>(
  tagName: string,
  { type = null }: { type?: string | null } = {}
) {
  if (!Shiny) {
    return;
  }

  class NewCustomBinding extends Shiny["InputBinding"] {
    constructor() {
      super();
    }

    override find(scope: HTMLElement): JQuery<El> {
      return $(scope).find(tagName) as JQuery<El>;
    }

    override getValue(el: El) {
      return el.value;
    }

    override getType(_: El): string | null {
      return type;
    }

    override subscribe(el: El, callback: (x: boolean) => void): void {
      el.onChangeCallback = callback;
    }

    override unsubscribe(el: El): void {
      el.onChangeCallback = (_: boolean) => {};
    }
  }

  Shiny.inputBindings.register(new NewCustomBinding(), `${tagName}-Binding`);
}
