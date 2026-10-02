import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

interface Question {
  id: string
  attemptId?: string
  question: string
  options: Array<
    | string
    | {
        value: string
        label: string
        disabledUntil?: number
        highlighted?: boolean
        highlightedUntil?: number
      }
  >
}

interface QuestionPromptProps {
  currentQuestion: Question | null
  questionLoading: boolean
  answerStatus: 'correct' | 'incorrect' | null
  selectedOptionIndex?: number | null
  submittingAnswer?: boolean
  kidMode?: boolean
  appearance?: 'default' | 'catch'
  handleAnswer: (answer: string, idx: number) => void
}

export function QuestionPrompt({
  currentQuestion,
  questionLoading,
  answerStatus,
  selectedOptionIndex,
  submittingAnswer,
  kidMode,
  appearance = 'default',
  handleAnswer,
}: QuestionPromptProps) {
  const isCatchAppearance = appearance === 'catch'

  return (
    <motion.div
      key="quiz-phase"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col max-w-3xl mx-auto w-full h-full justify-center relative z-10"
    >
      {/* Question text — slide per question */}
      <div
        className={cn(
          'relative flex flex-none shrink-0 justify-center text-game-ink',
          isCatchAppearance
            ? 'mb-4 min-h-14 items-center px-3 py-2'
            : 'mb-4 min-h-[5rem] items-center overflow-hidden rounded-lg border border-game-border bg-game-surface-raised px-4 py-5 shadow-sm backdrop-blur-xl',
        )}
      >
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentQuestion?.attemptId ?? currentQuestion?.id ?? 'loading'}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className={cn(
              'relative z-10 line-clamp-3 text-center font-semibold text-game-ink',
              isCatchAppearance
                ? 'text-base leading-snug md:text-lg'
                : 'text-lg leading-relaxed md:text-xl',
            )}
          >
            {questionLoading ? (
              <span className="font-sans not-italic tracking-normal text-game-muted">
                Loading question…
              </span>
            ) : (
              currentQuestion?.question
            )}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Answer rows — full width with shape icon on left */}
      <div
        className={cn(
          'flex flex-col pb-4',
          isCatchAppearance ? 'gap-3' : 'gap-2.5',
        )}
      >
        {!questionLoading &&
          currentQuestion?.options.map((option, idx) => {
            const optionValue =
              typeof option === 'string' ? option : option.value
            const optionLabel =
              typeof option === 'string' ? option : option.label
            const disabledUntil =
              typeof option === 'string' ? undefined : option.disabledUntil
            const highlighted =
              typeof option !== 'string' &&
              (option.highlighted ||
                (option.highlightedUntil !== undefined &&
                  option.highlightedUntil > Date.now()))
            const selected = selectedOptionIndex === idx
            const disabled =
              submittingAnswer ||
              !!answerStatus ||
              (disabledUntil !== undefined && disabledUntil > Date.now())
            const showSprites = kidMode
            // Shape icons: circle, square, diamond, star
            const shapes = [
              <svg
                key="circle"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <circle cx="12" cy="12" r="9" />
              </svg>,
              <svg
                key="square"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>,
              <svg
                key="diamond"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <polygon points="12,2 22,12 12,22 2,12" />
              </svg>,
              <svg
                key="star"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>,
            ]
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleAnswer(optionValue, idx)}
                disabled={disabled}
                aria-pressed={selected}
                className={cn(
                  'game-focus-ring group relative flex min-h-16 w-full items-center gap-3 overflow-hidden rounded-lg border px-3 py-3 text-left text-game-ink transition-[border-color,background-color,box-shadow] duration-150 disabled:pointer-events-none',
                  isCatchAppearance
                    ? 'border-game-card-border bg-game-surface-raised shadow-[0_2px_6px_rgb(75_62_39_/_0.08)] hover:border-game-charcoal/40 hover:bg-game-surface hover:shadow-[0_3px_9px_rgb(75_62_39_/_0.11)] active:bg-game-canvas'
                    : 'border-game-border bg-game-surface-raised shadow-sm backdrop-blur-xl hover:border-game-moss/35 hover:bg-game-surface',
                  selected && answerStatus
                    ? 'disabled:opacity-100'
                    : isCatchAppearance
                      ? 'disabled:opacity-75'
                      : 'disabled:opacity-50',
                  highlighted && 'border-game-ochre/60 bg-game-ochre/10',
                  selected &&
                    !answerStatus &&
                    (isCatchAppearance
                      ? 'border-game-charcoal bg-game-charcoal/8 ring-1 ring-game-charcoal/25'
                      : 'border-game-moss bg-game-moss/12 ring-1 ring-game-moss/35'),
                  selected &&
                    answerStatus === 'correct' &&
                    'border-game-health bg-game-health/25 ring-1 ring-game-health/50',
                  selected &&
                    answerStatus === 'incorrect' &&
                    'border-game-danger bg-game-danger/10 ring-1 ring-game-danger/30',
                  selected && 'opacity-100',
                )}
              >
                <div className="relative shrink-0">
                  <div
                    className={cn(
                      'relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border',
                      isCatchAppearance
                        ? 'border-game-charcoal/35 bg-game-canvas/80 text-game-charcoal-strong shadow-inner'
                        : 'border-game-moss/25 bg-game-canvas text-game-moss-strong',
                    )}
                  >
                    {shapes[idx]}
                  </div>
                </div>

                {showSprites ? (
                  <div className="relative w-12 h-12 z-10">
                    <Image
                      src={getPokemonImageUrl(optionValue, 'sprite')}
                      alt="Pokemon"
                      fill
                      className="object-contain pixelated drop-shadow-md"
                    />
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={optionLabel}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="z-10 flex-1 text-sm font-bold leading-snug text-game-ink"
                    >
                      {optionLabel}
                    </motion.span>
                  </AnimatePresence>
                )}
                {selected && submittingAnswer && (
                  <Loader2
                    className={cn(
                      'relative z-10 ml-auto h-4 w-4 shrink-0 animate-spin',
                      isCatchAppearance
                        ? 'text-game-charcoal-strong'
                        : 'text-game-moss',
                    )}
                  />
                )}
              </button>
            )
          })}
      </div>
    </motion.div>
  )
}
