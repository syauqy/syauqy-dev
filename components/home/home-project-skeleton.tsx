export default function HomeProjectSkeleton() {
  return (
    <div className="border-gray-300 rounded-md border p-4">
      <div className="flex flex-col space-y-4 animate-pulse">
        <div className="bg-gray-400 h-5 w-1/3 rounded-md"></div>
        <div className="bg-gray-400 h-10 rounded-md"></div>
        <div className="bg-gray-400 h-4 w-1/4 rounded-md"></div>
        <div className="bg-gray-400 h-3 w-1/2 rounded-md"></div>
      </div>
    </div>
  );
}
