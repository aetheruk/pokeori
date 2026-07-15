import { ReactNode, createElement } from 'react'

export function parseText(text: string | undefined, trainerName: string | undefined): ReactNode {
  if (!text) return ''

  // 1. Handle {Trainer} replacement
  const processedText = trainerName ? text.replace(/{Trainer}/gi, trainerName) : text

  // 2. Handle [System Message] formatting using regex split
  // The regex captures the content inside brackets so we can use it
  const parts = processedText.split(/(\[[^\]]+\])/g)

  if (parts.length === 1) return processedText

  return parts.map((part, index) => {
    // Check if this part matches [content]
    if (part.startsWith('[') && part.endsWith(']')) {
      const content = part.slice(1, -1) // remove brackets
      return createElement(
        'span',
        {
          key: index,
          className: 'text-teal-400 font-mono text-[0.9em] tracking-wide',
        },
        content,
      )
    }
    return part
  })
}
