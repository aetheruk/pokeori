'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Play, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { runGameDataGeneration, runGameDataValidation } from '../actions'

type ToolState = 'idle' | 'validating' | 'generating' | 'generating-local' | 'dry-run'

export function GameDataTools() {
  const [state, setState] = React.useState<ToolState>('idle')
  const [output, setOutput] = React.useState('')
  const isBusy = state !== 'idle'

  const runValidation = async () => {
    setState('validating')
    const result = await runGameDataValidation()
    setOutput(result.output)
    setState('idle')
    if (result.success) toast.success('Game data validation passed')
    else toast.error('Game data validation failed')
  }

  const runGeneration = async (skipFetch: boolean) => {
    setState(skipFetch ? 'generating-local' : 'generating')
    const result = await runGameDataGeneration({ skipFetch })
    setOutput(result.output)
    setState('idle')
    if (result.success) toast.success('Game data generation completed')
    else toast.error('Game data generation failed')
  }

  const runDryRun = async () => {
    setState('dry-run')
    const result = await runGameDataGeneration({ skipFetch: true, dryRun: true })
    setOutput(result.output)
    setState('idle')
    if (result.success) toast.success('Game data dry run completed')
    else toast.error('Game data dry run failed')
  }

  return (
    <section className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Game Data Pipeline</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Run the unified generation pipeline and integrity checks from the dev tools.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" disabled={isBusy} onClick={runValidation}>
            {state === 'validating' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ShieldCheck className="mr-2 h-4 w-4" />
            )}
            Validate
          </Button>
          <Button variant="outline" disabled={isBusy} onClick={runDryRun}>
            {state === 'dry-run' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            Dry Run
          </Button>
          <Button variant="outline" disabled={isBusy} onClick={() => runGeneration(true)}>
            {state === 'generating-local' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            Generate Local
          </Button>
          <Button disabled={isBusy} onClick={() => runGeneration(false)}>
            {state === 'generating' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            Generate + Fetch
          </Button>
        </div>
      </div>

      {output && (
        <pre className="mt-4 max-h-80 overflow-auto rounded border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
          {output}
        </pre>
      )}
    </section>
  )
}
