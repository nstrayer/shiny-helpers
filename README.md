# `Shiny-Helpers`

## What

This is a package with a set of conveneince helpers for extending Shiny with Javascript/Typescript code. It contains functions like `makeInputBinding()` which helps abstract away boilerplate for custom input bindings and also provides Types for the main `Shiny.js`.

## Usage

Install the package:

```bash
npm install shiny-helpers
```

Import the package:

```typescript
import type { Shiny } from "shiny-helpers";
import { makeInputBinding } from "shiny-helpers";
```

## Functions

### `CustomElementInput`

Typescript interface for the `input` element. Extends the default `HTMLElement` to include the `value` property for holding the input value, and a `notifyBindingOfChange()` method for notifying Shiny of a change in the input value.

### `makeInputBinding()`

Function for creating a custom input binding given a tag name for a custom element (following the `CustomElementInput` interface.) Function takes care of registering input binding to ShinyCustomElementInput.

### `CustomElementOutput`

Typescript interface for the `output` element. Extends the default `HTMLElement` to include the `value` property for holding the output value.

An element that implements this interface should watch for changes in the `value` property and update the rending accordingly.

### `makeOutputBinding()`

Function for creating a custom output binding given a tag name for a custom element (following the `CustomElementOutput` interface.) Function takes care of registering output binding to Shiny.

### `makeReactInput()`

Convenience function for creating a custom input binding for a React component. Takes care of registering the input binding to Shiny.

Arguments:

- `tagName`: The name of the custom element that will be used to render the React component.
- `initialValue`: The initial value of the input.
- `renderComp`: A function that setsup the react component.
- `priority`: Should the value be immediately (`immediate`) updated wait to the next even loop (` "deferred"`)? Typically left at the default of "immediate".

Example:

```typescript
// Generates a new input binding that renders the supplied react component
// into the root of the webcomponent.
makeReactInput({
  tagName: "react-demo",
  initialValue: "#fff",
  renderComp: ({ onNewValue }) => (
    <ColorPickerReact
      initialValue="#fff"
      onNewValue={(color) => onNewValue(color)}
    />
  ),
});
```

### `makeReactOutput()`

Make a custom Shiny input binding using a react component. Takes care of registering the output binding to Shiny. Encapsulates the React component in a webcomponent internally so the UI generation function just needs to be a return an HTMLTools `Tag` with the name of the custom element.

Arguments:

- `tagName`: The name of the custom element that will be used to render the React component.
- `renderComp`: A function that setsup the react component. Is a function that takes as an argument the payload sent over from the server. This is set by the user and can/should be typed to match the payload sent from the server on the TS side with the generic argument. Ex.

```typescript
makeReactOutput<{ value: number }>({
  tagName: "testing-output-comp",
  renderComp: ({ value }) => {
    return <div>My value is: {value}</div>;
  },
});
```

## Development

To build the package locally run

```bash
npm run build
```

This runs `tsc` and generates the production code in the `dist` folder.
