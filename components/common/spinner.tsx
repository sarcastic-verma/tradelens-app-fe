export const Spinner = ({ color }: { color?: string }) => (
  <div
    className={`w-12 h-12 rounded-full animate-spin border-2 border-solid ${color ?? 'border-blue-500'} border-t-transparent`}
  />
);
