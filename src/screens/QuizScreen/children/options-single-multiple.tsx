import React, { useEffect } from 'react';
import { TextAnswers } from './text-answers';
import { ImageAnswers } from './image-answers';
import { VideoAnswers } from './video-answers';
import { getQuestionTypeFromAnswers } from './get-question-type';

type OptionProps = {
  text: string;
  url?: string | null;
  isCorrect?: boolean;
  label?: string | null;
};

type ChoosePanelProps = {
  options: OptionProps[];
  selectedAnswers: number[];
  onSubmitAnswer: (index: number) => void;
  isAnswered: boolean;
  type: 'single' | 'multiple';
};

interface Props {
  question: {
    answerOptions: Array<{
      answerText: string;
      media?: {
        url?: string;
        label?: string;
        caption?: string;
      };
      isCorrect?: boolean;
    }>;
    type: 'single' | 'multiple';
    isAnswered?: boolean;
  };
  onSubmitAnswer: (answers: number[]) => void;
  selectedAnswers: number[];
}

export const OptionsSingleMultiple: React.FC<Props> = (props) => {
  const _renderOptions = () => {
    const _onSubmitAnswer = (index: number) => {
      if (!props.question.answerOptions[index]) {
        return;
      }

      if (props.question.type === 'single') {
        props.onSubmitAnswer([index]);
      } else if (props.question.type === 'multiple') {
        const answers = new Set(props.selectedAnswers);
        if (answers.has(index)) {
          answers.delete(index);
        } else {
          answers.add(index);
        }
        props.onSubmitAnswer(Array.from(answers));
      }
    };

    // Keyboard support
    useEffect(() => {
      if (props.question.isAnswered) return;
      
      const handler = (evt: KeyboardEvent) => {
        if (!/^[1-4]$/.test(evt.key)) return;
        _onSubmitAnswer(Number(evt.key) - 1);
      };
      
      window.addEventListener('keyup', handler);
      return () => window.removeEventListener('keyup', handler);
    }, [props.question.isAnswered, props.selectedAnswers]);

    const commonProps: ChoosePanelProps = {
      options: props.question.answerOptions.map((option) => {
        let label = option.media && props.question.isAnswered ? option.media.label : null;

        if (option.media?.caption) {
          label = option.media.caption;
        }

        return {
          text: option.answerText,
          url: option.media?.url ?? null,
          isCorrect: option.isCorrect,
          label,
        } as OptionProps;
      }),
      selectedAnswers: props.selectedAnswers,
      onSubmitAnswer: _onSubmitAnswer,
      isAnswered: props.question.isAnswered || false,
      type: props.question.type as 'single' | 'multiple',
    };

    const _questionType = getQuestionTypeFromAnswers(commonProps.options);

    // Dynamic rendering based on question type
    switch (_questionType) {
      case 'text':
        return <TextAnswers {...commonProps} />;
      case 'image':
        return <ImageAnswers {...commonProps} />;
      case 'video':
        return <VideoAnswers {...commonProps} />;
      default:
        return <TextAnswers {...commonProps} />;
    }
  };

  return (
    <div data-testid={`question-type-${props.question.type}`}>
      {_renderOptions()}
    </div>
  );
};