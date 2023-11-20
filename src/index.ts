export type { CustomElementInput } from "./makeInputBinding";
export { makeInputBinding } from "./makeInputBinding";
export { makeOutputBinding } from "./makeOutputBinding";

// Add export of Shiny so people can use it in their own code
type Shiny = typeof window.Shiny | undefined;
export type { Shiny };
