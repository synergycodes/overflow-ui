# Button Components Redesign: Structural Discrimination & API Simplification

Proposed by: **Piotr Błaszczyk**

Date: **12.06.2025**

## Context

The original implementation of button components involved creating four distinct components (`LabelButton`, `NavButton`, `IconButton`, and `IconLabelButton`) to cover different usage scenarios. While this provided a high degree of specificity and control, it introduced complexity in the API.

Each button type had its own props, styling logic, and render behavior. While maintainable in the short term, it made the overall button API harder to learn and less adaptable to changes.

With the evolution of our design system, the need emerged for a more **unified**, **simpler**, and **smarter** API that maintains strong **type safety**, and full **customizability**.

## Decision

To simplify the API while increasing flexibility and consistency, we refactored the button components using **structural discrimination** and **TypeScript overloads**. This led to the introduction of only two components:

### `Button`

### `NavButton`

Both components now support three rendering modes, automatically selected based on the `children` structure:

- **LabelButton** → Rendered when `children` is a plain `string`
- **IconButton** → Rendered when `children` is a single `ReactElement` (icon)
- **IconLabelButton** → Rendered when `children` includes both `string` and one or two icons (before/after)

### Key Improvements

1. **Structural Discrimination**

   - The component infers the correct variant purely from the structure of `children`, not from a manual `type` prop.
   - This significantly simplifies usage while maintaining strict prop boundaries.

2. **Overload-based Props**

   - TypeScript function overloads are used to expose only valid prop combinations for each type.
   - Invalid combinations (e.g., passing label-specific props to an icon-only button) are caught at compile time.

3. **API Parity**

   - `NavButton` now supports the same rendering flexibility as `Button`, adapting automatically to icon-only, label-only, or mixed children.

4. **Facade Design**

   - Under the hood, the same internal components (`LabelButton`, `IconButton`, `IconLabelButton`) are still used.
   - A lightweight **facade layer** determines the correct button types based on structural cues and delegates rendering to the appropriate internal component.
   - This separation allows the internal implementation to stay clean and type-safe, while simplifying the public API.

## Consequences

- **Simplified Usage**: Consumers use one consistent Button API without needing to remember different component names for different content types.
- **Strong Type Safety**: Incorrect prop usage is prevented by TypeScript at compile time.
- **Alignment with Design System**: The new components fully match the latest design system expectations while reducing entry friction for developers.
- **White-label Ready**: Continued use of CSS Modules ensures easy theming and customization per client.
- **Ease of Migration**: Existing buttons can be migrated progressively by converting them to use the new `Button` or `NavButton` with the appropriate children.
- **Future-Proofing**: The facade model allows additional internal types to be added or optimized without breaking the public API.

## Status

Accepted
