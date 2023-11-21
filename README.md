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

## Development

To build the package locally run

```bash
npm run build
```

This runs `tsc` and generates the production code in the `dist` folder.

## Submitting to NPM

_Coming soon!_
