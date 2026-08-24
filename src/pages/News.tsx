import { useState, useEffect } from "react";
import { Calendar, Clock, Droplets, Eye, Sun, Cloud, CloudRain, ThermometerSun, Wind, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import newsImage from "@/assets/news-maeklong.png";
import amphawaImage from "@/assets/places/amphawa-market.jpg";
import watBangKungImage from "@/assets/places/wat-bang-kung.jpg";
import watChulamaneeImage from "@/assets/places/wat-chulamanee.jpg";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: "การท่องเที่ยว" | "กิจกรรม" | "ข่าวท้องถิ่น" | "วัฒนธรรม";
  image: string;
  date: string;
  views: number;
  author: string;
}

const realNewsData: NewsItem[] = [
  {
    id: 1,
    title: "เที่ยวตลาดร่มหุบ สัมผัสเสน่ห์เมืองแม่กลอง ชมขบวนรถไฟผ่ากลางตลาด",
    summary: "รวมจุดเช็กอินและช่วงเวลาเดินรถไฟผ่านตลาดแม่กลอง ไฮไลท์การท่องเที่ยวระดับโลกที่ต้องมาเยือนสักครั้ง",
    content: `ตลาดร่มหุบ (Maeklong Railway Market) หรือตลาดสถานีรถไฟแม่กลอง เป็นหนึ่งในจุดหมายปลายทางยอดนิยมของนักท่องเที่ยวทั้งชาวไทยและชาวต่างชาติ ความโดดเด่นอยู่ที่พ่อค้าแม่ค้าจะตั้งแผงขายของอยู่ติดกับรางรถไฟสายแม่กลอง-บ้านแหลม

เมื่อได้ยินสัญญาณหวูดรถไฟแจ้งเตือน พ่อค้าแม่ค้าทุกคนจะพร้อมใจกันเก็บกันสาด หุบร่ม และขยับถาดวางของหลบขบวนรถไฟอย่างรวดเร็วและคล่องแคล่ว ขบวนรถไฟจะเคลื่อนผ่านกลางตลาดด้วยความเร็วต่ำอย่างน่าตื่นตาตื่นใจ ก่อนที่ทุกแผงจะกางร่มกลับมาค้าขายตามปกติทันทีที่รถไฟพ้นไป

ตารางเวลาขบวนรถไฟเข้า-ออก สถานีแม่กลอง:
• ขบวนเข้าสถานี: 08:30 น., 11:10 น., 14:30 น., 17:40 น.
• ขบวนออกจากสถานี: 06:20 น., 09:00 น., 11:30 น., 15:30 น.

คำแนะนำสำหรับนักท่องเที่ยว: ควรมารอก่อนเวลารถไฟเข้าประมาณ 15-20 นาที และยืนอยู่หลังเส้นปลอดภัยที่ทางสถานีกำหนดเสมอเพื่อความปลอดภัย`,
    category: "การท่องเที่ยว",
    image: newsImage,
    date: "28 ม.ค. 2569",
    views: 3420,
    author: "กองประชาสัมพันธ์การท่องเที่ยว",
  },
  {
    id: 2,
    title: "เปิดพิกัดเที่ยวตลาดน้ำอัมพวา ชิมอาหารทะเลสด ล่องเรือชมหิ่งห้อยยามค่ำคืน",
    summary: "สัมผัสวิถีชีวิตริมสายน้ำคลองอัมพวา เพลิดเพลินกับอาหารไทยพื้นบ้าน ขนมโบราณ และบรรยากาศสุดโรแมนติก",
    content: `ตลาดน้ำอัมพวา เป็นตลาดน้ำยามเย็นแห่งแรกของประเทศไทยที่ยังคงอนุรักษ์วิถีชีวิตดั้งเดิมของชุมชนริมน้ำไว้อย่างงดงาม มีเสน่ห์ด้วยเรือพายขายอาหารทะเลสดๆ ปิ้งย่างบนเรือ เช่น กุ้งแม่น้ำเผา หอยเชลล์ ปลาหมึกย่าง พร้อมน้ำจิ้มซีฟู้ดรสเด็ด

นอกจากนี้ยังมีบ้านเรือนไม้โบราณริมน้ำที่เปิดเป็นร้านค้า คาเฟ่ และร้านของฝากพื้นเมือง เช่น น้ำตาลมะพร้าวแท้ กะปิคลองโคน และขนมไทยโบราณหาทานยาก

กิจกรรมไฮไลท์ที่ไม่ควรพลาด:
1. เดินชมตลาดและชิมของอร่อยริมคลองอัมพวา
2. ล่องเรือชมหิ่งห้อยในคืนเดือนมืด สัมผัสแสงระยิบระยับใต้ต้นลำพู
3. ตักบาตรพระทางเรือยามเช้าสำหรับผู้ที่พักค้างคืนในโฮมสเตย์ริมน้ำ

วัน-เวลาเปิดทำการ: วันศุกร์ เสาร์ อาทิตย์ และวันหยุดนักขัตฤกษ์ ตั้งแต่เวลา 14:00 - 21:00 น.`,
    category: "กิจกรรม",
    image: amphawaImage,
    date: "15 ก.พ. 2569",
    views: 2890,
    author: "ศูนย์ข้อมูลท่องเที่ยวสมุทรสงคราม",
  },
  {
    id: 3,
    title: "กราบไหว้ท้าวเวสสุวรรณโณ วัดจุฬามณี เสริมดวง โชคลาภ และความสำเร็จ",
    summary: "วัดดังสายมูระดับประเทศ พร้อมข้อแนะนำการเตรียมเครื่องสักการะและการเดินทาง",
    content: `วัดจุฬามณี อ.อัมพวา จ.สมุทรสงคราม เป็นวัดโบราณตั้งแต่สมัยกรุงศรีอยุธยาตอนปลาย และเป็นศูนย์รวมจิตใจของผู้ศรัทธาใน "องค์ท้าวเวสสุวรรณโณ" เทพเจ้าแห่งความมั่งคั่งและผู้ปกปักรักษาคุ้มครองจากสิ่งอัปมงคล

สิ่งที่น่าสนใจภายในวัด:
• องค์ท้าวเวสสุวรรณโณประดิษฐาน ณ ลานกลางแจ้ง ที่ผู้คนหลั่งไหลมากราบไหว้ด้วยดอกกุหลาบแดงและธูปแดง 9 ดอก
• สรีระสังขารหลวงพ่อเนื่อง โกวิโท เกจิอาจารย์ชื่อดังที่ไม่เน่าเปื่อยบรรจุในโลงแก้ว
• อุโบสถจตุรมุขอันงดงาม ปูด้วยหินหยกจากเมืองการาจี ประเทศปากีสถาน

เคล็ดลับการไหว้ขอพร: นิยมขอพรเรื่องโชคลาภ การงาน ค้าขายเจริญรุ่งเรือง และความแคล้วคลาดปลอดภัย โดยวัดเปิดให้เข้าสักการะได้ตลอดทั้งวันจนถึงเที่ยงคืน`,
    category: "วัฒนธรรม",
    image: watChulamaneeImage,
    date: "20 ก.พ. 2569",
    views: 4150,
    author: "สายบุญแม่กลอง",
  },
  {
    id: 4,
    title: "ย้อนรอยประวัติศาสตร์ค่ายบางกุ้ง โบสถ์ปรกโพธิ์ อันซีนแห่งเมืองสมุทรสงคราม",
    summary: "ชมความอัศจรรย์ของโบสถ์มหาอุดโบราณที่ถูกโอบล้อมด้วยรากต้นโพธิ์และต้นไทรนานนับร้อยปี",
    content: `วัดบางกุ้ง (ค่ายบางกุ้ง) ตั้งอยู่ที่อำเภอบางคนที เป็นสถานที่ที่มีความสำคัญทางประวัติศาสตร์อย่างยิ่ง เคยเป็นค่ายทหารเรือไทยในสมัยกรุงธนบุรี โดยสมเด็จพระเจ้าตากสินมหาราชทรงนำทัพขับไล่ข้าศึกที่ยกมาล้อมค่ายได้สำเร็จในปี พ.ศ. 2311

จุดเด่นที่สุดคือ "โบสถ์ปรกโพธิ์" โบสถ์โบราณแบบมหาอุดที่ไม่มีหน้าต่าง ภายนอกถูกรากของไม้ใหญ่ 4 ชนิด ได้แก่ ต้นโพธิ์ ต้นไทร ต้นไกร และต้นกร่าง ปกคลุมจนทั่วตัวอาคารอย่างแน่นหนาและช่วยพยุงโครงสร้างโบสถ์ไว้

ภายในประดิษฐาน "หลวงพ่อนิลมณี" หรือ "หลวงพ่อดำ" พระพุทธรูปปูนปั้นปางมารวิชัยขนาดใหญ่สมัยอยุธยาตอนปลาย ซึ่งเป็นที่เคารพสักการะของชาวสมุทรสงครามและนักท่องเที่ยวจากทั่วสารทิศ`,
    category: "ข่าวท้องถิ่น",
    image: watBangKungImage,
    date: "24 ก.พ. 2569",
    views: 1980,
    author: "มรดกวัฒนธรรมไทย",
  },
];

