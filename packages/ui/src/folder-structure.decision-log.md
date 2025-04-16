# Folder Structure

Proposed by: **Piotr Błaszczyk**

Date: **18.12.2024**

## Context

A consistent and scalable folder structure is crucial for managing reusable UI components.

In this package:

- The `components` folder contains all UI components.
- The `shared` folder centralizes common types and styles.
- The `styles` folder defines global variables and CSS layers.

This structure ensures better separation of concerns, making the UI library more maintainable and reusable across different projects.

## Decision

To achieve these objectives, the following folder structure and guidelines were established:

1. **Components Folder Structure**:

   - The `components` folder serves as a central repository for all reusable and base components.
   - Each component group is stored in its respective subfolder.

2. **Component Grouping**:

   - Components with multiple implementations (e.g., `NavButton`, `IconButton`) are grouped under a single folder named after the component category (e.g., `button`).
   - This organization ensures related components are logically grouped and easily discoverable.

3. **Shared Resources**:

   - If any type or style is used by multiple components across different groups, it is placed in the `shared` folder within.
   - Examples include global types or common CSS styles that are not specific to a single component group.

4. **Variables for CSS**:

   - Each CSS module file defines its CSS variables at the very top of the file, inside the `:root` section. This makes it easy to locate and manage variable definitions.
   - Variables prefixed with `--ax-public` can be used directly within the component.
   - Variables prefixed only with `--ax` (without `--public`) represent tokens from the design system and should **not** be used directly in components. This establishes an anti-corruption layer, ensuring a clear separation between design system tokens and component-level variables.

5. **Types for Component Groups**:

   - A `types.ts` file is created inside a component group folder if multiple components within the group share the same types.
   - This approach centralizes type definitions and avoids duplication.

6. **Reusability Across Components**:
   - Components can depend on and reuse other components. For example:
     - A `Separator` component may be used in both the `Menu` and `Select` components.
   - This encourages a modular design where components are built with reusability in mind.

## Consequences

- **Maintainability**:

  - Logical grouping of components and centralized shared resources improve clarity and make updates easier to manage.

- **Scalability**:

  - The folder structure supports growth by accommodating additional components or styles without causing clutter.

- **Consistency**:

  - Aligning CSS variables with design system tokens ensures consistent styling across the application.

- **Reusability**:
  - Shared styles and types promote reusability, reducing redundancy and development time.

## Status

Accepted
