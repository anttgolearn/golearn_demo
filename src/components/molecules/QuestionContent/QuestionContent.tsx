import React from "react";

// Mock constants and utilities - these would need to be imported from actual modules
const QuestionCategories = {
  CONTENT: { CAT_1C: 'CONTENT_CAT_1C' },
  CLOZE_ANSWER: { CAT_4Z: 'CLOZE_ANSWER_CAT_4Z' }
};

const Mixpanel = {
  trackMirrorOpened: (data: any) => {
    console.log('Mixpanel trackMirrorOpened:', data);
  }
};

const requestCameraPermission = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
  } catch (error) {
    console.error('Camera permission denied:', error);
    throw error;
  }
};

const reportIssueAs = (issue: string) => (error: any) => {
  console.error(`Issue ${issue}:`, error);
};

const dimensions = { width: window.innerWidth };
const sizes = { quiz: { imageMax: 400 } };

// Placeholder components - these would need to be implemented or imported from a design system
const Video = ({ videoUrl, label, sizeType, onMirrorPress }: any) => (
  <div className={`w-full ${sizeType === 'partialWidth' ? 'max-w-2xl' : 'max-w-4xl'} mb-8`}>
    <div className="relative rounded-xl border bg-white overflow-hidden h-64" data-testid="atom-video">
      <video
        src={videoUrl}
        autoPlay
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: '0px',
          objectFit: 'contain',
          width: '100%',
          height: '100%'
        }}
      />
      {onMirrorPress && (
        <button
          aria-label="Open sign mirror"
          role="button"
          className="absolute bottom-2 left-2 inline-flex items-center justify-center w-6 h-8 bg-white/90 hover:bg-white transition-colors rounded"
          data-testid="mirror-button"
          type="button"
          onClick={onMirrorPress}
        >
          <svg
            width="24"
            height="32"
            viewBox="0 0 24 32"
            fill="none"
            style={{
              objectPosition: 'left 50% top 50%',
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: '0px',
              top: '0px',
              objectFit: 'contain',
              transitionDuration: '0ms',
              transitionTimingFunction: 'linear'
            }}
          >
            <rect x="4" y="4" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M8 28L12 24L16 28" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </button>
      )}
      {label && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {label}
        </div>
      )}
    </div>
  </div>
);

const Picture = ({ desiredWidth, uri, label }: any) => (
  <div className="w-full max-w-4xl mb-8">
    <div className="relative rounded-xl border bg-white overflow-hidden">
      <img
        src={uri}
        alt={label || "Question content"}
        className="w-full h-auto object-contain"
        style={{ maxWidth: desiredWidth }}
      />
      {label && (
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {label}
        </div>
      )}
    </div>
  </div>
);

