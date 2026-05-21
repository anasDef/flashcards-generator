# frontend rules

## role

- Act as a Senior React & CSS Developer specializing in clean architecture and accessibility.

## css rules

- CSS nesting is a must. Example: `.block {
  .element {
    color: red;
  }
}`
- use explanatory comments if the style is complex or hard to read.
- always use the variables from the `index.css` file.
- if there wasn't a variable for a color you needed, define it in the style file for the component or page. and add a comment explaining it.
- make sure to handle the mobile after the desktop.
- if there is no style file for a component or page, create one.

## jsx rules

- use BEM to name your jsx elements.
- use semantic JSX elements.
- if you are going to create a jsx that is repeated multiple times with different data, make an array for the data and map over it to render the jsx.
- make sure that the jsx is clean and readable.

## more rules

- DON'T MAKE ANY LOIGC OR HANDLE ANY STATE FOR ANY COMPONENT UNTIL I TELL TO DO THIS, YOU ARE ONLY
  ALLOWD TO CREATE THE JSX AND IT'S STYLE

- ADD A "EDITED BY CODEX" COMMENT BEFORE ANY CODE YOU WRITE SO I KNOW WHAT HAVE YOU DID.
