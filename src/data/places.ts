import amphawaImage from "@/assets/places/amphawa-market.jpg";
import watBangKungImage from "@/assets/places/wat-bang-kung.jpg";
import maeklongImage from "@/assets/places/maeklong-market.jpg";
import baanRakImage from "@/assets/places/baan-rak-amphawa.jpg";
import cafeKantaryImage from "@/assets/places/cafe-kantary.jpg";
import donHoiLotImage from "@/assets/places/don-hoi-lot.jpg";
import watChulamaneeImage from "@/assets/places/wat-chulamanee.jpg";
import thaKhaImage from "@/assets/places/tha-kha-market.jpg";
import kingRama2Image from "@/assets/places/king-rama2-park.jpg";

export interface Place {
  id: string;
  name: string;
  nameTh: string;
  description: string;
  descriptionTh: string;
  location: string;
  district: "amphawa" | "mueang" | "bang-khonthi";
  category: "market" | "temple" | "cafe" | "homestay" | "photo-spot";
  image: string;
  rating: number;
  tags: string[];
  openTime: string;
  closeTime: string;
  isOpen: boolean;
  googleMapsUrl: string;
  address: string;
  addressTh: string;
  latitude: number;
  longitude: number;
}

export const places: Place[] = [
  {
    id: "1",
    name: "Amphawa Floating Market",
    nameTh: "ตลาดน้ำอัมพวา",
    description: "The famous floating market where you can enjoy fresh seafood and local snacks from boats along the canal. Best visited in the evening for the magical firefly boat tours.",
    descriptionTh: "ตลาดน้ำอัมพวาเป็นสถานที่ท่องเที่ยวที่มีชื่อเสียง มีอาหารทะเลสดใหม่จากท้องถิ่นและบรรยากาศอบอุ่นของการค้าขายบนเรือไม้ริมคลองอัมพวา.",
    location: "Amphawa, Samut Songkhram",
    district: "amphawa",
    category: "market",
    image: amphawaImage,
    rating: 4.7,
    tags: ["ตลาดน้ำ", "ของกิน", "ล่องเรือหิ่งห้อย"],
    openTime: "09:00",
    closeTime: "21:00",
    isOpen: true,
    googleMapsUrl: "https://maps.google.com/?q=Amphawa+Floating+Market",
    address: "Amphawa Sub-district, Amphawa District, Samut Songkhram 75110",
    addressTh: "ตำบลอัมพวา อำเภออัมพวา สมุทรสงคราม 75110",
    latitude: 13.4251,
    longitude: 99.9551,
  },
  {
    id: "2",
    name: "Wat Bang Kung",
    nameTh: "วัดบางกุ้ง",
    description: "An ancient temple enshrined within the roots of a massive banyan tree. Also known as the Church in the Tree (Bot Prok Pho), it's a mystical and serene place.",
    descriptionTh: "วัดบางกุ้งเป็นวัดเก่าแก่ที่มีโบสถ์ปรกโพธิ์อันซีนไทยแลนด์ ตัวโบสถ์ถูกโอบล้อมด้วยรากต้นโพธิ์และต้นไทร ประดิษฐานหลวงพ่อนิลมณี.",
    location: "Bang Khonthi, Samut Songkhram",
    district: "bang-khonthi",
    category: "temple",
    image: watBangKungImage,
    rating: 4.8,
    tags: ["วัด", "ประวัติศาสตร์", "อันซีน"],
    openTime: "08:00",
    closeTime: "17:30",
    isOpen: true,
    googleMapsUrl: "https://maps.google.com/?q=Wat+Bang+Kung",
    address: "Bang Kung Sub-district, Bang Khonthi District, Samut Songkhram 75120",
    addressTh: "ตำบลบางกุ้ง อำเภอบางคนที สมุทรสงคราม 75120",
    latitude: 13.4098,
    longitude: 99.9402,
  },
  {
    id: "3",
    name: "Maeklong Railway Market",
    nameTh: "ตลาดร่มหุบ",
    description: "Witness the incredible sight of vendors quickly clearing their stalls as the train passes through this unique market built on the railway tracks.",
    descriptionTh: "ตลาดร่มหุบ (ตลาดสถานีรถไฟแม่กลอง) สัมผัสความตื่นเต้นเมื่อพ่อค้าแม่ค้าหุบร่มและเก็บแผงอย่างรวดเร็วขณะที่ขบวนรถไฟแล่นผ่านผ่ากลางตลาด.",
    location: "Mueang, Samut Songkhram",
    district: "mueang",
    category: "market",
    image: maeklongImage,
    rating: 4.6,
    tags: ["ตลาด", "รถไฟ", "ไฮไลท์"],
    openTime: "06:00",
    closeTime: "17:30",
    isOpen: true,
    googleMapsUrl: "https://maps.google.com/?q=Maeklong+Railway+Market",
    address: "Mae Klong Sub-district, Mueang District, Samut Songkhram 75000",
    addressTh: "ตำบลแม่กลอง อำเภอเมือง สมุทรสงคราม 75000",
    latitude: 13.4074,
    longitude: 99.9986,
  },
  {
    id: "4",
    name: "Baan Rak Amphawa",
    nameTh: "บ้านรักอัมพวา",
    description: "A charming riverside homestay offering authentic Thai hospitality. Wake up to the gentle sounds of the river and enjoy homemade breakfast.",
    descriptionTh: "โฮมสเตย์เรือนไม้ริมคลองอัมพวา บรรยากาศอบอุ่น ตักบาตรพระทางเรือยามเช้าและพักผ่อนริมสายน้ำอย่างสงบ.",
    location: "Amphawa, Samut Songkhram",
    district: "amphawa",
    category: "homestay",
    image: baanRakImage,
    rating: 4.9,
    tags: ["โฮมสเตย์", "ริมน้ำ", "พักผ่อน"],
    openTime: "00:00",
    closeTime: "23:59",
    isOpen: true,
    googleMapsUrl: "https://maps.google.com/?q=Baan+Rak+Amphawa",
    address: "Amphawa Sub-district, Amphawa District, Samut Songkhram 75110",
    addressTh: "ตำบลอัมพวา อำเภออัมพวา สมุทรสงคราม 75110",
    latitude: 13.4243,
    longitude: 99.9564,
  },
  {
    id: "5",
    name: "Café Kantary",
    nameTh: "คาเฟ่ แคนทารี",
    description: "A beautiful riverside café with stunning views of the Mae Klong river. Perfect for enjoying coffee while watching traditional boats pass by.",
    descriptionTh: "คาเฟ่บรรยากาศสบายๆ พร้อมเมนูกาแฟ เครื่องดื่ม และเบเกอรี่โฮมเมดคุณภาพ เหมาะสำหรับนั่งชิลล์.",
    location: "Amphawa, Samut Songkhram",
    district: "amphawa",
    category: "cafe",
    image: cafeKantaryImage,
    rating: 4.5,
    tags: ["คาเฟ่", "ริมน้ำ", "กาแฟ"],
    openTime: "08:00",
    closeTime: "20:00",
    isOpen: true,
    googleMapsUrl: "https://maps.google.com/?q=Cafe+Kantary+Amphawa",
    address: "Amphawa Sub-district, Amphawa District, Samut Songkhram 75110",
    addressTh: "ตำบลอัมพวา อำเภออัมพวา สมุทรสงคราม 75110",
    latitude: 13.426,
    longitude: 99.954,
  },
  {
    id: "6",
    name: "Don Hoi Lot",
    nameTh: "ดอนหอยหลอด",
    description: "A unique sandbar formation home to the razor clam. Visit during low tide to walk on the exposed sandbar and see these fascinating creatures.",
    descriptionTh: "ดอนหอยหลอด สันดอนปากแม่น้ำแม่กลอง แหล่งเกิดหอยหลอดตามธรรมชาติ ทานอาหารทะเลสดและชมวิวทะเลอ่าวไทย.",
    location: "Bang Chakreng, Samut Songkhram",
    district: "mueang",
    category: "photo-spot",
    image: donHoiLotImage,
    rating: 4.3,
    tags: ["ธรรมชาติ", "ถ่ายรูป", "อาหารทะเล"],
    openTime: "06:00",
    closeTime: "18:00",
    isOpen: true,
    googleMapsUrl: "https://maps.google.com/?q=Don+Hoi+Lot",
    address: "Bang Chakreng Sub-district, Mueang District, Samut Songkhram 75000",
    addressTh: "ตำบลบางจะเกร็ง อำเภอเมือง สมุทรสงคราม 75000",
    latitude: 13.3592,
    longitude: 100.0381,
  },
  {
    id: "7",
    name: "Wat Chulamanee",
    nameTh: "วัดจุฬามณี",
    description: "Famous temple known for the revered Thao Wessuwan shrine and the preserved body of Luang Por Nueang.",
    descriptionTh: "วัดจุฬามณี วัดดังระดับประเทศที่ผู้คนนิยมมากราบไหว้ขอพรท้าวเวสสุวรรณโณเพื่อเสริมโชคลาภและความเป็นสิริมงคล.",
    location: "Amphawa, Samut Songkhram",
    district: "amphawa",
    category: "temple",
    image: watChulamaneeImage,
    rating: 4.9,
    tags: ["วัด", "ท้าวเวสสุวรรณ", "สายมู"],
    openTime: "06:00",
    closeTime: "24:00",
    isOpen: true,
    googleMapsUrl: "https://maps.google.com/?q=Wat+Chulamanee",
    address: "Bang Chang Sub-district, Amphawa District, Samut Songkhram 75110",
    addressTh: "ตำบลบางช้าง อำเภออัมพวา สมุทรสงคราม 75110",
    latitude: 13.4194,
    longitude: 99.9542,
  },
  {
    id: "8",
    name: "Tha Kha Floating Market",
    nameTh: "ตลาดน้ำท่าคา",
    description: "An authentic, peaceful weekend floating market in the midst of coconut plantations, preserving the genuine traditional riverside lifestyle.",
    descriptionTh: "ตลาดน้ำท่าคา ตลาดน้ำวิถีชาวบ้านดั้งเดิมกลางสวนมะพร้าว พายเรือขายผลไม้ ขนมไทย และน้ำตาลมะพร้าวแท้.",
    location: "Amphawa, Samut Songkhram",
    district: "amphawa",
    category: "market",
    image: thaKhaImage,
    rating: 4.8,
    tags: ["ตลาดน้ำ", "วิถีชุมชน", "สวนมะพร้าว"],
    openTime: "06:00",
    closeTime: "15:00",
    isOpen: true,
    googleMapsUrl: "https://maps.google.com/?q=Tha+Kha+Floating+Market",
    address: "Tha Kha Sub-district, Amphawa District, Samut Songkhram 75110",
    addressTh: "ตำบลท่าคา อำเภออัมพวา สมุทรสงคราม 75110",
    latitude: 13.4712,
    longitude: 99.9953,
  },
  {
    id: "9",
    name: "King Rama II Memorial Park",
    nameTh: "อุทยาน ร.2",
    description: "A cultural park dedicated to King Rama II, showcasing traditional Thai teak houses, museums, and a botanical garden of historic Thai plants.",
    descriptionTh: "อุทยานพระบรมราชานุสรณ์ พระบาทสมเด็จพระพุทธเลิศหล้านภาลัย (อุทยาน ร.2) ชมเรือนไทยโบราณ พิพิธภัณฑ์มรดกวัฒนธรรม และสวนพรรณไม้.",
    location: "Amphawa, Samut Songkhram",
    district: "amphawa",
    category: "photo-spot",
    image: kingRama2Image,
    rating: 4.7,
    tags: ["เรือนไทย", "ประวัติศาสตร์", "วัฒนธรรม"],
    openTime: "08:30",
    closeTime: "17:00",
    isOpen: true,
    googleMapsUrl: "https://maps.google.com/?q=King+Rama+II+Memorial+Park",
    address: "Amphawa Sub-district, Amphawa District, Samut Songkhram 75110",
    addressTh: "ตำบลอัมพวา อำเภออัมพวา สมุทรสงคราม 75110",
    latitude: 13.4244,
    longitude: 99.9535,
  },
];

export const getPlaceById = (id: string): Place | undefined => {
  return places.find((place) => place.id === id);
};

export const filterPlaces = (
  district?: string,
  category?: string,
  search?: string
): Place[] => {
  return places.filter((place) => {
    if (district && place.district !== district) return false;
    if (category && place.category !== category) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        place.name.toLowerCase().includes(searchLower) ||
        place.nameTh.includes(search) ||
        place.tags.some((tag) => tag.includes(search))
      );
    }
    return true;
  });
};
