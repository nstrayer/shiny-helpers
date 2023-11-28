import { Shiny } from "./OptionalShiny";

/**
 * A custom element that extends this interface will be treated as an output
 * binding by Shiny when paired with `makeOutputBinding()`.
 */
export interface CustomElementOutput<T> extends HTMLElement {
  value: T;
}

/**
 * Given a tag name for a custom element that extends CustomElementOutput<T>,
 * this will hook up the proper output binding and register it with Shiny.
 * @param tagName Name of the tag that corresponds to the output binding
 * @returns Nothing
 */
export function makeOutputBinding<El extends CustomElementOutput<T>, T>(
  tagName: string
) {
  if (!Shiny) {
    return;
  }

  class NewCustomBinding extends Shiny["OutputBinding"] {
    override find(scope: HTMLElement): JQuery<El> {
      return $(scope).find(tagName) as JQuery<El>;
    }

    override renderValue(el: El, data: T): void {
      el.value = data;
    }
  }

  Shiny.outputBindings.register(new NewCustomBinding(), `${tagName}-Binding`);
}
