[//]: # 'This README file is part of the Overflow UI documentation website (check overview.mdx)'

A React Flow components library for creating node-based user interfaces and diagram-driven apps. Built to work seamlessly with React Flow, it provides a collection of ready-to-use components and templates that simplify the development of visual editors, workflows, and interactive diagrams.

Developed and maintained by **[Synergy Codes](https://www.synergycodes.com/)**.

## Quick Start: 3-Minute Guide

### 📦 Installation

Use one of the commands below to add **Overflow UI** to your project:

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
<html data-theme="light"></html>
```

### 🎛️ Use components

```tsx
import { Input } from '@synergycodes/overflow-ui';

// …

<Input value={value} onChange={onChange} />;
```

### Customization

Each Overflow UI component uses CSS variables that are derived from primitive values.

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

### Overflow UI CSS layers

Overflow UI uses [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to separate its styles from yours. By default, CSS styles outside of any layer take precedence over what Overflow UI defines, so your styles will always win the specificity war. You can customize Overflow UI components with simple `input {}`.

```css
@layer ui.component {
  .separator {
    /* … */
  }
}
```

Default Overflow UI order:

```css
@layer ui.base, ui.component;
```

If you want to use layers in your code, just add them at the end.

### Showcase

**[Workflow Builder](https://www.workflowbuilder.io/)** is a frontend-focused starter app for building workflows, offering core features, best practices, and easy backend integration for faster client delivery.

https://www.workflowbuilder.io/

**Browse the list of components and discover solutions tailored to your needs. If you have questions or suggestions, feel free to reach out.**

### FAQ

**1. What is the Overflow UI component library?**\
Overflow UI is an open-source component library designed to enrich the user interface of diagramming applications. It includes both standard UI components – such as buttons, modals, and menus – as well as diagram-specific components like nodes and edges. All components follow the Overflow Design System, ensuring a consistent and modern look for your application.

**2. Where should I start with Overflow libraries?**\
We encourage you to explore both libraries – each component comes with its own documentation, usage examples, and implementation guidelines to help you get started quickly.

**3. How do you ensure transparency in the direction of the UI components library?**\
The UI Components library is developed iteratively. New features and improvements are released regularly, and all key design and implementation decisions are documented in our decision logs. This gives you full insight into the direction of development and the rationale behind every change.

**4. Can I safely override styles without fighting specificity?**\
Yes. Overflow UI uses CSS layers (@layer ui.base, ui.component). Your non-layered styles or layers declared later take precedence, so simple selectors win.

**5. Do you have a design system available?**\
Yes, we have a design system available in Figma, and we can provide it as a PRO component.
