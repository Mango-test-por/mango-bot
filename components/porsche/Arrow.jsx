export default function Arrow({ direction = 'right' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === 'right' ? 'M4 12h16m-6-6 6 6-6 6' : 'M20 12H4m6-6-6 6 6 6'} />
    </svg>
  );
}
