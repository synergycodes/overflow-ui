[//]: # "This README file is part of the overflow-ui documentation website (check overview.mdx)"

A React library for creating node-based user interfaces and diagram-driven apps. Built to work seamlessly with React Flow, it provides a collection of ready-to-use components and templates that simplify the development of visual editors, workflows, and interactive diagrams.

Developed and maintained by **[Synergy Codes](https://www.synergycodes.com/)**.

## Quick Start: 3-Minute Guide

### 📦 Installation

Use one of the commands below to add **overflow-ui** to your project:

```bash
npm install @synergycodes/overflow-ui
```

```bash
pnpm add @synergycodes/overflow-ui
```

```bash
yarn add @synergycodes/overflow-ui
```

### 🎨 Import styles

Add to your style sheet or component:

```css
@import '@synergycodes/overflow-ui/tokens.css';
```

```tsx
import '@synergycodes/overflow-ui/tokens.css';
```

### 🌗 Set the theme

To make the styles use proper variables, include `data-theme` (`light` or `dark`) attribute in `<html>`:

```html
<html data-theme="light">
```

### 🎛️ Use components

```tsx
import { Input } from '@synergycodes/overflow-ui';

// …

<Input value={value} onChange={onChange} />;
```

## Customization

Each overflow-ui component uses CSS variables that are derived from primitive values.

You can override them:

```css
:root {
  --ax-ui-bg-primary-default: #40ba12;
}
```

or a derived value used by the selected component:

```css
:root {
  --ax-public-date-picker-dropdown-background: #40ba12;
}
```

### overflow-ui css layers

overflow-ui uses [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to separate its styles from yours. By default, CSS styles outside of any layer take precedence over what overflow-ui defines, so your styles will always win the specificity war. You can customize overflow-ui components with simple `input {}`.


```css
@layer ui.component {
  .separator {
    /* … */
  }
}
```

Default overflow-ui order:
```css
@layer ui.base, ui.component;
```

If you want to use layers in your code, just add them at the end.

## Showcase

**[Workflow Builder](https://www.workflowbuilder.io/)** is a frontend-focused starter app for building workflows, offering core features, best practices, and easy backend integration for faster client delivery.

https://www.workflowbuilder.io/
