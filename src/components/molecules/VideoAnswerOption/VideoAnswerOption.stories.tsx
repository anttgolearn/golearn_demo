import type { Meta, StoryObj } from '@storybook/react';
import { VideoAnswerOption } from './VideoAnswerOption';

const meta: Meta<typeof VideoAnswerOption> = {
  title: 'Molecules/VideoAnswerOption',
  component: VideoAnswerOption,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isSelected: {
      control: 'boolean',
    },
    isCorrect: {
      control: { type: 'select', options: [null, true, false] },
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VideoAnswerOption>;

export const Default: Story = {
  args: {
    videoSrc: '/resources/videos/hello.mp4',
    label: 'HELLO',
    isSelected: false,
    isCorrect: null,
    onClick: () => console.log('Option clicked'),
    disabled: false,
  },
};

export const Selected: Story = {
  args: {
    videoSrc: '/resources/videos/hello.mp4',
    label: 'HELLO',
    isSelected: true,
    isCorrect: null,
    onClick: () => console.log('Option clicked'),
    disabled: false,
  },
};

export const CorrectAnswer: Story = {
  args: {
    videoSrc: '/resources/videos/hello.mp4',
    label: 'HELLO',
    isSelected: true,
    isCorrect: true,
    onClick: () => console.log('Option clicked'),
    disabled: true,
  },
};

export const IncorrectAnswer: Story = {
  args: {
    videoSrc: '/resources/videos/welcome.mp4',
    label: 'WELCOME',
    isSelected: true,
    isCorrect: false,
    onClick: () => console.log('Option clicked'),
    disabled: true,
  },
};
