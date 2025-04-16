# Button Components Design and Implementation

Proposed by: **Piotr Błaszczyk**

Date: **12.12.2024**

## Context

In the project, button components were designed with two primary goals:

1. Avoid repetition of styles for different button types.
2. Ensure that each button type only exposes props relevant to its purpose, while providing a centralized place to set common props (e.g., `disabled`, `tooltip`).

The solution needed to support visual customization, scalability, and client-specific styling, given the project's white-label nature. Additionally, accessibility was a critical requirement.

To meet these goals, the we considered using `shadcn/ui`, but since it relies on Tailwind CSS, which may not be preferred by all clients, we decided on a simpler and more flexible approach using CSS Modules and MUI's headless `MuiBaseButton`.

## Decision

To satisfy these requirements, the following approach was implemented:

1. **Button Types**: Four distinct button components were created:

   - **LabelButton**: Designed for buttons with text labels.
   - **NavButton**: Used for navigation-related buttons.
   - **ImageButton**: For buttons containing only images.
   - **ImageLabelButton**: Combines text labels and images.

2. **ButtonBase Component**:

   - A shared base component (`BaseButton`) was created and inherited by all specific button components.
   - It applies common styles, uses `styles` class name provided by parent components, and accepts a `className` prop for custom styling.

3. **Styles Structure**:

   - Common styles were placed in dedicated CSS Module files located in the `buttons/styles` folder.
   - Specific styles for each button type were implemented within the respective component's folder. These styles include properties that cannot be reused, such as unique paddings.

4. **Style Composition**:

   - Specific button components utilize styles via the `clsx` utility. For instance:
     ```tsx
     clsx(
       variantStyles[variant],
       borderRadiusStyles[size],
       fontSizeStyles[size],
       paddingStyles[size],
     );
     ```
     This ensures that common properties like `borderRadius`, `fontSize`, and `variant` are consistently applied across all button types.

5. **MuiBaseButton**:

   - All buttons are based on MUI's headless `MuiBaseButton`, ensuring accessibility while allowing full control over styles.

6. **Rationale for Choice**:
   - The simplicity and flexibility of CSS Modules allow the project to remain white-label-ready.
   - The decision to use `MuiBaseButton` ensures accessible components while avoiding the constraints of external libraries like `shadcn/ui` and Tailwind CSS.

## Consequences

- **Maintainability**: The separation of common and specific styles enhances maintainability, allowing for easy updates and scalability.
- **Customizability**: The use of `clsx` for style composition ensures flexibility in visual adjustments.
- **Accessibility**: Leveraging `MuiBaseButton` ensures the buttons meet accessibility standards.
- **Client Compatibility**: The white-label design remains client-friendly, as no external frameworks like Tailwind CSS are enforced.
- **Reusability**: Common styles are centralized, promoting reuse across different button types while still allowing for unique customizations.

## Status

Accepted
