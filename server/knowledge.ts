export interface KnowledgePlace {
  id: string;
  name: string;
  nameTh: string;
  descriptionTh: string;
  location: string;
  district: string;
  category: "attraction" | "restaurant" | "hotel" | "temple" | "market";
  categoryTh: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  openTime: string;
  closeTime: string;
  addressTh: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
  highlight: string;
  recommendReason: string;
  popularScore: number; // 1-100 score based on social media check-ins & tourist popularity
  tips?: string;
}

export const samutSongkhramKnowledge: KnowledgePlace[] = [
  // --- สถานที่ท่องเที่ยว & ตลาด (Attractions & Markets) ---
  {
    id: "att-1",
    name: "Amphawa Floating Market",
    nameTh: "ตลาดน้ำอัมพวา",
    descriptionTh: "ตลาดน้ำยามเย็นริมคลองอัมพวา บรรยากาศบ้านเรือนไม้ริมน้ำ มีอาหารทะเลสดเผา ก๋วยเตี๋ยวเรือ ขนมหวานไทยโบราณ สินค้าชุมชน และบริการล่องเรือชมหิ่งห้อย",
    location: "อำเภออัมพวา",
    district: "amphawa",
    category: "market",
    categoryTh: "ตลาดน้ำ / วิถีชีวิตริมคลอง",
    tags: ["ตลาดน้ำ", "อัมพวา", "อาหารทะเล", "หิ่งห้อย", "ช้อปปิ้ง", "ล่องเรือ"],
    rating: 4.8,
    reviewCount: 14200,
    popularScore: 98,
    openTime: "11:00",
    closeTime: "21:00 (เปิดทุกวันศุกร์ เสาร์ อาทิตย์ และวันหยุดนักขัตฤกษ์)",
    addressTh: "ตำบลอัมพวา อำเภออัมพวา จังหวัดสมุทรสงคราม 75110",
    latitude: 13.4251,
    longitude: 99.9551,
    googleMapsUrl: "https://maps.google.com/?q=Amphawa+Floating+Market",
    highlight: "ล่องเรือชมหิ่งห้อยยามค่ำคืน และลิ้มลองอาหารทะเลสดริมคลองอัมพวา",
    recommendReason: "ยอดนิยมอันดับ 1 ของสมุทรสงครามจากรีวิว Social Media และนักท่องเที่ยวทั่วโลก บรรยากาศชุมชนริมน้ำยามเย็นมีเสน่ห์ไม่เหมือนใคร",
    tips: "ช่วงเย็น 16.00-20.00 น. เป็นเวลาที่คึกคักและบรรยากาศดีที่สุด"
  },
  {
    id: "att-2",
    name: "Maeklong Railway Market",
    nameTh: "ตลาดร่มหุบ (ตลาดแม่กลอง)",
    descriptionTh: "ตลาดสดบนรางรถไฟสายแม่กลอง-บ้านแหลม เมื่อรถไฟแล่นผ่านพ่อค้าแม่ค้าจะหุบร่มและเก็บแผงขายของอย่างรวดเร็ว มีปลาทูแม่กลองสดๆ อาหารทะเล ผักผลไม้ และของสดนานาชนิด",
    location: "อำเภอเมืองสมุทรสงคราม",
    district: "mueang",
    category: "market",
    categoryTh: "ตลาดสด / Unseen Thailand",
    tags: ["ตลาดร่มหุบ", "รถไฟ", "ปลาทูแม่กลอง", "ของฝาก", "Unseen"],
    rating: 4.7,
    reviewCount: 11800,
    popularScore: 96,
    openTime: "06:00",
    closeTime: "18:00 (เปิดทุกวัน)",
    addressTh: "ตำบลแม่กลอง อำเภอเมืองสมุทรสงคราม จังหวัดสมุทรสงคราม 75000",
    latitude: 13.4074,
    longitude: 99.9986,
    googleMapsUrl: "https://maps.google.com/?q=Maeklong+Railway+Market",
    highlight: "ชมวินาทีรถไฟวิ่งผ่ากลางตลาดและการหุบร่มของพ่อค้าแม่ค้าอย่างรวดเร็ว",
    recommendReason: "แลนด์มาร์กระดับโลกที่ได้รับความนิยมสูงจากนักท่องเที่ยวทั้งไทยและต่างชาติ ภาพขบวนรถไฟผ่าตลาดถือเป็นไฮไลท์เอกลักษณ์เฉพาะตัว",
    tips: "รอบเวลารถไฟเข้า-ออกสถานีแม่กลอง: 06:20, 08:30, 09:00, 11:10, 11:30, 14:30, 15:30 และ 17:40 น."
  },
  {
    id: "att-3",
    name: "Wat Bang Kung",
    nameTh: "วัดบางกุ้ง (โบสถ์ปรกโพธิ์)",
    descriptionTh: "วัดเก่าแก่สมัยอยุธยา โบสถ์มหาอุตม์ถูกปกคลุมด้วยรากต้นไม้ใหญ่ 4 ชนิด (ต้นโพธิ์ ต้นไทร ต้นไกร ต้นกร่าง) ภายในประดิษฐาน 'หลวงพ่อนิลมณี' (หลวงพ่อดำ) ศักดิ์สิทธิ์มาก",
    location: "อำเภอบางคนที",
    district: "bang-khonthi",
    category: "temple",
    categoryTh: "วัด / โบราณสถาน / Unseen",
    tags: ["วัดบางกุ้ง", "โบสถ์ปรกโพธิ์", "หลวงพ่อนิลมณี", "ค่ายบางกุ้ง", "Unseen"],
    rating: 4.8,
    reviewCount: 9500,
    popularScore: 94,
    openTime: "08:00",
    closeTime: "18:00 (เปิดทุกวัน)",
    addressTh: "ตำบลบางกุ้ง อำเภอบางคนที จังหวัดสมุทรสงคราม 75120",
    latitude: 13.4098,
    longitude: 99.9402,
    googleMapsUrl: "https://maps.google.com/?q=Wat+Bang+Kung",
    highlight: "โบสถ์โบราณที่ถูกโอบอุ้มด้วยรากไม้ธรรมชาติ และกราบสักการะศาลสมเด็จพระเจ้าตากสินมหาราช",
    recommendReason: "ติดอันดับ Unseen Thailand ด้านความมหัศจรรย์ของธรรมชาติผสานประวัติศาสตร์และศรัทธา",
    tips: "ควรแต่งกายสุภาพในการเข้าโบสถ์"
  },
  {
    id: "att-4",
    name: "Wat Chulamanee",
    nameTh: "วัดจุฬามณี",
    descriptionTh: "ศูนย์รวมศรัทธาของท้าวเวสสุวรรณโณ สรีระสังขารหลวงพ่อเนื่อง และอุโบสถจตุรมุขปูหินอ่อนอันงดงามริมคลองอัมพวา ผู้คนนิยมมาไหว้ขอพรโชคลาภ ค้าขาย และปัดเป่าสิ่งอัปมงคล",
    location: "อำเภออัมพวา",
    district: "amphawa",
    category: "temple",
    categoryTh: "วัด / สิ่งศักดิ์สิทธิ์ / สายมู",
    tags: ["วัดจุฬามณี", "ท้าวเวสสุวรรณ", "หลวงพ่อเนื่อง", "สายมู", "ขอพรโชคลาภ"],
    rating: 4.8,
    reviewCount: 16500,
    popularScore: 97,
    openTime: "06:00",
    closeTime: "24:00 (เปิดทุกวัน)",
    addressTh: "ตำบลบางช้าง อำเภออัมพวา จังหวัดสมุทรสงคราม 75110",
    latitude: 13.4194,
    longitude: 99.9542,
    googleMapsUrl: "https://maps.google.com/?q=Wat+Chulamanee",
    highlight: "สักการะท้าวเวสสุวรรณโณเพื่อความเป็นสิริมงคลและความมั่งคั่ง",
    recommendReason: "พิกัดสายมูอันดับ 1 ของจังหวัด รีวิวแน่นบนโซเชียลเรื่องความศักดิ์สิทธิ์และบรรยากาศริมคลองยามค่ำคืน",
    tips: "นิยมนำดอกกุหลาบสีแดง ธูปแดง และน้ำแดงมากราบไหว้"
  },
  {
    id: "att-5",
    name: "Don Hoi Lot",
    nameTh: "ดอนหอยหลอด",
    descriptionTh: "สันทรายตะกอนปากแม่น้ำแม่กลอง ยื่นลงไปในอ่าวไทย เป็นแหล่งที่อยู่อาศัยของหอยหลอด มีทิวทัศน์ริมทะเล ร้านอาหารทะเลสด ร้านของฝากอาหารทะเลแห้ง และศาลกรมหลวงชุมพรเขตอุดมศักดิ์",
    location: "อำเภอเมืองสมุทรสงคราม",
    district: "mueang",
    category: "attraction",
    categoryTh: "ธรรมชาติ / ชายทะเล / แหล่งซีฟู้ด",
    tags: ["ดอนหอยหลอด", "หอยหลอด", "ชายทะเล", "ศาลกรมหลวงชุมพร", "ของฝาก"],
    rating: 4.5,
    reviewCount: 7800,
    popularScore: 89,
    openTime: "06:00",
    closeTime: "18:00 (เปิดทุกวัน)",
    addressTh: "ตำบลบางจะเกร็ง อำเภอเมืองสมุทรสงคราม จังหวัดสมุทรสงคราม 75000",
    latitude: 13.3611,
    longitude: 100.0361,
    googleMapsUrl: "https://maps.google.com/?q=Don+Hoi+Lot",
    highlight: "กิจกรรมหยอดปูนขาวจับหอยหลอดเวลาน้ำลง และรับประทานหอยหลอดผัดฉ่าริมทะเล",
    recommendReason: "แหล่งรับประทานอาหารทะเลสดขึ้นชื่อ และมีวิวทะเลอ่าวแม่กลองพร้อมกิจกรรมทางธรรมชาติเฉพาะถิ่น",
    tips: "สามารถตรวจสอบเวลาน้ำลงก่อนเดินทางหากต้องการลงไปเดินลานดอนหอยหลอด"
  },
  {
    id: "att-6",
    name: "Tha Kha Floating Market",
    nameTh: "ตลาดน้ำท่าคา",
    descriptionTh: "ตลาดน้ำโบราณที่มีบรรยากาศสงบและคงวิถีชีวิตชาวสวนมะพร้าวแท้ๆ พายเรือขายพืชผักสวนครัว น้ำตาลมะพร้าวแท้ ก๋วยเตี๋ยวชามกะลา และขนมไทยดั้งเดิม",
    location: "อำเภออัมพวา",
    district: "amphawa",
    category: "market",
    categoryTh: "ตลาดน้ำพื้นบ้าน / วิถีชุมชน",
    tags: ["ตลาดน้ำท่าคา", "วิถีชาวสวน", "น้ำตาลมะพร้าว", "เรือพาย", "ธรรมชาติ"],
    rating: 4.6,
    reviewCount: 4200,
    popularScore: 86,
    openTime: "06:00",
    closeTime: "14:00 (เปิดวันเสาร์-อาทิตย์)",
    addressTh: "ตำบลท่าคา อำเภออัมพวา จังหวัดสมุทรสงคราม 75110",
    latitude: 13.4712,
    longitude: 99.9953,
    googleMapsUrl: "https://maps.google.com/?q=Tha+Kha+Floating+Market",
    highlight: "สัมผัสวิถีไทยเดิม ชมการเคี่ยวน้ำตาลมะพร้าวสด และพายเรือลัดเลาะคลองธรรมชาติ",
    recommendReason: "นักท่องเที่ยวสาย Slow-life และรีวิวแนวธรรมชาติยกย่องให้เป็นตลาดน้ำที่คงความเรียบง่ายดั้งเดิมที่สุด",
    tips: "ควรมาช่วงเช้า 07:00-10:00 น. อากาศเย็นสบาย"
  },
  {
    id: "att-7",
    name: "King Rama II Memorial Park",
    nameTh: "อุทยาน ร.2",
    descriptionTh: "อุทยานเรือนไทยหมู่ 5 หลัง จัดแสดงโบราณวัตถุและวิถีชีวิตไทยในยุคต้นรัตนโกสินทร์ สวนพรรณไม้ในวรรณคดี และโรงละครกลางแจ้งริมแม่น้ำแม่กลอง",
    location: "อำเภออัมพวา",
    district: "amphawa",
    category: "attraction",
    categoryTh: "อุทยานประวัติศาสตร์ / วัฒนธรรม",
    tags: ["อุทยานร2", "เรือนไทย", "วรรณคดี", "ประวัติศาสตร์", "อัมพวา"],
    rating: 4.6,
    reviewCount: 3900,
    popularScore: 84,
    openTime: "08:30",
    closeTime: "17:00 (เปิดทุกวัน)",
    addressTh: "ตำบลอัมพวา อำเภออัมพวา จังหวัดสมุทรสงคราม 75110",
    latitude: 13.4244,
    longitude: 99.9535,
    googleMapsUrl: "https://maps.google.com/?q=King+Rama+II+Memorial+Park",
    highlight: "เรือนไทยไม้สักทองโบราณและบรรยากาศร่มรื่นริมฝั่งแม่น้ำ",
    recommendReason: "แหล่งเรียนรู้ประวัติศาสตร์และศิลปวัฒนธรรมไทยที่ร่มรื่น อยู่ติดตลาดน้ำอัมพวา",
    tips: "เดินเชื่อมจากตลาดน้ำอัมพวาได้ทันที"
  },

  // --- ร้านอาหาร & คาเฟ่ (Restaurants & Cafes) ---
  {
    id: "res-1",
    name: "Ruen Waree Restaurant",
    nameTh: "ร้านอาหารเรือนวารี",
    descriptionTh: "ร้านอาหารทะเลและอาหารไทยพื้นบ้านริมแม่น้ำแม่กลอง บรรยากาศโปร่งสบาย ลมพัดเย็น วิวคุ้งน้ำ เมนูเด็ดคือปลาทูต้มส้ม ปลาทูซาเตี๊ยะ หอยหลอดผัดฉ่า ปูไข่นึ่งนมสด และกุ้งแม่น้ำเผา",
    location: "อำเภอเมืองสมุทรสงคราม",
    district: "mueang",
    category: "restaurant",
    categoryTh: "ร้านอาหารทะเล / ริมแม่น้ำ",
    tags: ["เรือนวารี", "อาหารทะเล", "ริมน้ำ", "ปลาทูแม่กลอง", "ปูไข่", "หอยหลอดผัดฉ่า"],
    rating: 4.6,
    reviewCount: 4500,
    popularScore: 92,
    openTime: "10:00",
    closeTime: "20:30 (เปิดทุกวัน)",
    addressTh: "ตำบลแหลมใหญ่ อำเภอเมืองสมุทรสงคราม จังหวัดสมุทรสงคราม 75000",
    latitude: 13.3985,
    longitude: 100.0125,
    googleMapsUrl: "https://maps.google.com/?q=Ruen+Waree+Restaurant+Samut+Songkhram",
    highlight: "เมนูปลาทูต้มส้มรสเปรี้ยวหวานกลมกล่อม และปูไข่นึ่งสดใหม่",
    recommendReason: "ร้านดังริมแม่น้ำแม่กลองที่ได้คะแนนรีวิวระดับ 4.6 ดาว จากรสชาติอาหารพื้นถิ่นแท้และวัตถุดิบสดใหม่",
    tips: "แนะนำโทรจองโต๊ะริมน้ำล่วงหน้าช่วงวันหยุดสุดสัปดาห์"
  },
  {
    id: "res-2",
    name: "Khun Tao Restaurant Don Hoi Lot",
    nameTh: "ร้านคุณเต่า ดอนหอยหลอด",
    descriptionTh: "ร้านอาหารทะเลชื่อดังริมดอนหอยหลอด ขึ้นชื่อเรื่องความสดของวัตถุดิบและรสชาติจัดจ้าน เมนูแนะนำ: หอยหลอดผัดฉ่า, ส้มตำปูไข่ดอง, ปลากะพงทอดน้ำปลา, แกงส้มไข่ปลาริวกิว",
    location: "อำเภอเมืองสมุทรสงคราม",
    district: "mueang",
    category: "restaurant",
    categoryTh: "ร้านอาหารทะเล / ดอนหอยหลอด",
    tags: ["ร้านคุณเต่า", "ดอนหอยหลอด", "หอยหลอดผัดฉ่า", "อาหารทะเลสด", "แกงส้มไข่ปลา"],
    rating: 4.5,
    reviewCount: 3800,
    popularScore: 88,
    openTime: "09:00",
    closeTime: "20:00 (เปิดทุกวัน)",
    addressTh: "ตำบลบางจะเกร็ง อำเภอเมืองสมุทรสงคราม จังหวัดสมุทรสงคราม 75000",
    latitude: 13.3592,
    longitude: 100.0381,
    googleMapsUrl: "https://maps.google.com/?q=Khun+Tao+Restaurant+Don+Hoi+Lot",
    highlight: "หอยหลอดผัดฉ่าพริกไทยอ่อนและปูม้านึ่งสดหวาน",
    recommendReason: "พิกัดยอดฮิตประจำดอนหอยหลอด รีวิวชมเรื่องรสชาติจัดจ้านถึงเครื่องและอาหารเสิร์ฟไว",
    tips: "มีที่จอดรถกว้างขวาง และใกล้จุดจำหน่ายของฝากอาหารทะเลแห้ง"
  },
  {
    id: "res-3",
    name: "Krua Khru Hom",
    nameTh: "ครัวครูหอม",
    descriptionTh: "ร้านอาหารพื้นบ้านริมคลองแม่กลอง บรรยากาศร่มรื่นใต้เงาไม้ เสิร์ฟอาหารรสชาติต้นตำรับชาวสมุทรสงคราม อาทิ แกงคั่วชะครามเนื้อปู, ปลาทูทอดราดน้ำปลา, น้ำพริกกะปิปลาทูทอดผักชะคราม",
    location: "อำเภอเมืองสมุทรสงคราม",
    district: "mueang",
    category: "restaurant",
    categoryTh: "ร้านอาหารไทยพื้นบ้าน",
    tags: ["ครัวครูหอม", "อาหารพื้นบ้าน", "ใบชะคราม", "ปลาทูทอด", "แกงคั่วปู"],
    rating: 4.7,
    reviewCount: 2900,
    popularScore: 90,
    openTime: "10:00",
    closeTime: "20:00 (เปิดทุกวัน)",
    addressTh: "ตำบลท้ายหาด อำเภอเมืองสมุทรสงคราม จังหวัดสมุทรสงคราม 75000",
    latitude: 13.4152,
    longitude: 99.9821,
    googleMapsUrl: "https://maps.google.com/?q=Krua+Khru+Hom+Samut+Songkhram",
    highlight: "เมนูจากใบชะคราม ผักพื้นถิ่นสมุทรสงครามที่นำมาปรุงอาหารได้รสชาติกลมกล่อม",
    recommendReason: "ได้รับการยกย่องจากนักชิมสาย Local ว่าเป็นร้านอาหารพื้นบ้านที่รสชาติต้นตำรับแท้จริง",
    tips: "บรรยากาศเหมาะกับการรับประทานอาหารแบบครอบครัว"
  },
  {
    id: "res-4",
    name: "Café Kantary Amphawa",
    nameTh: "คาเฟ่ แคนทารี อัมพวา",
    descriptionTh: "คาเฟ่และเบเกอรี่สไตล์โมเดิร์นริมคลองอัมพวา มีกาแฟระดับพรีเมียม โทสต์ เบเกอรี่อบสด ไอศกรีมเจลาโต้โฮมเมด และอาหารจานเดียว บรรยากาศห้องแอร์เย็นสบาย",
    location: "อำเภออัมพวา",
    district: "amphawa",
    category: "restaurant",
    categoryTh: "คาเฟ่ / เบเกอรี่ / กาแฟริมน้ำ",
    tags: ["คาเฟ่", "อัมพวา", "ของหวาน", "โทสต์", "กาแฟ", "ถ่ายรูป"],
    rating: 4.5,
    reviewCount: 3100,
    popularScore: 87,
    openTime: "08:00",
    closeTime: "20:00 (เปิดทุกวัน)",
    addressTh: "ตำบลอัมพวา อำเภออัมพวา จังหวัดสมุทรสงคราม 75110",
    latitude: 13.426,
    longitude: 99.954,
    googleMapsUrl: "https://maps.google.com/?q=Cafe+Kantary+Amphawa",
    highlight: "ฮันนี่โทสต์สูตรพิเศษและมุมระเบียงริมคลองชมวิถีชีวิตชาวเรือ",
    recommendReason: "คาเฟ่ยอดนิยมอันดับต้นๆ ในอัมพวา สำหรับพักผ่อนคลายร้อนและถ่ายรูปชิลๆ ริมคลอง",
    tips: "จุดพักผ่อนคลายร้อนที่ดีหลังจากเดินเที่ยวในตลาดน้ำอัมพวา"
  },

  // --- โรงแรม & ที่พัก (Hotels & Homestays) ---
  {
    id: "htl-1",
    name: "The Legend Maeklong",
    nameTh: "เดอะ เลเจนด์ แม่กลอง (The Legend Maeklong)",
    descriptionTh: "บูทีครีสอร์ทริมแม่น้ำแม่กลอง ตกแต่งผสมผสานสถาปัตยกรรมไทยย้อนยุคริมสายน้ำ มีสระว่ายน้ำ ห้องอาหารริมน้ำ และบรรยากาศส่วนตัวเงียบสงบ",
    location: "อำเภอเมืองสมุทรสงคราม",
    district: "mueang",
    category: "hotel",
    categoryTh: "รีสอร์ทริมแม่น้ำ / บูทีคโฮเทล",
    tags: ["ที่พักริมน้ำ", "แม่กลอง", "รีสอร์ทหรู", "สระว่ายน้ำ", "พักผ่อน"],
    rating: 4.8,
    reviewCount: 2200,
    popularScore: 93,
    openTime: "24 ชั่วโมง",
    closeTime: "24 ชั่วโมง (Check-in 14:00 / Check-out 12:00)",
    addressTh: "ตำบลแม่กลอง อำเภอเมืองสมุทรสงคราม จังหวัดสมุทรสงคราม 75000",
    latitude: 13.4112,
    longitude: 100.0054,
    googleMapsUrl: "https://maps.google.com/?q=The+Legend+Maeklong",
    highlight: "วิวพระอาทิตย์ตกริมแม่น้ำแม่กลอง และสิ่งอำนวยความสะดวกครบครัน",
    recommendReason: "ได้คะแนนรีวิวที่พักยอดเยี่ยมระดับ 4.8 ดาว บรรยากาศโรแมนติกริมแม่น้ำแม่กลองและบริการระดับพรีเมียม",
    tips: "เหมาะสำหรับการพักผ่อนแบบคู่รักหรือครอบครัวที่ต้องการความเงียบสงบ"
  },
  {
    id: "htl-2",
    name: "Baan Rak Amphawa Homestay",
    nameTh: "บ้านรักอัมพวา โฮมสเตย์",
    descriptionTh: "โฮมสเตย์เรือนไม้ริมคลองอัมพวา ใกล้ตลาดน้ำ ให้ความรู้สึกอบอุ่นแบบไทยดั้งเดิม ตื่นเช้ามาตักบาตรพระทางเรือริมชานท่าน้ำ และมีบริการติดต่อเรือชมหิ่งห้อย",
    location: "อำเภออัมพวา",
    district: "amphawa",
    category: "hotel",
    categoryTh: "โฮมสเตย์ริมน้ำ / วิถีไทย",
    tags: ["โฮมสเตย์", "อัมพวา", "ตักบาตรพระทางเรือ", "ริมคลอง", "ใกล้ตลาดน้ำ"],
    rating: 4.9,
    reviewCount: 1850,
    popularScore: 95,
    openTime: "24 ชั่วโมง",
    closeTime: "24 ชั่วโมง (Check-in 14:00 / Check-out 12:00)",
    addressTh: "ตำบลอัมพวา อำเภออัมพวา จังหวัดสมุทรสงคราม 75110",
    latitude: 13.4243,
    longitude: 99.9564,
    googleMapsUrl: "https://maps.google.com/?q=Baan+Rak+Amphawa",
    highlight: "กิจกรรมตักบาตรพระสงฆ์ที่พายเรือมารับบาตรริมท่าน้ำยามเช้า (06.00-06.30 น.)",
    recommendReason: "โฮมสเตย์ที่ได้รับคะแนนความพึงพอใจสูงสุด (4.9 ดาว) ด้วยการต้อนรับอบอุ่นแบบไทยแท้และทำเลติดริมคลองอัมพวา",
    tips: "สามารถเดินไปตลาดน้ำอัมพวาได้ใน 3-5 นาที"
  },
  {
    id: "htl-3",
    name: "Asita Eco Resort",
    nameTh: "อสิตา อีโค รีสอร์ท (Asita Eco Resort)",
    descriptionTh: "รีสอร์ทสไตล์อีโคท่ามกลางธรรมชาติร่มรื่น โอบล้อมด้วยลำคลองและต้นไม้นานาพันธุ์ มีห้องพักสไตล์วิลล่าริมน้ำ กิจกรรมพายเรือคายัค สปา สระว่ายน้ำ และห้องอาหาร",
    location: "อำเภอเมืองสมุทรสงคราม",
    district: "mueang",
    category: "hotel",
    categoryTh: "อีโครีสอร์ท / ธรรมชาติริมคลอง",
    tags: ["อสิตา", "อีโครีสอร์ท", "พายคายัค", "ธรรมชาติ", "สระว่ายน้ำ"],
    rating: 4.7,
    reviewCount: 1950,
    popularScore: 91,
    openTime: "24 ชั่วโมง",
    closeTime: "24 ชั่วโมง (Check-in 14:00 / Check-out 12:00)",
    addressTh: "ตำบลท้ายหาด อำเภอเมืองสมุทรสงคราม จังหวัดสมุทรสงคราม 75000",
    latitude: 13.4188,
    longitude: 99.9795,
    googleMapsUrl: "https://maps.google.com/?q=Asita+Eco+Resort",
    highlight: "วิลล่าริมคลองธรรมชาติ พร้อมกิจกรรมพายเรือคายัคฟรีสำหรับผู้เข้าพัก",
    recommendReason: "รีสอร์ทแนวรักษ์ธรรมชาติที่มีรีวิวโดดเด่นเรื่องพื้นที่สีเขียวและความเงียบสงบ เหมาะกับการรีชาร์จพลัง",
    tips: "มีพื้นที่สีเขียวเหมาะกับการปั่นจักรยานและเดินเล่นสูดอากาศบริสุทธิ์"
  }
];

