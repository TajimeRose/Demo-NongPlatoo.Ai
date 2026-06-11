import { useMemo, useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import PlaceCard from "@/components/PlaceCard";
import { usePlaceFilters } from "@/hooks/usePlaceFilters";
import { places } from "@/data/places";
import { CATEGORIES, DISTRICTS } from "@/data/placesConstants";

const Places = () => {
  const [showFilters, setShowFilters] = useState(false);
  const {
    search,
    selectedDistrict,
    selectedCategory,
    setSearch,
    handleDistrictChange,
    handleCategoryChange,
    clearFilters,
    hasActiveFilters,
  } = usePlaceFilters();

  const filteredPlaces = useMemo(
    () =>
      places.filter((place) => {
        if (selectedDistrict && place.district !== selectedDistrict) return false;
        if (selectedCategory && place.category !== selectedCategory) return false;
        if (!search) return true;

        const query = search.toLowerCase();
        return (
          place.name.toLowerCase().includes(query) ||
          place.nameTh.includes(search) ||
          place.description.toLowerCase().includes(query) ||
          place.descriptionTh.includes(search) ||
          place.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }),
    [search, selectedCategory, selectedDistrict]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <header className="pt-24 pb-8 bg-gradient-sky">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              สถานที่ท่องเที่ยว
            </h1>
            <Badge className="bg-golden text-primary">Demo Data</Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Explore Places — {filteredPlaces.length} destinations to discover
          </p>
        </div>
      </header>

      <div className="sticky top-16 z-40 bg-card/95 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ค้นหาสถานที่... (Search places)"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-10 h-12 bg-background"
              />
            </div>

            <Button
              variant="outline"
              className="md:hidden h-12"
              onClick={() => setShowFilters((value) => !value)}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
              {hasActiveFilters && <Badge className="ml-2">Active</Badge>}
            </Button>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="hidden md:flex h-12">
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          <div className={`mt-4 space-y-4 ${showFilters ? "block" : "hidden md:block"}`}>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                อำเภอ (District)
              </p>
              <div className="flex flex-wrap gap-2">
                {DISTRICTS.map((district) => (
                  <Button
                    key={district.value}
                    variant={selectedDistrict === district.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDistrictChange(district.value)}
                    className="rounded-full"
                  >
                    {district.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                ประเภท (Category)
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "sky" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category.value)}
                    className="rounded-full"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="py-8">
        <div className="container mx-auto px-4">
          {filteredPlaces.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                พบ {filteredPlaces.length} สถานที่ (Found {filteredPlaces.length} places)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaces.map((place, index) => (
                  <PlaceCard
                    key={place.id}
                    {...place}
                    className={`animate-slide-up animation-delay-${(index % 3) * 100}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                ไม่พบสถานที่
              </h3>
              <p className="text-muted-foreground">
                No places found. Try adjusting your filters.
              </p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Places;
