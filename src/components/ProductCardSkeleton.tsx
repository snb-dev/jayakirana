export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card">
      <div className="aspect-[4/3] w-full animate-pulse bg-gray-200" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-10 w-full animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
