/**
 * BlurShape — atmospheric organic blur shape for hero/section backgrounds.
 *
 * MD3's signature visual element. Multiple shapes layered create depth.
 * Always wrap in a parent with `relative overflow-hidden`.
 *
 * Always rendered with aria-hidden so screen-readers ignore them.
 */

const colors = {
  primary: 'bg-md-primary',
  primaryContainer: 'bg-md-primary-container',
  secondary: 'bg-md-secondary',
  secondaryContainer: 'bg-md-secondary-container',
  tertiary: 'bg-md-tertiary',
  inverse: 'bg-md-inverse-primary',
};

const sizes = {
  sm: 'w-48 h-48',
  md: 'w-72 h-72',
  lg: 'w-96 h-96',
  xl: 'w-[36rem] h-[36rem]',
};

/**
 * Render a single decorative blob.
 *
 * @param {Object} props
 * @param {'primary'|'primaryContainer'|'secondary'|'secondaryContainer'|'tertiary'|'inverse'} props.color
 * @param {'sm'|'md'|'lg'|'xl'} props.size
 * @param {number} props.opacity     - 0..100, default 30
 * @param {string} props.position    - tailwind positional classes (e.g. "top-0 -left-20")
 * @param {boolean} props.pill       - render as pill (rounded-[100px] with one corner less round)
 */
export default function BlurShape({
  color = 'primary',
  size = 'lg',
  opacity = 30,
  position = '',
  pill = false,
  className = '',
}) {
  return (
    <div
      aria-hidden="true"
      className={[
        'absolute pointer-events-none',
        sizes[size],
        colors[color],
        pill ? 'rounded-[100px] rounded-tr-[20px]' : 'rounded-full',
        'mix-blend-multiply blur-3xl',
        position,
        className,
      ].join(' ')}
      style={{ opacity: opacity / 100 }}
    />
  );
}

/**
 * BlurShapeField — preset cluster of 3 atmospheric shapes.
 * Drop into any section that needs the signature MD3 atmospheric backdrop.
 */
export function BlurShapeField({ tone = 'light' }) {
  if (tone === 'dark') {
    return (
      <>
        <BlurShape color="inverse" size="xl" opacity={20} position="-top-40 -left-40" />
        <BlurShape color="primary" size="lg" opacity={25} position="bottom-0 right-0 translate-x-1/4 translate-y-1/4" pill />
        <BlurShape color="tertiary" size="md" opacity={30} position="top-1/2 left-1/3" />
      </>
    );
  }
  return (
    <>
      <BlurShape color="primaryContainer" size="xl" opacity={50} position="-top-40 -right-40" />
      <BlurShape color="secondaryContainer" size="lg" opacity={45} position="-bottom-32 -left-32" pill />
      <BlurShape color="primary" size="md" opacity={15} position="top-1/3 left-1/4" />
    </>
  );
}
