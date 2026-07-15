'use client'
import React from 'react'
import Image from 'next/image'
import { useField } from '@payloadcms/ui'
import { getPokemonImageUrl } from '../../utilities/pokemon/pokedex'

const PokemonPreview: React.FC<{ path: string }> = ({ path }) => {
  const siblingPath = path.replace('.pokemonPreview', '.id')

  const { value: pokemonId } = useField<string>({ path: siblingPath })

  if (!pokemonId) return null

  const url = getPokemonImageUrl(pokemonId, 'sprite')

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
        <Image
          src={url}
          alt={pokemonId}
          width={64}
          height={64}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            imageRendering: 'pixelated',
          }}
        />
      </div>
    </div>
  )
}

export default PokemonPreview