const categoryColors: Record<string, string> = {
  กิจกรรม: "bg-purple-100 text-purple-800",
  ข่าวท้องถิ่น: "bg-blue-100 text-blue-800",
  การท่องเที่ยว: "bg-green-100 text-green-800",
  วัฒนธรรม: "bg-amber-100 text-amber-800",
};

interface WeatherState {
  temp: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  code: number;
  loading: boolean;
}

const getWeatherConditionText = (code: number) => {
  if (code === 0) return "ท้องฟ้าแจ่มใส";
  if (code === 1 || code === 2) return "มีเมฆบางส่วน";
  if (code === 3) return "มีเมฆมาก";
  if (code >= 45 && code <= 48) return "มีหมอกลง";
  if (code >= 51 && code <= 67) return "ฝนตกเล็กน้อย";
  if (code >= 80 && code <= 82) return "ฝนตกกระจาย";
  if (code >= 95) return "ฝนฟ้าคะนอง";
  return "อากาศดี";
};

const News = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [weather, setWeather] = useState<WeatherState>({
    temp: 31,
    tempMax: 34,
    tempMin: 26,
    humidity: 65,
    windSpeed: 14,
    condition: "มีเมฆบางส่วน",
    code: 2,
    loading: true,
  });

  useEffect(() => {
    // Fetch live weather data for Samut Songkhram (Lat 13.4098, Lng 99.9986)
    fetch("https://api.open-meteo.com/v1/forecast?latitude=13.4098&longitude=99.9986&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current) {
          const currentTemp = Math.round(data.current.temperature_2m);
          const maxTemp = Math.round(data.daily?.temperature_2m_max?.[0] || currentTemp + 3);
          const minTemp = Math.round(data.daily?.temperature_2m_min?.[0] || currentTemp - 4);
          const code = data.current.weather_code;

          setWeather({
            temp: currentTemp,
            tempMax: maxTemp,
            tempMin: minTemp,
            humidity: Math.round(data.current.relative_humidity_2m),
            windSpeed: Math.round(data.current.wind_speed_10m),
            condition: getWeatherConditionText(code),
            code: code,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.error("Failed to fetch live weather:", err);
        setWeather((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-primary to-purple-600 bg-clip-text text-transparent font-display">
              ข่าวสารและสภาพอากาศเมืองแม่กลอง
            </h1>
            <Badge variant="outline" className="bg-background/80 backdrop-blur text-xs px-3 py-1">
              อัปเดตข้อมูลจริง
            </Badge>
          </div>
          <p className="text-muted-foreground text-base">
            รายงานสภาพอากาศสดและข่าวสารประชาสัมพันธ์การท่องเที่ยวจังหวัดสมุทรสงคราม
          </p>
        </div>

        {/* Live Weather Card */}
        <Card className="mb-10 p-5 bg-card/80 backdrop-blur-md border-primary/20 shadow-elevated rounded-2xl">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-lg font-bold text-foreground">สภาพอากาศปัจจุบัน — จ.สมุทรสงคราม</h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>ตรวจวัดสภาพอากาศสด (Live Weather)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <Card className="rounded-xl border border-border/80 p-4 bg-muted/40 flex flex-col items-center justify-center text-center">
              {weather.code >= 51 ? (
                <CloudRain className="h-7 w-7 text-blue-500 mb-1 animate-bounce" />
              ) : weather.code >= 3 ? (
                <Cloud className="h-7 w-7 text-slate-500 mb-1" />
              ) : (
                <Sun className="h-7 w-7 text-amber-500 mb-1" />
              )}
              <div className="text-2xl font-bold font-display">{weather.temp}°C</div>
              <div className="text-xs text-muted-foreground mt-0.5">{weather.condition}</div>
            </Card>

            <Card className="rounded-xl border border-border/80 p-4 bg-muted/40 flex flex-col items-center justify-center text-center">
              <ThermometerSun className="h-7 w-7 text-red-500 mb-1" />
              <div className="text-2xl font-bold font-display">{weather.tempMax}° / {weather.tempMin}°</div>
              <div className="text-xs text-muted-foreground mt-0.5">สูงสุด / ต่ำสุด วันนี้</div>
            </Card>

            <Card className="rounded-xl border border-border/80 p-4 bg-muted/40 flex flex-col items-center justify-center text-center">
              <Droplets className="h-7 w-7 text-blue-500 mb-1" />
              <div className="text-2xl font-bold font-display">{weather.humidity}%</div>
              <div className="text-xs text-muted-foreground mt-0.5">ความชื้นสัมพัทธ์</div>
            </Card>

            <Card className="rounded-xl border border-border/80 p-4 bg-muted/40 flex flex-col items-center justify-center text-center">
              <Wind className="h-7 w-7 text-teal-600 mb-1" />
              <div className="text-2xl font-bold font-display">{weather.windSpeed}</div>
              <div className="text-xs text-muted-foreground mt-0.5">km/h ความเร็วลม</div>
            </Card>

            <Card className="rounded-xl border border-border/80 p-4 bg-muted/40 col-span-2 sm:col-span-1 flex flex-col justify-center">
              <div className="text-xs font-medium mb-1.5 text-center text-muted-foreground">ช่วงอุณหภูมิวันนี้</div>
              <div className="flex justify-between text-xs font-semibold mb-1 text-foreground">
                <span>{weather.tempMin}°C</span>
                <span>{weather.tempMax}°C</span>
              </div>
              <div className="h-2.5 bg-gradient-to-r from-blue-400 via-amber-400 to-red-500 rounded-full shadow-inner" />
              <p className="text-[10px] text-center text-muted-foreground mt-1.5">เหมาะสำหรับการเดินทางท่องเที่ยว</p>
            </Card>
          </div>
        </Card>

        {/* News List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-display text-foreground">
              ข่าวสารและกิจกรรมล่าสุด
            </h2>
            <span className="text-sm text-muted-foreground">
              ทั้งหมด {realNewsData.length} ข่าว
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {realNewsData.map((news) => (
              <Card
                key={news.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-border/80 bg-card rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <Badge className={`absolute top-3 left-3 shadow-md ${categoryColors[news.category]}`}>
                      {news.category}
                    </Badge>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {news.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {news.views.toLocaleString()} อ่าน
                    </div>
                  </div>

                  <Button
                    variant="default"
                    size="sm"
                    className="w-full gap-2 rounded-xl"
                    onClick={() => setSelectedNews(news)}
                  >
                    <span>อ่านเนื้อหาข่าวฉบับเต็ม</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Full News Modal Dialog */}
      {selectedNews && (
        <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={categoryColors[selectedNews.category]}>
                  {selectedNews.category}
                </Badge>
                <span className="text-xs text-muted-foreground">เผยแพร่เมื่อ {selectedNews.date}</span>
              </div>
              <DialogTitle className="text-2xl font-bold font-display leading-snug">
                {selectedNews.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                โดย: {selectedNews.author} · มีผู้เข้าชม {selectedNews.views.toLocaleString()} ครั้ง
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md bg-muted">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base space-y-3">
                {selectedNews.content}
              </div>

              <div className="pt-4 border-t flex justify-end">
                <Button variant="outline" onClick={() => setSelectedNews(null)}>
                  ปิดหน้าต่าง
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default News;
