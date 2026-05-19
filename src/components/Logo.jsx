// Reusable logo component using the Annur Agency brand image
export default function Logo({ className = 'w-7 h-7', rounded = 'rounded-md' }) {
  return (
    <img
      src="/logo.jpg"
      alt="Annur Agency"
      className={`${className} ${rounded} object-cover`}
    />
  );
}