export const searchKnowledge = (query: string): KnowledgePlace[] => {
  const q = query.toLowerCase().trim();
  if (!q) return samutSongkhramKnowledge;

  return samutSongkhramKnowledge.filter((p) => {
    return (
      p.nameTh.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.descriptionTh.toLowerCase().includes(q) ||
      p.categoryTh.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });
};

export const getTopPlaces = (count = 5, category?: string): KnowledgePlace[] => {
  let list = [...samutSongkhramKnowledge];
  if (category) {
    list = list.filter((p) => p.category === category);
  }
  return list.sort((a, b) => b.popularScore - a.popularScore).slice(0, count);
};

export const buildSystemPrompt = (userQuery: string, placeContext?: string): string => {
  const matchedPlaces = searchKnowledge(userQuery);
  const relevantPlaces = matchedPlaces.length > 0 ? matchedPlaces : samutSongkhramKnowledge;

  const knowledgeSnippet = relevantPlaces
    .map(
      (p) => `- [${p.categoryTh}] **${p.nameTh}** (${p.name}):
  * คะแนนความนิยม: ${p.popularScore}/100 | คะแนนรีวิว: ${p.rating} / 5 (${p.reviewCount.toLocaleString()} รีวิว)
  * ที่ตั้ง: ${p.addressTh}
  * พิกัด Google Maps: ${p.googleMapsUrl}
  * เวลาทำการ: ${p.openTime} - ${p.closeTime}
  * รายละเอียด: ${p.descriptionTh}
  * ไฮไลท์: ${p.highlight}
  * เหตุผลที่แนะนำ: ${p.recommendReason}
  * ข้อแนะนำ/ทริป: ${p.tips || "-"}`
    )
    .join("\n\n");

  return `คุณคือ "น้องปลาทู (NongPlatoo)" ผู้ช่วย AI ด้านการท่องเที่ยว ประจำจังหวัดสมุทรสงคราม (เมืองแม่กลอง)
บุคลิก: เป็นมิตร สุภาพ เป็นทางการ ใช้ภาษาไทยเป็นหลัก มีคำลงท้าย "ค่ะ/นะคะ" ห้ามใช้อิโมจิในคำตอบเด็ดขาด

กฎเหล็กและแนวทางการตอบ:
1. จังหวัดสมุทรสงครามเท่านั้น: ทุกสถานที่ที่คุณแนะนำต้องอยู่ในจังหวัดสมุทรสงครามเท่านั้น (ครอบคลุม อ.เมืองสมุทรสงคราม, อ.อัมพวา, อ.บางคนที)
2. เมื่อผู้ใช้ขอรายการ Top (เช่น "ขอ 5 สถานที่ท่องเที่ยวเด็ดๆ", "Top 5 ร้านอาหาร", "Top 3 ที่พัก"):
   - ให้แนะนำตรงตามจำนวนที่ผู้ใช้ขอเท่านั้น (เช่น ขอ 5 ที่ ให้บอก 5 ที่พอดี ห้ามเกิน)
   - ต้องระบุ เหตุผลที่แนะนำ (Reason for recommendation) ทุกที่ เช่น ความนิยมบน Social Media, คะแนนรีวิวจากผู้ใช้งานจริง (${relevantPlaces[0]?.rating || 4.8} / 5), หรือความโดดเด่นเฉพาะตัว
   - ต้องแนบ ลิงก์ Google Maps ให้ผู้ใช้คลิกเปิดดูแผนที่และนำทางได้จริง เช่น \`[ดูแผนที่ Google Maps](URL)\`
   - ระบุเวลาทำการและไฮไลท์เด่นชัดเจน
3. การค้นหาและเชื่อมโยงแผนที่: เมื่อแนะนำสถานที่ใดๆ ให้ใส่ลิงก์ Google Maps เสมอ เพื่อให้ผู้ใช้สามารถตรวจสอบตำแหน่งและเส้นทางได้อย่างแม่นยำ
4. ขอบเขตข้อมูล: ให้ข้อมูลเฉพาะ 3 ด้านในสมุทรสงคราม:
   - สถานที่ท่องเที่ยว, วัด, ตลาดน้ำ
   - ร้านอาหาร, คาเฟ่, สตรีทฟู้ด และของกินขึ้นชื่อ
   - โรงแรม, รีสอร์ท และโฮมสเตย์
5. ไม่มีการจัดเก็บข้อมูลส่วนตัวใดๆ ของผู้ใช้
6. ตอบในรูปแบบ Markdown ที่เป็นทางการ สะอาดตา อ่านง่าย มีหัวข้อย่อยชัดเจน และห้ามมีอิโมจิในข้อความ`;
};
