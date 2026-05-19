/**
 * MD3 Card / Surface — tonal background, organic radius, progressive shadow.
 *
 * Tones:
 * - default   : surface-container (#F0E7D5) — main card colour
 * - low       : surface-container-low (lighter)
 * - high      : surface-container-high (darker)
 * - inverse   : near-black (#1A1410) for dark panels (sidebar/hero CTA)
 *
 * Behaviour flags:
 * - interactive : Adds hover shadow + scale + cursor pointer
 * - radius      : 'md' (16px) | 'lg' (24px, default) | 'xl' (28px) | '2xl' (32px) | '3xl' (48px hero)
 */

const tones = {
  default: 'bg-md-surface-container text-md-on-surface',
  low: 'bg-md-surface-container-low text-md-on-surface',
  high: 'bg-md-surface-container-high text-md-on-surface',
  lowest: 'bg-md-surface-container-lowest text-md-on-surface',
  inverse: 'bg-md-inverse-surface text-md-inverse-on-surface',
};

const radii = {
  md: 'rounded-2xl',          // 16px
  lg: 'rounded-[24px]',       // 24px
  xl: 'rounded-[28px]',       // 28px
  '2xl': 'rounded-[32px]',    // 32px
  '3xl': 'rounded-[48px]',    // 48px hero
};

export default function Card({
  tone = 'default',
  radius = 'lg',
  interactive = false,
  className = '',
  children,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={[
        tones[tone],
        radii[radius],
        'shadow-md-1',
        'transition-all duration-300 md-emphasized',
        interactive
          ? 'cursor-pointer hover:shadow-md-2 hover:scale-[1.02] active:scale-[0.99]'
          : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Component>
  );
}
