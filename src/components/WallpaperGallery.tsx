// --- WallpaperGallery.tsx with Dynamic Categories ---
// ... (all the imports)

// Component now accepts 'categories' as a prop
export function WallpaperGallery({ wallpapers, categories, onWallpaperSelect, ... }) {
  // ... (all your existing state variables)

  // The hardcoded 'categories' array has been REMOVED.
  // It will now use the 'categories' prop passed from App.tsx.

  // ... (rest of the component logic)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories section now maps over the dynamic 'categories' prop */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Browse Categories</h2>
        <div className="flex flex-wrap gap-2">
          {/* Add an "All" button manually first */}
          <Button
              key="all"
              variant={selectedCategory === 'all' ? "default" : "outline"}
              onClick={() => setSelectedCategory('all')}
          >
              All
          </Button>
          {/* Map over the fetched categories */}
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* ... (rest of the WallpaperGallery component) */}
    </div>
  );
}
