import { BUTTON_VARIANTS, LabelButton, SIZES } from "@axiom/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { createSelect } from "../../utils/create-select";
import { defaultMeta } from "../../utils/default-meta";

const meta = {
  ...defaultMeta,
  title: "Buttons/Label Button",
  component: LabelButton,
  argTypes: {
    label: { control: "text" },
    isLoading: { control: "boolean" },
    variant: createSelect(BUTTON_VARIANTS),
    size: createSelect(SIZES),
  },
} satisfies Meta<typeof LabelButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelButtonStory: Story = {
  name: "Component",
  args: {
    label: "Button",
    variant: "primary",
    size: "medium",
    isLoading: false,
  },
};
