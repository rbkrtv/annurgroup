/**
 * Section — vertical rhythm primitive for landing page.
 *
 * Standardizes section padding, max-width, and optional eyebrow/heading block.
 * Tones map to the MD3 surface system so we alternate page bands cleanly.
 */

const tones = {
  surface: 'bg-md-background',
  container: 'bg-md-surface-container-low',
  high: 'bg-md-surface-container',
  inverse: 'bg-md-inverse-surface text-md-inverse-on-surface',
};

export default function Section({
  id,
  tone = 'surface',
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  containerClassName = '',
  children,
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <section
      id={id}
      className={[
        'relative overflow-hidden',
        'py-16 md:py-24',
        tones[tone],
        className,
      ].join(' ')}
    >
      <div
        className={[
          'relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          containerClassName,
        ].join(' ')}
      >
        {(eyebrow || title || subtitle) && (
          <div className={`mb-12 max-w-2xl ${alignClass}`}>
            {eyebrow && (
              <span
                className={[
                  'inline-block text-xs font-semibold tracking-[0.12em] uppercase',
                  tone === 'inverse'
                    ? 'text-md-inverse-primary'
                    : 'text-md-primary',
                ].join(' ')}
              >
                {eyebrow}
              </span>
            )}
            {title && (
              <h2
                className={[
                  'mt-3 text-[2rem] md:text-[2.5rem] font-medium leading-[1.15] tracking-[-0.01em]',
                  tone === 'inverse'
                    ? 'text-md-inverse-on-surface'
                    : 'text-md-on-surface',
                ].join(' ')}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={[
                  'mt-4 text-[17px] leading-[1.6]',
                  tone === 'inverse'
                    ? 'text-md-inverse-on-surface/80'
                    : 'text-md-on-surface-variant',
                ].join(' ')}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
