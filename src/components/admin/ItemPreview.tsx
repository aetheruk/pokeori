'use client'
import React from 'react'
import { useField } from '@payloadcms/ui'
import { ItemSprite } from '../ui/item-sprite'

const ItemPreview: React.FC<{ path: string }> = ({ path }) => {
  const targetPath = path.replace('.itemPreview', '.targetItemId')
  const itemPath = path.replace('.itemPreview', '.itemId')

  const { value: targetId } = useField<string>({ path: targetPath })
  const { value: itemId } = useField<string>({ path: itemPath })

  const id = targetId || itemId

  if (!id) return null

  return (
    <div style={{ marginTop: '10px', marginBottom: '20px' }}>
      <div
        className="field-label"
        style={{
          marginBottom: '5px',
          display: 'block',
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#9a9a9a',
        }}
      >
        Preview
      </div>
      <div
        style={{
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f3f3f3',
          borderRadius: '4px',
          border: '1px solid #e0e0e0',
        }}
      >
        <ItemSprite
          itemId={id}
          alt={id}
          width={64}
          height={64}
          className="max-w-full max-h-full pixelated"
        />
      </div>
    </div>
  )
}

export default ItemPreview