const HtmlContent = ({ content, variant }: any) => (
  <div 
    className={`w-full max-w-4xl mb-8 prose prose-lg ${variant === 'body-medium' ? 'text-base' : ''}`}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const Table = ({ hasHeader, alignLeft, data }: any) => (
  <div className="w-full max-w-4xl mb-8 overflow-x-auto">
    <div className="rounded-xl border bg-white p-4">
      <table className={`w-full ${alignLeft ? 'text-left' : 'text-center'}`}>
        {hasHeader && data.length > 0 && (
          <thead>
            <tr className="border-b">
              {data[0].map((cell: any, index: number) => (
                <th key={index} className="px-4 py-2 font-semibold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {(hasHeader ? data.slice(1) : data).map((row: any[], rowIndex: number) => (
            <tr key={rowIndex} className="border-b last:border-b-0">
              {row.map((cell: any, cellIndex: number) => (
                <td key={cellIndex} className="px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Grid = ({ children }: any) => (
  <div className="w-full max-w-4xl mb-8">
    {children}
  </div>
);

type QuestionPart = {
  type: 'video' | 'image' | 'html' | 'table';
  url?: string;
  content?: string;
  caption?: string;
  tableData?: {
    hasHeader: boolean;
    alignLeft: boolean;
    data: any[][];
  };
};

type QuestionContentProps = {
  prompt: string;
  questionParts?: QuestionPart[];
  mediaUrl?: string;
  fullWidth?: boolean; // true for full width, false for partial width
  onMirrorClick?: (videoSrc: string) => void;
  isLabelShown?: boolean;
  question?: {
    id: string;
    title: string;
    category: string;
  };
};

export const QuestionContent: React.FC<QuestionContentProps> = ({
  prompt,
  questionParts = [],
  mediaUrl,
  fullWidth = true,
  onMirrorClick,
  isLabelShown = false,
  question,
}) => {
  const [, setMirrorVideo] = React.useState<string | null>(null); // For future mirror functionality
  const _hasMirror = !!onMirrorClick;

  const renderVideo = (src: string, isPartialWidth = false) => (
    <div className={`w-full ${isPartialWidth ? 'max-w-2xl' : 'max-w-4xl'} mb-8`}>
      <div className="relative rounded-xl border bg-white overflow-hidden h-64" data-testid="atom-video">
        <video
          src={src}
          autoPlay
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: '0px',
            objectFit: 'contain',
            width: '100%',
            height: '100%'
          }}
        />
        {onMirrorClick && (
          <button
            aria-label="Open sign mirror"
            role="button"
            className="absolute bottom-2 left-2 inline-flex items-center justify-center w-6 h-8 bg-white/90 hover:bg-white transition-colors rounded"
            data-testid="mirror-button"
            type="button"
            onClick={() => onMirrorClick(src)}
          >
            <svg
              width="24"
              height="32"
              viewBox="0 0 24 32"
              fill="none"
              style={{
                objectPosition: 'left 50% top 50%',
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: '0px',
                top: '0px',
                objectFit: 'contain',
                transitionDuration: '0ms',
                transitionTimingFunction: 'linear'
              }}
            >
              {/* Mirror icon - simplified version */}
              <rect x="4" y="4" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M8 28L12 24L16 28" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );


  const renderContent = () => {
    // If we have questionParts, render them
    if (questionParts.length > 0) {
      return (
        <>
          {questionParts.map((qPart, index) => {
            switch (qPart.type) {
              case 'video':
                return (
                  <Video
                    key={index}
                    videoUrl={qPart.url}
                    label={
                      (isLabelShown && qPart.content) ||
                      (QuestionCategories.CLOZE_ANSWER.CAT_4Z && qPart.caption) ||
                      ''
                    }
                    sizeType={
                      question?.category === QuestionCategories.CONTENT.CAT_1C
                        ? 'partialWidth'
                        : 'fullWidth'
                    }
                    onMirrorPress={
                      _hasMirror
                        ? () => {
                            Mixpanel.trackMirrorOpened({
                              question_id: question?.id,
                              question_title: question?.title,
                            });

                            requestCameraPermission().catch(
                              reportIssueAs('videos.request_camera_permission'),
                            );
                            setMirrorVideo(qPart.url || null);
                          }
                        : undefined
                    }
                  />
                );
              case 'image':
                let label = (isLabelShown && qPart.content) || '';

                if (qPart.caption) {
                  label = qPart.caption;
                }

                return (
                  <Picture
                    desiredWidth={
                      dimensions.width > sizes.quiz.imageMax
                        ? sizes.quiz.imageMax
                        : dimensions.width - 32
                    }
                    key={index}
                    uri={qPart.url}
                    label={label}
                  />
                );
              case 'html':
                return (
                  <Grid key={index}>
                    <HtmlContent content={qPart.content} variant="body-medium" />
                  </Grid>
                );
              case 'table':
                if (!qPart.tableData) {
                  return null;
                }
                const {hasHeader, alignLeft, data} = qPart.tableData;
                return (
                  <Grid key={index}>
                    <Table hasHeader={hasHeader} alignLeft={alignLeft} data={data} />
                  </Grid>
                );
              default:
                return null;
            }
          })}
        </>
      );
    }

    // Fallback to mediaUrl if no questionParts
    if (mediaUrl) {
      return renderVideo(mediaUrl, !fullWidth);
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center animate-fade-in w-full">
      <div className="text-center text-xl font-bold mb-8 w-full">{prompt}</div>
      {renderContent()}
    </div>
  );
};

export default QuestionContent;