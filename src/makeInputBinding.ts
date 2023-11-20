import { Shiny } from "./OptionalShiny";

export interface CustomElementInputValue<T> extends HTMLElement {
  id: string;
  value: T;
  onChangeCallback: (x: boolean) => void;
}

export interface CustomElementInputGetValue<T> extends HTMLElement {
  id: string;
  getValue: () => T;
  onChangeCallback: (x: boolean) => void;
}

export type CustomElementInput<T> =
  | CustomElementInputValue<T>
  | CustomElementInputGetValue<T>;

/**
 * Given a tag name for a custom element that is a CustomElementInput<T>, this
 * will hook up the proper input binding and register it with Shiny.
 * @param tagName Name of the tag that corresponds to the input binding
 * @returns Nothing
 */
export function makeInputBinding<T>(
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

    override find(scope: HTMLElement): JQuery<CustomElementInput<T>> {
      return $(scope).find(tagName) as JQuery<CustomElementInput<T>>;
    }

    override getValue(
      el: CustomElementInputValue<T> | CustomElementInputGetValue<T>
    ) {
      if ("getValue" in el) {
        return el.getValue();
      } else {
        return el.value;
      }
    }

    override getType(_: CustomElementInput<T>): string | null {
      return type;
    }

    override subscribe(
      el: CustomElementInput<T>,
      callback: (x: boolean) => void
    ): void {
      el.onChangeCallback = callback;
    }

    override unsubscribe(el: CustomElementInput<T>): void {
      el.onChangeCallback = (_: boolean) => {};
    }
  }

  Shiny.inputBindings.register(new NewCustomBinding(), `${tagName}-Binding`);
}
