import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  DexCountSummary,
  DexEmptyState,
  DexFilterBar,
  DexInspectorSection,
  DexPageShell,
  DexStatusChip,
} from '@/components/game/dex'

describe('shared Dex presentation', () => {
  test('renders the common page hierarchy and labelled filter surface', () => {
    const markup = renderToStaticMarkup(
      <DexPageShell title="AbilityDex" subtitle="12 registered">
        <DexFilterBar label="Ability filters">
          <input aria-label="Search abilities" />
        </DexFilterBar>
      </DexPageShell>,
    )

    expect(markup).toContain('<h1')
    expect(markup).toContain('AbilityDex')
    expect(markup).toContain('aria-label="Ability filters"')
    expect(markup).toContain('game-desktop-workspace')
  })

  test('exposes result counts and discovery states without color alone', () => {
    const markup = renderToStaticMarkup(
      <>
        <DexCountSummary count={3} detail="registered only" />
        <DexStatusChip tone="registered">Registered</DexStatusChip>
        <DexStatusChip tone="unknown">Unknown</DexStatusChip>
      </>,
    )

    expect(markup).toContain('role="status"')
    expect(markup).toContain('aria-live="polite"')
    expect(markup).toContain('registered only')
    expect(markup).toContain('Registered')
    expect(markup).toContain('Unknown')
  })

  test('renders consistent empty and inspector sections', () => {
    const markup = renderToStaticMarkup(
      <>
        <DexEmptyState title="No records" description="Clear the search." />
        <DexInspectorSection title="Supported forms">
          <p>One form</p>
        </DexInspectorSection>
      </>,
    )

    expect(markup).toContain('No records')
    expect(markup).toContain('Clear the search.')
    expect(markup).toContain('Supported forms')
    expect(markup).toContain('One form')
  })
})
