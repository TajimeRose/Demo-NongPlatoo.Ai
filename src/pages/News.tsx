import { Calendar, Clock, Droplets, Eye, Sun, ThermometerSun, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import newsImage from "@/assets/news-maeklong.png";
import marketImage from "@/assets/category-market.jpg";
import templeImage from "@/assets/category-temple.jpg";
import homestayImage from "@/assets/category-homestay.jpg";

const demoNews = [
  {
    id: 1,
    title: "เที่ยวตลาดร่มหุบ สัมผัสเสน่ห์เมืองแม่กลอง",
    summary: "รวมจุดเช็กอินและช่วงเวลาชมขบวนรถไฟผ่านตลาดสำหรับนักท่องเที่ยว",
    category: "การท่องเที่ยว",
    image: newsImage,
    date: "11 มิ.ย. 2569",
    views: 1248,
  },
  {
    id: 2,
    title: "สุดสัปดาห์นี้ ชวนเดินตลาดน้ำอัมพวา",
    summary: "แนะนำเมนูท้องถิ่น ของฝาก และกิจกรรมล่องเรือชมวิถีชีวิตริมคลอง",
    category: "กิจกรรม",
    image: marketImage,
    date: "10 มิ.ย. 2569",
    views: 986,
  },
  {
    id: 3,
    title: "ไหว้พระวัดดัง เรียนรู้ประวัติศาสตร์สมุทรสงคราม",
    summary: "เส้นทางเที่ยววัดและแหล่งวัฒนธรรมที่เดินทางต่อกันได้ภายในหนึ่งวัน",
    category: "ข่าวท้องถิ่น",
    image: templeImage,
    date: "9 มิ.ย. 2569",
    views: 742,
  },
  {
    id: 4,
    title: "พักผ่อนริมน้ำกับโฮมสเตย์ชุมชน",
    summary: "ตัวอย่างที่พักบรรยากาศสงบ พร้อมกิจกรรมเรียนรู้วิถีสวนมะพร้าว",
    category: "การท่องเที่ยว",
    image: homestayImage,
    date: "8 มิ.ย. 2569",
    views: 615,
  },
];

const categoryColors: Record<string, string> = {
  กิจกรรม: "bg-purple-100 text-purple-800",
  ข่าวท้องถิ่น: "bg-blue-100 text-blue-800",
  การท่องเที่ยว: "bg-green-100 text-green-800",
};

const News = () => {
  const { toast } = useToast();

  const showDemoNotice = () => {
    toast({
      title: "ข่าวตัวอย่าง",
      description: "หน้ารายละเอียดข่าวยังไม่ได้เชื่อมต่อในโปรเจกต์สาธิต",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ข่าวสารและสภาพอากาศ
            </h1>
            <Badge className="bg-golden text-primary">Demo Data</Badge>
          </div>
          <p className="text-muted-foreground">
            ตัวอย่างข่าวสารท้องถิ่นและข้อมูลสภาพอากาศ จังหวัดสมุทรสงคราม
          </p>
        </div>

        <Card className="mb-8 p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">สมุทรสงคราม</h2>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              ข้อมูลตัวอย่าง
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            <Card className="rounded-lg border border-border/60 p-3 bg-muted/30">
              <div className="flex flex-col items-center justify-center">
                <Sun className="h-6 w-6 text-yellow-500" />
                <div className="text-2xl font-bold">32°C</div>
                <div className="text-xs text-muted-foreground">มีเมฆบางส่วน</div>
              </div>
            </Card>
            <Card className="rounded-lg border border-border/60 p-3 bg-muted/30">
              <div className="flex flex-col items-center justify-center">
                <ThermometerSun className="h-6 w-6 text-red-500" />
                <div className="text-xl font-bold">34° / 26°</div>
                <div className="text-xs text-muted-foreground">สูงสุด / ต่ำสุด</div>
              </div>
            </Card>
            <Card className="rounded-lg border border-border/60 p-3 bg-muted/30">
              <div className="flex flex-col items-center justify-center">
                <Droplets className="h-6 w-6 text-blue-500" />
                <div className="text-2xl font-bold">72%</div>
                <div className="text-xs text-muted-foreground">ความชื้น</div>
              </div>
            </Card>
            <Card className="rounded-lg border border-border/60 p-3 bg-muted/30">
              <div className="flex flex-col items-center justify-center">
                <Wind className="h-6 w-6 text-gray-500" />
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground">km/h ความเร็วลม</div>
              </div>
            </Card>
            <Card className="rounded-lg border border-border/60 p-3 bg-muted/30 col-span-2 sm:col-span-1">
              <div className="flex flex-col justify-center h-full">
                <div className="text-xs font-medium mb-1 text-center">อุณหภูมิ 24 ชม.</div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>26°</span>
                  <span>34°</span>
                </div>
                <div className="h-3 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500 rounded-full" />
              </div>
            </Card>
          </div>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-6">ข่าวสารล่าสุด</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoNews.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-3 left-3 ${categoryColors[news.category]}`}>
                    {news.category}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {news.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {news.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {news.views.toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <Button variant="ghost" size="sm" className="w-full" onClick={showDemoNotice}>
                      อ่านเพิ่มเติม
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
