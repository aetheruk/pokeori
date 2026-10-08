interface AlphaParticlesProps {
  className?: string
}

export function AlphaParticles({ className = '' }: AlphaParticlesProps) {
  return (
    <div
      className={`pokemon-alpha-particles ${className}`}
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5, 6].map((particle) => (
        <span key={particle} />
      ))}
    </div>
  )
}
