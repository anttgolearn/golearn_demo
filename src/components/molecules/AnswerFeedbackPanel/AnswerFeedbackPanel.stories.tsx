import type { Meta, StoryObj } from '@storybook/react';
import { AnswerFeedbackPanel } from './AnswerFeedbackPanel';

const meta: Meta<typeof AnswerFeedbackPanel> = {
  title: 'Molecules/AnswerFeedbackPanel',
  component: AnswerFeedbackPanel,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isCorrect: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnswerFeedbackPanel>;

export const Correct: Story = {
  args: {
    isCorrect: true,
    onNext: () => console.log('Next clicked'),
  },
};

export const Incorrect: Story = {
  args: {
    isCorrect: false,
    onNext: () => console.log('Next clicked'),
  },
};
