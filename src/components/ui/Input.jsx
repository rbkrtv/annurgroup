/**
 * MD3 Filled Text Field — distinctive rounded-top, square-bottom, 2px bottom border.
 *
 * The label sits ABOVE the input (we skip MD3's internal floating label
 * pattern — explicit external labels are clearer for forms in BM).
 *
 * Use the `select` variant for native dropdowns or `textarea` for multiline.
 */

const baseField =
  'block w-full text-md-on-surface placeholder-md-on-surface-variant/60 ' +
  'bg-md-surface-container-low border-0 border-b-2 border-md-outline ' +
  'rounded-t-xl rounded-b-none ' +
  'px-4 outline-none transition-colors duration-200 md-emphasized ' +
  'focus:border-md-primary focus:bg-md-surface-container ' +
  'disabled:opacity-50';

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`${baseField} h-14 ${className}`}
      {...props}
    />
  );
}

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`${baseField} h-14 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23524937%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({ className = '', rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`${baseField} py-3 resize-none ${className}`}
      {...props}
    />
  );
}

/**
 * Field — wraps a label + input together with consistent spacing.
 *
 * Usage:
 *   <Field label="Nama Penuh" required>
 *     <Input ... />
 *   </Field>
 */
export function Field({ label, required, hint, error, children, className = '' }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-md-on-surface-variant">
          {label}
          {required && <span className="text-md-primary ml-0.5">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs text-md-on-surface-variant/80 px-2">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-md-error px-2">{error}</p>
      )}
    </div>
  );
}

export default Input;
