import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Star,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { getPlaceById } from "@/data/places";

const FIELD_LABELS: Record<string, string> = {
  id: "รหัสสถานที่ (ID)",
  location: "พื้นที่ (Location)",
  district: "อำเภอ (District)",
  category: "หมวดหมู่ (Category)",
  googleMapsUrl: "Google Maps URL",
  latitude: "ละติจูด (Latitude)",
  longitude: "ลองจิจูด (Longitude)",
};

const PlaceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const place = id ? getPlaceById(id) : undefined;

  const showDemoNotice = () => {
    toast({
      title: "โหมดสาธิต",
      description: "ปุ่มเปิด Google Maps แสดงไว้สำหรับการนำเสนอเท่านั้น",
    });
  };

  if (!place) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 container mx-auto px-4 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            ไม่พบสถานที่
          </h1>
          <Link to="/places">
            <Button>Back to Places</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="relative h-[40vh] min-h-[320px]">
        <img
          src={place.image}
          alt={place.nameTh}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 bg-card/80 backdrop-blur-sm hover:bg-card"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="absolute top-20 right-4 flex items-center gap-2">
          <Badge className="bg-golden text-primary">Demo</Badge>
          <div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-soft">
            <Star className="w-4 h-4 fill-golden text-golden" />
            <span className="font-medium text-foreground">{place.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 -mt-16 relative z-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-8">
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {place.nameTh}
                  </h1>
                  <p className="text-muted-foreground text-lg">{place.name}</p>
                </div>
                <Badge className="bg-accent text-accent-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  เปิด
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {place.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-border text-muted-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  ที่อยู่ (Address)
                </h3>
                <p className="text-muted-foreground text-sm">{place.addressTh}</p>
                <p className="text-muted-foreground text-sm">{place.address}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  เวลาเปิด-ปิด (Hours)
                </h3>
                <p className="text-muted-foreground">
                  {place.openTime} - {place.closeTime}
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full md:w-auto mb-6" onClick={showDemoNotice}>
              <MapPin className="w-4 h-4" />
              Open in Google Maps
              <ExternalLink className="w-4 h-4" />
            </Button>

            <div className="border-t border-border pt-6">
              <h3 className="font-medium text-foreground mb-3">รายละเอียด (Description)</h3>
              <div
                className={`text-muted-foreground leading-relaxed ${
                  !isDescriptionExpanded ? "line-clamp-3" : ""
                }`}
              >
                <p className="mb-3">{place.descriptionTh}</p>
                <p>{place.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDescriptionExpanded((value) => !value)}
                className="mt-2 text-primary"
              >
                {isDescriptionExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" /> Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" /> Read More
                  </>
                )}
              </Button>
            </div>

            <div className="border-t border-border pt-6 mt-6">
              <h3 className="font-medium text-foreground mb-3">
                ข้อมูลทั้งหมด (Full Place Data)
              </h3>
              <div className="divide-y divide-border rounded-lg border border-border">
                {Object.entries(place)
                  .filter(([key]) =>
                    ["id", "location", "district", "category", "latitude", "longitude"].includes(key)
                  )
                  .map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 gap-4 p-3 text-sm">
                      <div className="font-medium text-foreground break-words">
                        {FIELD_LABELS[key] || key}
                      </div>
                      <div className="col-span-2 text-muted-foreground break-words">
                        {String(value)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-elevated p-4 md:p-6 h-fit">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-foreground">แผนที่ (Map)</h3>
              <Badge variant="outline">Preview only</Badge>
            </div>
            <div className="demo-map h-[500px] w-full overflow-hidden rounded-xl border border-border relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50" />
              <div className="absolute inset-0 opacity-60 demo-map-grid" />
              <div className="absolute left-[18%] top-0 h-full w-8 rotate-12 bg-white/80 shadow-sm" />
              <div className="absolute left-0 top-[62%] h-10 w-full -rotate-6 bg-white/80 shadow-sm" />
              <div className="absolute right-[12%] top-0 h-full w-20 bg-sky-300/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <span className="absolute -inset-5 rounded-full bg-primary/20 animate-ping" />
                  <div className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center border-4 border-white">
                    <MapPin className="w-7 h-7" />
                  </div>
                </div>
              </div>
              <div className="absolute left-4 bottom-4 right-4 rounded-xl bg-card/90 backdrop-blur p-3 shadow-soft">
                <p className="font-medium">{place.nameTh}</p>
                <p className="text-xs text-muted-foreground">
                  {place.latitude}, {place.longitude} · แผนที่ตัวอย่าง
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-river rounded-2xl p-6 shadow-elevated">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-primary-foreground mb-1">
                ถาม AI เกี่ยวกับสถานที่นี้
              </h3>
              <p className="text-primary-foreground/80 text-sm">
                ดูตัวอย่างหน้าสนทนาและองค์ประกอบของผู้ช่วย AI
              </p>
            </div>
            <Link to={`/chat?place=${place.id}`}>
              <Button
                variant="heroOutline"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Ask AI Guide
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceDetail;
