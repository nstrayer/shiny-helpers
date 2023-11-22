export type { CustomElementInput } from "./makeInputBinding";
export { makeInputBinding } from "./makeInputBinding";
export { makeOutputBinding } from "./makeOutputBinding";
export { makeReactInput } from "./makeReactInput";
export { makeReactOutput } from "./makeReactOutput";
// type Shiny = typeof window.Shiny | undefined;
// export type { Shiny };

// Add export of Shiny so people can use it in their own code
/// <reference types="@types/rstudio-shiny" />
