// app/gallery/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse p-10">
      <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-40 bg-gray-300 dark:bg-gray-700 rounded"
          ></div>
        ))}
      </div>
    </div>
  );
}
