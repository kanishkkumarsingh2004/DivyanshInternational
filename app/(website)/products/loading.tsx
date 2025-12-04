export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="h-12 w-48 bg-gray-200 rounded mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 bg-gray-100 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
