import { useMemo, useState } from "react";
import { Search, Filter, X, MapPin, Map as MapIcon, Grid as GridIcon, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import PlaceCard from "@/components/PlaceCard";
import { usePlaceFilters } from "@/hooks/usePlaceFilters";
import { places, Place } from "@/data/places";
import { CATEGORIES, DISTRICTS } from "@/data/placesConstants";

const Places = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "grid" | "map">("all");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

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

  const mapCenterLat = selectedPlace ? selectedPlace.latitude : 13.415;
  const mapCenterLng = selectedPlace ? selectedPlace.longitude : 99.98;
  const mapZoom = selectedPlace ? 15 : 12;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <header className="pt-24 pb-8 bg-gradient-sky">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                สถานที่ท่องเที่ยว
              </h1>
              <p className="text-muted-foreground text-lg mt-1">
                Explore Places — {filteredPlaces.length} destinations to discover
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-card border border-border p-1 rounded-xl shadow-sm">
              <Button
                size="sm"
                variant={activeTab === "all" ? "default" : "ghost"}
                onClick={() => setActiveTab("all")}
                className="gap-1.5 text-xs sm:text-sm"
              >
                <span>ทั้งหมด</span>
              </Button>
              <Button
                size="sm"
                variant={activeTab === "grid" ? "default" : "ghost"}
                onClick={() => setActiveTab("grid")}
                className="gap-1.5 text-xs sm:text-sm"
              >
                <GridIcon className="w-4 h-4" />
                <span>รายการ</span>
              </Button>
              <Button
                size="sm"
                variant={activeTab === "map" ? "default" : "ghost"}
                onClick={() => setActiveTab("map")}
                className="gap-1.5 text-xs sm:text-sm"
              >
                <MapIcon className="w-4 h-4" />
                <span>แผนที่</span>
              </Button>
            </div>
          </div>
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
          {/* Map View Section (Shown when activeTab is 'all' or 'map') */}
          {(activeTab === "all" || activeTab === "map") && (
            <div className="mb-10 bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-elevated">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    แผนที่ท่องเที่ยวสมุทรสงคราม (Interactive Map)
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    คลิกเลือกสถานที่ด้านล่างเพื่อซูมดูแผนที่พิกัดจริง
                  </p>
                </div>
                {selectedPlace && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPlace(null)}
                    className="text-xs"
                  >
                    รีเซ็ตมุมมองภาพรวม
                  </Button>
                )}
              </div>

              {/* Interactive Google Maps Embed */}
              <div className="relative w-full h-[400px] md:h-[480px] rounded-xl overflow-hidden border border-border bg-muted">
                <iframe
                  title="Samut Songkhram Tourist Map"
                  src={`https://maps.google.com/maps?q=${mapCenterLat},${mapCenterLng}&hl=th&z=${mapZoom}&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />

                {/* Floating selected place card */}
                {selectedPlace && (
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-card/95 backdrop-blur-md p-4 rounded-xl border border-border shadow-elevated z-10 animate-fade-in flex gap-3 items-center">
                    <img
                      src={selectedPlace.image}
                      alt={selectedPlace.nameTh}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-semibold text-sm truncate">{selectedPlace.nameTh}</span>
                        <div className="flex items-center text-xs text-golden">
                          <Star className="w-3.5 h-3.5 fill-golden text-golden" />
                          <span>{selectedPlace.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{selectedPlace.addressTh}</p>
                      <div className="mt-2 flex gap-2">
                        <Link to={`/places/${selectedPlace.id}`}>
                          <Button size="sm" className="h-7 text-xs px-2.5">
                            ดูรายละเอียด
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs px-2.5"
                          onClick={() => window.open(selectedPlace.googleMapsUrl, "_blank")}
                        >
                          เปิดใน Google Maps
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Place selector pills on map */}
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {filteredPlaces.map((place) => {
                  const isSelected = selectedPlace?.id === place.id;
                  return (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => setSelectedPlace(isSelected ? null : place)}
                      className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-muted/50 hover:bg-muted text-foreground border-border"
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                      <span>{place.nameTh}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Place Cards Grid (Shown when activeTab is 'all' or 'grid') */}
          {(activeTab === "all" || activeTab === "grid") && (
            <>
              {filteredPlaces.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-muted-foreground font-medium">
                      พบ {filteredPlaces.length} สถานที่ (Found {filteredPlaces.length} places)
                    </p>
                  </div>
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
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Places;
