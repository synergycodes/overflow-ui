![@synergycodes/axiom logo](./about/images/axiom-logo.svg)

# @synergycodes/axiom

A React library for creating node-based user interfaces and diagram-driven apps. Built to work seamlessly with React Flow, it provides a collection of ready-to-use components and templates that simplify the development of visual editors, workflows, and interactive diagrams.

Developed and maintained by **[Synergy Codes](https://www.synergycodes.com/)**.

## Quick Start: 3-Minute Guide

### 📦 Installation

Use one of the commands below to add **Axiom** to your project:

```bash
npm install @synergycodes/axiom
```

```bash
pnpm add @synergycodes/axiom
```

```bash
yarn add @synergycodes/axiom
```

### 🎨 Import styles

Add to your style sheet or component:

```css
@import '@synergycodes/axiom/axiom.css';
```

```tsx
import '@synergycodes/axiom/axiom.css';
```

### 🎛️ Use components

```tsx
import { Input } from '@synergycodes/axiom';

// …

<Input value={value} onChange={onChange} />;
```

## Customization

Each axiom component uses CSS variables that are derived from primitive values.

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

### Axiom layers of philosophy

Axiom uses [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to separate its styles from yours. By default, CSS styles outside of any layer take precedence over what Axiom defines, so your styles will always win the specificity war. You can customize Axiom components with simple `input {}`.


```css
@layer ui.component {
  .separator {
    /* … */
  }
}
```

Default axiom order:
```css
@layer ui.base, ui.component;
```

If you want to use layers in your code, just add them at the end.

## Showcase

**[Workflow Builder](https://www.workflowbuilder.io/)** is a frontend-focused starter app for building workflows, offering core features, best practices, and easy backend integration for faster client delivery.

https://www.workflowbuilder.io/
