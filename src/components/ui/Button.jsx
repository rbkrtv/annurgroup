/**
 * MD3 Button — pill-shaped, state-layered, with active scale feedback.
 *
 * Variants:
 * - filled    : Primary CTA (gold bg, white text)
 * - tonal     : Secondary (gold container bg, dark text)
 * - outlined  : Tertiary action (transparent bg, outline border)
 * - text      : Ghost (transparent, primary text)
 * - inverse   : For dark surfaces (gold accent on black bg)
 */

const sizes = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-[15px]',
};

const variants = {
  filled:
    'bg-md-primary text-md-on-primary hover:bg-md-primary-hover ' +
    'shadow-md-1 hover:shadow-md-2',
  tonal:
    'bg-md-primary-container text-md-on-primary-container ' +
    'hover:bg-md-primary-container/85',
  outlined:
    'bg-transparent text-md-primary border border-md-outline ' +
    'hover:bg-md-primary/5',
  text:
    'bg-transparent text-md-primary hover:bg-md-primary/10',
  inverse:
    'bg-md-inverse-primary text-md-inverse-surface ' +
    'hover:bg-md-inverse-primary/90 shadow-md-1 hover:shadow-md-2',
};

export default function Button({
  variant = 'filled',
  size = 'md',
  className = '',
  iconLeft: IconLeft,
  iconRight: IconRight,
  children,
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={[
        // Base
        'inline-flex items-center justify-center gap-2 rounded-full',
        'font-medium tracking-[0.01em] whitespace-nowrap',
        'transition-all duration-300 md-emphasized',
        'active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2',
        // Variant + size
        sizes[size],
        variants[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {IconLeft && <IconLeft className="w-4 h-4 -ml-1" aria-hidden="true" />}
      {children}
      {IconRight && <IconRight className="w-4 h-4 -mr-1" aria-hidden="true" />}
    </Component>
  );
}
