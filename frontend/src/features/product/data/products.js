export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 29990000,
    image: "https://via.placeholder.com/300x300/007AFF/FFFFFF?text=iPhone+15+Pro+Max",
    category: "iPhone",
    rating: 4.8,
    discount: 5,
    description: "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP, màn hình 6.7 inch Super Retina XDR OLED, và thiết kế titanium cao cấp.",
    specs: {
      screen: "6.7 inch Super Retina XDR OLED",
      processor: "A17 Pro chip",
      camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      storage: "256GB",
      battery: "4441mAh",
      os: "iOS 17"
    },
    colors: ["Titan tự nhiên", "Titan xanh", "Titan trắng", "Titan đen"],
    images: [
      "https://via.placeholder.com/600x600/007AFF/FFFFFF?text=iPhone+15+Pro+Max+1",
      "https://via.placeholder.com/600x600/1428A0/FFFFFF?text=iPhone+15+Pro+Max+2",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=iPhone+15+Pro+Max+3"
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 24990000,
    image: "https://via.placeholder.com/300x300/1428A0/FFFFFF?text=Samsung+S24+Ultra",
    category: "Samsung",
    rating: 4.7,
    discount: 0,
    description: "Samsung Galaxy S24 Ultra với S Pen tích hợp, camera 200MP, màn hình 6.8 inch Dynamic AMOLED 2X, và chip Snapdragon 8 Gen 3.",
    specs: {
      screen: "6.8 inch Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 3",
      camera: "200MP Main + 12MP Ultra Wide + 50MP Telephoto + 10MP Telephoto",
      storage: "512GB",
      battery: "5000mAh",
      os: "Android 14, One UI 6.1"
    },
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
    images: [
      "https://via.placeholder.com/600x600/1428A0/FFFFFF?text=Samsung+S24+Ultra+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Samsung+S24+Ultra+2",
      "https://via.placeholder.com/600x600/8B5CF6/FFFFFF?text=Samsung+S24+Ultra+3"
    ]
  },
  {
    id: 3,
    name: "MacBook Pro M3",
    price: 45990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=MacBook+Pro+M3",
    category: "MacBook",
    rating: 4.9,
    discount: 10,
    description: "MacBook Pro M3 với chip Apple M3 mạnh mẽ, màn hình Liquid Retina XDR 14 inch, và hiệu suất đáng kinh ngạc.",
    specs: {
      screen: "14 inch Liquid Retina XDR",
      processor: "Apple M3 chip",
      memory: "16GB Unified Memory",
      storage: "512GB SSD",
      battery: "Up to 22 hours",
      os: "macOS Sonoma"
    },
    colors: ["Space Gray", "Silver"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=MacBook+Pro+M3+1",
      "https://via.placeholder.com/600x600/808080/FFFFFF?text=MacBook+Pro+M3+2"
    ]
  },
  {
    id: 4,
    name: "AirPods Pro 2",
    price: 5990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=AirPods+Pro+2",
    category: "Tai nghe",
    rating: 4.6,
    discount: 15,
    description: "AirPods Pro 2 với Active Noise Cancellation, Spatial Audio, và chip H2 mới nhất.",
    specs: {
      type: "In-ear wireless",
      battery: "Up to 6 hours",
      charging: "MagSafe Charging Case",
      features: "Active Noise Cancellation, Spatial Audio",
      compatibility: "iOS 16.1+, macOS 13"
    },
    colors: ["White"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=AirPods+Pro+2+1"
    ]
  },
  {
    id: 5,
    name: "iPad Air 5",
    price: 15990000,
    image: "https://via.placeholder.com/300x300/007AFF/FFFFFF?text=iPad+Air+5",
    category: "Máy tính bảng",
    rating: 4.5,
    discount: 8,
    description: "iPad Air 5 với chip M1, màn hình 10.9 inch Liquid Retina, và hỗ trợ Apple Pencil 2.",
    specs: {
      screen: "10.9 inch Liquid Retina",
      processor: "Apple M1 chip",
      storage: "256GB",
      battery: "Up to 10 hours",
      os: "iPadOS 15",
      features: "Apple Pencil 2, Magic Keyboard"
    },
    colors: ["Space Gray", "Silver", "Pink", "Purple", "Blue"],
    images: [
      "https://via.placeholder.com/600x600/007AFF/FFFFFF?text=iPad+Air+5+1",
      "https://via.placeholder.com/600x600/FF69B4/FFFFFF?text=iPad+Air+5+2"
    ]
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    price: 8990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=Sony+WH-1000XM5",
    category: "Tai nghe",
    rating: 4.8,
    discount: 12,
    description: "Sony WH-1000XM5 với công nghệ noise cancellation hàng đầu thế giới và âm thanh chất lượng cao.",
    specs: {
      type: "Over-ear wireless",
      battery: "Up to 30 hours",
      features: "Industry-leading noise cancellation",
      connectivity: "Bluetooth 5.2, NFC",
      weight: "250g"
    },
    colors: ["Black", "Silver"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Sony+WH-1000XM5+1",
      "https://via.placeholder.com/600x600/C0C0C0/FFFFFF?text=Sony+WH-1000XM5+2"
    ]
  },
  {
    id: 7,
    name: "Xiaomi 14 Ultra",
    price: 19990000,
    image: "https://via.placeholder.com/300x300/FF6700/FFFFFF?text=Xiaomi+14+Ultra",
    category: "Xiaomi",
    rating: 4.6,
    discount: 8,
    description: "Xiaomi 14 Ultra với camera Leica, chip Snapdragon 8 Gen 3, và thiết kế cao cấp.",
    specs: {
      screen: "6.73 inch AMOLED",
      processor: "Snapdragon 8 Gen 3",
      camera: "50MP Leica main + 50MP ultra-wide + 50MP telephoto",
      storage: "512GB",
      battery: "5000mAh",
      os: "MIUI 15, Android 14"
    },
    colors: ["Black", "White", "Green"],
    images: [
      "https://via.placeholder.com/600x600/FF6700/FFFFFF?text=Xiaomi+14+Ultra+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Xiaomi+14+Ultra+2"
    ]
  },
  {
    id: 8,
    name: "OPPO Find X7 Ultra",
    price: 22990000,
    image: "https://via.placeholder.com/300x300/008751/FFFFFF?text=OPPO+Find+X7+Ultra",
    category: "OPPO",
    rating: 4.5,
    discount: 10,
    description: "OPPO Find X7 Ultra với camera Hasselblad, chip Dimensity 9300, và thiết kế độc đáo.",
    specs: {
      screen: "6.82 inch LTPO AMOLED",
      processor: "MediaTek Dimensity 9300",
      camera: "50MP Hasselblad main + 50MP ultra-wide + 50MP telephoto",
      storage: "512GB",
      battery: "5000mAh",
      os: "ColorOS 14, Android 14"
    },
    colors: ["Black", "White", "Blue"],
    images: [
      "https://via.placeholder.com/600x600/008751/FFFFFF?text=OPPO+Find+X7+Ultra+1",
      "https://via.placeholder.com/600x600/0000FF/FFFFFF?text=OPPO+Find+X7+Ultra+2"
    ]
  },
  {
    id: 9,
    name: "Dell XPS 13 Plus",
    price: 32990000,
    image: "https://via.placeholder.com/300x300/007DB8/FFFFFF?text=Dell+XPS+13+Plus",
    category: "Laptop Văn phòng",
    rating: 4.7,
    discount: 5,
    description: "Dell XPS 13 Plus với thiết kế siêu mỏng, màn hình InfinityEdge, và hiệu suất cao.",
    specs: {
      screen: "13.4 inch 4K OLED",
      processor: "Intel Core i7-1360P",
      memory: "16GB LPDDR5",
      storage: "512GB SSD",
      battery: "Up to 12 hours",
      os: "Windows 11 Pro"
    },
    colors: ["Platinum Silver", "Graphite"],
    images: [
      "https://via.placeholder.com/600x600/007DB8/FFFFFF?text=Dell+XPS+13+Plus+1",
      "https://via.placeholder.com/600x600/808080/FFFFFF?text=Dell+XPS+13+Plus+2"
    ]
  },
  {
    id: 10,
    name: "ASUS ROG Strix G16",
    price: 28990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=ASUS+ROG+Strix+G16",
    category: "Laptop Gaming",
    rating: 4.8,
    discount: 15,
    description: "ASUS ROG Strix G16 với GPU RTX 4060, màn hình 16 inch 165Hz, và thiết kế gaming đẹp mắt.",
    specs: {
      screen: "16 inch QHD 165Hz",
      processor: "Intel Core i7-13650HX",
      gpu: "NVIDIA RTX 4060 8GB",
      memory: "16GB DDR5",
      storage: "1TB SSD",
      os: "Windows 11 Home"
    },
    colors: ["Black", "Gray"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=ASUS+ROG+Strix+G16+1",
      "https://via.placeholder.com/600x600/808080/FFFFFF?text=ASUS+ROG+Strix+G16+2"
    ]
  },
  {
    id: 11,
    name: "Bose QuietComfort 45",
    price: 7990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=Bose+QuietComfort+45",
    category: "Tai nghe",
    rating: 4.9,
    discount: 0,
    description: "Bose QuietComfort 45 với công nghệ noise cancellation tiên tiến và âm thanh chất lượng cao.",
    specs: {
      type: "Over-ear wireless",
      battery: "Up to 24 hours",
      features: "Acoustic Noise Cancelling",
      connectivity: "Bluetooth 5.1",
      weight: "238g"
    },
    colors: ["Black", "White"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Bose+QuietComfort+45+1",
      "https://via.placeholder.com/600x600/FFFFFF/000000?text=Bose+QuietComfort+45+2"
    ]
  },
  {
    id: 12,
    name: "JBL Flip 6",
    price: 2990000,
    image: "https://via.placeholder.com/300x300/FF6600/FFFFFF?text=JBL+Flip+6",
    category: "Loa",
    rating: 4.4,
    discount: 20,
    description: "JBL Flip 6 loa bluetooth di động với âm thanh mạnh mẽ và thiết kế chống nước.",
    specs: {
      type: "Portable Bluetooth Speaker",
      battery: "Up to 12 hours",
      features: "Waterproof IPX7",
      connectivity: "Bluetooth 5.1",
      power: "30W"
    },
    colors: ["Black", "Blue", "Red", "Gray"],
    images: [
      "https://via.placeholder.com/600x600/FF6600/FFFFFF?text=JBL+Flip+6+1",
      "https://via.placeholder.com/600x600/0000FF/FFFFFF?text=JBL+Flip+6+2"
    ]
  },
  {
    id: 13,
    name: "Samsung 65\" QLED 4K",
    price: 35990000,
    image: "https://via.placeholder.com/300x300/1428A0/FFFFFF?text=Samsung+65+QLED+4K",
    category: "Tivi",
    rating: 4.8,
    discount: 12,
    description: "Samsung 65 inch QLED 4K với công nghệ Quantum Dot, HDR10+, và Smart TV.",
    specs: {
      screen: "65 inch QLED 4K",
      resolution: "3840 x 2160",
      hdr: "HDR10+, HLG",
      smart: "Tizen OS",
      ports: "4 HDMI, 2 USB"
    },
    colors: ["Black"],
    images: [
      "https://via.placeholder.com/600x600/1428A0/FFFFFF?text=Samsung+65+QLED+4K+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Samsung+65+QLED+4K+2"
    ]
  },
  {
    id: 14,
    name: "LG 55\" OLED 4K",
    price: 29990000,
    image: "https://via.placeholder.com/300x300/A50034/FFFFFF?text=LG+55+OLED+4K",
    category: "Tivi",
    rating: 4.9,
    discount: 8,
    description: "LG 55 inch OLED 4K với công nghệ OLED tự phát sáng, AI ThinQ, và webOS.",
    specs: {
      screen: "55 inch OLED 4K",
      resolution: "3840 x 2160",
      hdr: "Dolby Vision, HDR10",
      smart: "webOS 23",
      ports: "4 HDMI, 3 USB"
    },
    colors: ["Black"],
    images: [
      "https://via.placeholder.com/600x600/A50034/FFFFFF?text=LG+55+OLED+4K+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=LG+55+OLED+4K+2"
    ]
  },
  {
    id: 15,
    name: "PlayStation 5",
    price: 12990000,
    image: "https://via.placeholder.com/300x300/003791/FFFFFF?text=PlayStation+5",
    category: "Máy chơi game",
    rating: 4.9,
    discount: 0,
    description: "PlayStation 5 với SSD siêu nhanh, DualSense controller, và hỗ trợ 4K gaming.",
    specs: {
      processor: "AMD Zen 2",
      gpu: "AMD RDNA 2",
      storage: "825GB SSD",
      memory: "16GB GDDR6",
      features: "4K Gaming, Ray Tracing"
    },
    colors: ["White"],
    images: [
      "https://via.placeholder.com/600x600/003791/FFFFFF?text=PlayStation+5+1",
      "https://via.placeholder.com/600x600/FFFFFF/000000?text=PlayStation+5+2"
    ]
  },
  {
    id: 16,
    name: "Xbox Series X",
    price: 11990000,
    image: "https://via.placeholder.com/300x300/107C10/FFFFFF?text=Xbox+Series+X",
    category: "Máy chơi game",
    rating: 4.8,
    discount: 5,
    description: "Xbox Series X với hiệu suất mạnh mẽ, Game Pass, và hỗ trợ 4K 120fps.",
    specs: {
      processor: "AMD Zen 2",
      gpu: "AMD RDNA 2",
      storage: "1TB SSD",
      memory: "16GB GDDR6",
      features: "4K 120fps, Ray Tracing"
    },
    colors: ["Black"],
    images: [
      "https://via.placeholder.com/600x600/107C10/FFFFFF?text=Xbox+Series+X+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Xbox+Series+X+2"
    ]
  },
  {
    id: 17,
    name: "Canon EOS R6 Mark II",
    price: 45990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=Canon+EOS+R6+Mark+II",
    category: "Camera",
    rating: 4.7,
    discount: 10,
    description: "Canon EOS R6 Mark II với sensor 24MP, 4K video, và autofocus nhanh.",
    specs: {
      sensor: "24.2MP Full-Frame CMOS",
      video: "4K 60p",
      autofocus: "Dual Pixel CMOS AF II",
      connectivity: "Wi-Fi, Bluetooth",
      battery: "LP-E6NH"
    },
    colors: ["Black"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Canon+EOS+R6+Mark+II+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Canon+EOS+R6+Mark+II+2"
    ]
  },
  {
    id: 18,
    name: "Sony A7 IV",
    price: 52990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=Sony+A7+IV",
    category: "Camera",
    rating: 4.8,
    discount: 8,
    description: "Sony A7 IV với sensor 33MP, 4K video, và Real-time Eye AF.",
    specs: {
      sensor: "33MP Full-Frame Exmor R",
      video: "4K 30p",
      autofocus: "Real-time Eye AF",
      connectivity: "Wi-Fi, USB-C",
      battery: "NP-FZ100"
    },
    colors: ["Black"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Sony+A7+IV+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Sony+A7+IV+2"
    ]
  },
  {
    id: 19,
    name: "Samsung T7 Shield 1TB",
    price: 2990000,
    image: "https://via.placeholder.com/300x300/1428A0/FFFFFF?text=Samsung+T7+Shield+1TB",
    category: "Ổ cứng",
    rating: 4.6,
    discount: 15,
    description: "Samsung T7 Shield SSD di động với khả năng chống nước, chống sốc.",
    specs: {
      capacity: "1TB",
      interface: "USB 3.2 Gen 2",
      speed: "Up to 1050MB/s",
      protection: "IP65 Water & Dust",
      compatibility: "Windows, Mac, Android"
    },
    colors: ["Black", "Blue"],
    images: [
      "https://via.placeholder.com/600x600/1428A0/FFFFFF?text=Samsung+T7+Shield+1TB+1",
      "https://via.placeholder.com/600x600/0000FF/FFFFFF?text=Samsung+T7+Shield+1TB+2"
    ]
  },
  {
    id: 20,
    name: "Corsair Vengeance 32GB DDR5",
    price: 1990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=Corsair+Vengeance+32GB+DDR5",
    category: "RAM",
    rating: 4.5,
    discount: 0,
    description: "Corsair Vengeance DDR5 32GB với hiệu suất cao và thiết kế RGB.",
    specs: {
      capacity: "32GB (2x16GB)",
      speed: "5600MHz",
      latency: "CL36",
      voltage: "1.25V",
      features: "RGB Lighting"
    },
    colors: ["Black"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Corsair+Vengeance+32GB+DDR5+1",
      "https://via.placeholder.com/600x600/FF0000/FFFFFF?text=Corsair+Vengeance+32GB+DDR5+2"
    ]
  },
  {
    id: 21,
    name: "Logitech MX Master 3S",
    price: 2990000,
    image: "https://via.placeholder.com/300x300/00C300/FFFFFF?text=Logitech+MX+Master+3S",
    category: "Chuột",
    rating: 4.8,
    discount: 10,
    description: "Logitech MX Master 3S với sensor 8000 DPI, scroll wheel MagSpeed, và kết nối đa thiết bị.",
    specs: {
      sensor: "8000 DPI Darkfield",
      connectivity: "Bluetooth, USB-C",
      battery: "Up to 70 days",
      features: "MagSpeed Scroll, Multi-device",
      compatibility: "Windows, Mac, Linux"
    },
    colors: ["Black", "White"],
    images: [
      "https://via.placeholder.com/600x600/00C300/FFFFFF?text=Logitech+MX+Master+3S+1",
      "https://via.placeholder.com/600x600/FFFFFF/000000?text=Logitech+MX+Master+3S+2"
    ]
  },
  {
    id: 22,
    name: "Razer BlackWidow V4 Pro",
    price: 3990000,
    image: "https://via.placeholder.com/300x300/44D62C/FFFFFF?text=Razer+BlackWidow+V4+Pro",
    category: "Bàn phím",
    rating: 4.7,
    discount: 5,
    description: "Razer BlackWidow V4 Pro với switch cơ học, RGB lighting, và macro keys.",
    specs: {
      switches: "Razer Green Mechanical",
      layout: "Full-size with Macro Keys",
      lighting: "Razer Chroma RGB",
      connectivity: "USB-C, Wireless",
      features: "Programmable Macro Keys"
    },
    colors: ["Black"],
    images: [
      "https://via.placeholder.com/600x600/44D62C/FFFFFF?text=Razer+BlackWidow+V4+Pro+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Razer+BlackWidow+V4+Pro+2"
    ]
  },
  {
    id: 23,
    name: "iPhone 14 Pro",
    price: 24990000,
    image: "https://via.placeholder.com/300x300/007AFF/FFFFFF?text=iPhone+14+Pro",
    category: "iPhone",
    rating: 4.7,
    discount: 8,
    description: "iPhone 14 Pro với Dynamic Island, camera 48MP, và chip A16 Bionic.",
    specs: {
      screen: "6.1 inch Super Retina XDR",
      processor: "A16 Bionic chip",
      camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      storage: "256GB",
      battery: "3200mAh",
      os: "iOS 16"
    },
    colors: ["Deep Purple", "Gold", "Silver", "Space Black"],
    images: [
      "https://via.placeholder.com/600x600/007AFF/FFFFFF?text=iPhone+14+Pro+1",
      "https://via.placeholder.com/600x600/8B5CF6/FFFFFF?text=iPhone+14+Pro+2"
    ]
  },
  {
    id: 24,
    name: "Samsung Galaxy S23 Ultra",
    price: 22990000,
    image: "https://via.placeholder.com/300x300/1428A0/FFFFFF?text=Samsung+Galaxy+S23+Ultra",
    category: "Samsung",
    rating: 4.8,
    discount: 12,
    description: "Samsung Galaxy S23 Ultra với S Pen, camera 200MP, và chip Snapdragon 8 Gen 2.",
    specs: {
      screen: "6.8 inch Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 2",
      camera: "200MP Main + 12MP Ultra Wide + 10MP Telephoto",
      storage: "512GB",
      battery: "5000mAh",
      os: "Android 13, One UI 5.1"
    },
    colors: ["Phantom Black", "Cream", "Green", "Lavender"],
    images: [
      "https://via.placeholder.com/600x600/1428A0/FFFFFF?text=Samsung+Galaxy+S23+Ultra+1",
      "https://via.placeholder.com/600x600/90EE90/FFFFFF?text=Samsung+Galaxy+S23+Ultra+2"
    ]
  },
  {
    id: 25,
    name: "MacBook Air M2",
    price: 29990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=MacBook+Air+M2",
    category: "MacBook",
    rating: 4.9,
    discount: 5,
    description: "MacBook Air M2 với chip Apple M2, thiết kế mỏng nhẹ, và hiệu suất cao.",
    specs: {
      screen: "13.6 inch Liquid Retina",
      processor: "Apple M2 chip",
      memory: "8GB Unified Memory",
      storage: "256GB SSD",
      battery: "Up to 18 hours",
      os: "macOS Ventura"
    },
    colors: ["Space Gray", "Silver", "Starlight", "Midnight"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=MacBook+Air+M2+1",
      "https://via.placeholder.com/600x600/808080/FFFFFF?text=MacBook+Air+M2+2"
    ]
  },
  {
    id: 26,
    name: "iPad Pro 12.9",
    price: 25990000,
    image: "https://via.placeholder.com/300x300/007AFF/FFFFFF?text=iPad+Pro+12.9",
    category: "Máy tính bảng",
    rating: 4.8,
    discount: 10,
    description: "iPad Pro 12.9 với chip M2, màn hình Liquid Retina XDR, và hỗ trợ Apple Pencil 2.",
    specs: {
      screen: "12.9 inch Liquid Retina XDR",
      processor: "Apple M2 chip",
      storage: "256GB",
      battery: "Up to 10 hours",
      os: "iPadOS 16",
      features: "Apple Pencil 2, Magic Keyboard"
    },
    colors: ["Space Gray", "Silver"],
    images: [
      "https://via.placeholder.com/600x600/007AFF/FFFFFF?text=iPad+Pro+12.9+1",
      "https://via.placeholder.com/600x600/808080/FFFFFF?text=iPad+Pro+12.9+2"
    ]
  },
  {
    id: 27,
    name: "Beats Studio Pro",
    price: 6990000,
    image: "https://via.placeholder.com/300x300/FF0000/FFFFFF?text=Beats+Studio+Pro",
    category: "Tai nghe",
    rating: 4.6,
    discount: 8,
    description: "Beats Studio Pro với Active Noise Cancelling, Spatial Audio, và kết nối USB-C.",
    specs: {
      type: "Over-ear wireless",
      battery: "Up to 36 hours",
      features: "Active Noise Cancelling, Spatial Audio",
      connectivity: "Bluetooth 5.3, USB-C",
      weight: "260g"
    },
    colors: ["Black", "White", "Blue", "Brown"],
    images: [
      "https://via.placeholder.com/600x600/FF0000/FFFFFF?text=Beats+Studio+Pro+1",
      "https://via.placeholder.com/600x600/FFFFFF/000000?text=Beats+Studio+Pro+2"
    ]
  },
  {
    id: 28,
    name: "Sony SRS-XB43",
    price: 3990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=Sony+SRS-XB43",
    category: "Loa",
    rating: 4.5,
    discount: 15,
    description: "Sony SRS-XB43 loa bluetooth với Extra Bass, chống nước, và đèn LED.",
    specs: {
      type: "Portable Bluetooth Speaker",
      battery: "Up to 24 hours",
      features: "Extra Bass, Waterproof IP67",
      connectivity: "Bluetooth 5.0, NFC",
      power: "30W"
    },
    colors: ["Black", "Blue", "Red"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Sony+SRS-XB43+1",
      "https://via.placeholder.com/600x600/0000FF/FFFFFF?text=Sony+SRS-XB43+2"
    ]
  },
  {
    id: 29,
    name: "LG 77\" OLED 4K",
    price: 59990000,
    image: "https://via.placeholder.com/300x300/A50034/FFFFFF?text=LG+77+OLED+4K",
    category: "Tivi",
    rating: 4.9,
    discount: 5,
    description: "LG 77 inch OLED 4K với màn hình lớn, công nghệ OLED, và AI ThinQ.",
    specs: {
      screen: "77 inch OLED 4K",
      resolution: "3840 x 2160",
      hdr: "Dolby Vision, HDR10",
      smart: "webOS 23",
      ports: "4 HDMI, 3 USB"
    },
    colors: ["Black"],
    images: [
      "https://via.placeholder.com/600x600/A50034/FFFFFF?text=LG+77+OLED+4K+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=LG+77+OLED+4K+2"
    ]
  },
  {
    id: 30,
    name: "Nintendo Switch OLED",
    price: 8990000,
    image: "https://via.placeholder.com/300x300/FF0000/FFFFFF?text=Nintendo+Switch+OLED",
    category: "Máy chơi game",
    rating: 4.7,
    discount: 0,
    description: "Nintendo Switch OLED với màn hình OLED 7 inch, dock có LAN port, và Joy-Con controllers.",
    specs: {
      screen: "7 inch OLED",
      storage: "64GB",
      battery: "Up to 9 hours",
      features: "Dock with LAN port",
      compatibility: "All Switch games"
    },
    colors: ["White", "Neon Blue/Red"],
    images: [
      "https://via.placeholder.com/600x600/FF0000/FFFFFF?text=Nintendo+Switch+OLED+1",
      "https://via.placeholder.com/600x600/FFFFFF/000000?text=Nintendo+Switch+OLED+2"
    ]
  },
  {
    id: 31,
    name: "Fujifilm X-T5",
    price: 39990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=Fujifilm+X-T5",
    category: "Camera",
    rating: 4.8,
    discount: 8,
    description: "Fujifilm X-T5 với sensor 40MP, thiết kế retro, và film simulation modes.",
    specs: {
      sensor: "40.2MP APS-C X-Trans CMOS 5",
      video: "6.2K 30p",
      autofocus: "425-point AF",
      connectivity: "Wi-Fi, Bluetooth",
      battery: "NP-W235"
    },
    colors: ["Black", "Silver"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Fujifilm+X-T5+1",
      "https://via.placeholder.com/600x600/C0C0C0/FFFFFF?text=Fujifilm+X-T5+2"
    ]
  },
  {
    id: 32,
    name: "WD My Passport 2TB",
    price: 1990000,
    image: "https://via.placeholder.com/300x300/0066CC/FFFFFF?text=WD+My+Passport+2TB",
    category: "Ổ cứng",
    rating: 4.4,
    discount: 20,
    description: "WD My Passport 2TB ổ cứng di động với thiết kế nhỏ gọn và bảo mật.",
    specs: {
      capacity: "2TB",
      interface: "USB 3.0",
      speed: "Up to 5Gbps",
      features: "Password Protection",
      compatibility: "Windows, Mac"
    },
    colors: ["Black", "Blue", "Red", "White"],
    images: [
      "https://via.placeholder.com/600x600/0066CC/FFFFFF?text=WD+My+Passport+2TB+1",
      "https://via.placeholder.com/600x600/0000FF/FFFFFF?text=WD+My+Passport+2TB+2"
    ]
  },
  {
    id: 33,
    name: "G.Skill Trident Z5 32GB DDR5",
    price: 2490000,
    image: "https://via.placeholder.com/300x300/FF6B35/FFFFFF?text=G.Skill+Trident+Z5+32GB+DDR5",
    category: "RAM",
    rating: 4.6,
    discount: 10,
    description: "G.Skill Trident Z5 DDR5 32GB với hiệu suất cao và thiết kế RGB đẹp mắt.",
    specs: {
      capacity: "32GB (2x16GB)",
      speed: "6000MHz",
      latency: "CL36",
      voltage: "1.35V",
      features: "RGB Lighting, Aluminum Heat Spreader"
    },
    colors: ["Black"],
    images: [
      "https://via.placeholder.com/600x600/FF6B35/FFFFFF?text=G.Skill+Trident+Z5+32GB+DDR5+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=G.Skill+Trident+Z5+32GB+DDR5+2"
    ]
  },
  {
    id: 34,
    name: "SteelSeries Rival 3",
    price: 1490000,
    image: "https://via.placeholder.com/300x300/FF6B35/FFFFFF?text=SteelSeries+Rival+3",
    category: "Chuột",
    rating: 4.3,
    discount: 25,
    description: "SteelSeries Rival 3 gaming mouse với sensor chính xác và thiết kế nhẹ.",
    specs: {
      sensor: "TrueMove Core",
      dpi: "Up to 8500",
      weight: "77g",
      connectivity: "USB-C",
      features: "6 Programmable Buttons"
    },
    colors: ["Black", "White"],
    images: [
      "https://via.placeholder.com/600x600/FF6B35/FFFFFF?text=SteelSeries+Rival+3+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=SteelSeries+Rival+3+2"
    ]
  },
  {
    id: 35,
    name: "HyperX Alloy Origins Core",
    price: 2490000,
    image: "https://via.placeholder.com/300x300/FF0000/FFFFFF?text=HyperX+Alloy+Origins+Core",
    category: "Bàn phím",
    rating: 4.5,
    discount: 15,
    description: "HyperX Alloy Origins Core với switch cơ học, thiết kế TKL, và RGB lighting.",
    specs: {
      switches: "HyperX Red Mechanical",
      layout: "TKL (87 keys)",
      lighting: "RGB",
      connectivity: "USB-C",
      features: "Aircraft-grade Aluminum Frame"
    },
    colors: ["Black"],
    images: [
      "https://via.placeholder.com/600x600/FF0000/FFFFFF?text=HyperX+Alloy+Origins+Core+1",
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=HyperX+Alloy+Origins+Core+2"
    ]
  },
  {
    id: 36,
    name: "iPhone 13",
    price: 18990000,
    image: "https://via.placeholder.com/300x300/007AFF/FFFFFF?text=iPhone+13",
    category: "iPhone",
    rating: 4.6,
    discount: 15,
    description: "iPhone 13 với chip A15 Bionic, camera kép, và thời lượng pin dài.",
    specs: {
      screen: "6.1 inch Super Retina XDR",
      processor: "A15 Bionic chip",
      camera: "12MP Dual Camera",
      storage: "128GB",
      battery: "3240mAh",
      os: "iOS 15"
    },
    colors: ["Pink", "Blue", "Midnight", "Starlight", "Red"],
    images: [
      "https://via.placeholder.com/600x600/007AFF/FFFFFF?text=iPhone+13+1",
      "https://via.placeholder.com/600x600/FF69B4/FFFFFF?text=iPhone+13+2"
    ]
  },
  {
    id: 37,
    name: "Samsung Galaxy A54",
    price: 8990000,
    image: "https://via.placeholder.com/300x300/1428A0/FFFFFF?text=Samsung+Galaxy+A54",
    category: "Samsung",
    rating: 4.4,
    discount: 20,
    description: "Samsung Galaxy A54 với camera 50MP, màn hình 6.4 inch, và pin 5000mAh.",
    specs: {
      screen: "6.4 inch Super AMOLED",
      processor: "Exynos 1380",
      camera: "50MP Main + 12MP Ultra Wide + 5MP Macro",
      storage: "128GB",
      battery: "5000mAh",
      os: "Android 13, One UI 5.1"
    },
    colors: ["Awesome Black", "Awesome White", "Awesome Purple", "Awesome Green"],
    images: [
      "https://via.placeholder.com/600x600/1428A0/FFFFFF?text=Samsung+Galaxy+A54+1",
      "https://via.placeholder.com/600x600/FFFFFF/000000?text=Samsung+Galaxy+A54+2"
    ]
  },
  {
    id: 38,
    name: "MacBook Pro 13 M2",
    price: 32990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=MacBook+Pro+13+M2",
    category: "MacBook",
    rating: 4.8,
    discount: 8,
    description: "MacBook Pro 13 M2 với chip Apple M2, Touch Bar, và hiệu suất cao.",
    specs: {
      screen: "13.3 inch Retina",
      processor: "Apple M2 chip",
      memory: "8GB Unified Memory",
      storage: "256GB SSD",
      battery: "Up to 20 hours",
      os: "macOS Ventura"
    },
    colors: ["Space Gray", "Silver"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=MacBook+Pro+13+M2+1",
      "https://via.placeholder.com/600x600/808080/FFFFFF?text=MacBook+Pro+13+M2+2"
    ]
  },
  {
    id: 39,
    name: "iPad 10th Gen",
    price: 11990000,
    image: "https://via.placeholder.com/300x300/007AFF/FFFFFF?text=iPad+10th+Gen",
    category: "Máy tính bảng",
    rating: 4.5,
    discount: 12,
    description: "iPad 10th Gen với chip A14 Bionic, màn hình 10.9 inch, và USB-C.",
    specs: {
      screen: "10.9 inch Liquid Retina",
      processor: "A14 Bionic chip",
      storage: "64GB",
      battery: "Up to 10 hours",
      os: "iPadOS 16",
      features: "USB-C, Apple Pencil 1st gen"
    },
    colors: ["Blue", "Pink", "Yellow", "Silver"],
    images: [
      "https://via.placeholder.com/600x600/007AFF/FFFFFF?text=iPad+10th+Gen+1",
      "https://via.placeholder.com/600x600/0000FF/FFFFFF?text=iPad+10th+Gen+2"
    ]
  },
  {
    id: 40,
    name: "Sony WH-1000XM4",
    price: 6990000,
    image: "https://via.placeholder.com/300x300/000000/FFFFFF?text=Sony+WH-1000XM4",
    category: "Tai nghe",
    rating: 4.7,
    discount: 18,
    description: "Sony WH-1000XM4 với noise cancellation hàng đầu và âm thanh chất lượng cao.",
    specs: {
      type: "Over-ear wireless",
      battery: "Up to 30 hours",
      features: "Industry-leading noise cancellation",
      connectivity: "Bluetooth 5.0, NFC",
      weight: "254g"
    },
    colors: ["Black", "Silver"],
    images: [
      "https://via.placeholder.com/600x600/000000/FFFFFF?text=Sony+WH-1000XM4+1",
      "https://via.placeholder.com/600x600/C0C0C0/FFFFFF?text=Sony+WH-1000XM4+2"
    ]
  }
];
