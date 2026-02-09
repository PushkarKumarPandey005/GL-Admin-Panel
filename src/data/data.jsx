export const topSellingProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    image: "https://www.boat-lifestyle.com/cdn/shop/files/Scene_05_Purple_800x.png?v=1717817883",
    sold: 320,
    revenue: 58000,
    percentage: 80,
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "https://m.media-amazon.com/images/I/41KFr6GknZL._SY300_SX300_QL70_FMwebp_.jpg",
    sold: 250,
    revenue: 42000,
    percentage: 65,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    image: "https://m.media-amazon.com/images/I/41b77upnZFL._SY300_SX300_QL70_FMwebp_.jpg",
    sold: 180,
    revenue: 35000,
    percentage: 50,
  },
  {
    id: 4,
    name: "Power Bank",
    image: "https://m.media-amazon.com/images/I/31zZ9rvwGoL._SY300_SX300_QL70_FMwebp_.jpg",
    sold: 150,
    revenue: 21000,
    percentage: 45,
  },
];




export const lowStockItems = [
  {
    id: 1,
    name: "Basmati Rice 5KG",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSe1nQPzlwU1rAb15AfuQE0-MTLXO0Z7aZWJHRswd9wRXweUOcEeVXDNr88tnQhR54Hfp-6nQUgZ1_un7Xx8tzoKw3J69gzWnjRX7rDPNq4RKKLdvaMb1JL",
    category: "Grocery",
    stock: 4,
    totalStock: 20,
    status: "Low Stock"
  },
  {
    id: 2,
    name: "Men's Cotton T-Shirt",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTxa_ZKMBmigvDX7xueZFREh3dtyPw797O63evESAPwV0QFABtYjCeFAYDXLN0r-qDSLkASkQkJtowP5Ao5bzcKTJ5yln8TtxB6F01kefxT0X1JrBbVJaRotw",
    category: "Fashion",
    stock: 6,
    totalStock: 25,
    status: "Low Stock"
  },
  {
    id: 3,
    name: "Electric Kettle 1.5L",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTxXukTjL5UVMEVS1q3ciyRFaX5Qwmtegm37mN0SuFdDtvF4_LtyD5g53BLYKVMuPCYP9A2NTlU-4dlw1h2_CXReg77OT-fi01n-597um5PUpxzoWLIuIW63g",
    category: "Home Appliances",
    stock: 2,
    totalStock: 10,
    status: "Critical"
  },
  {
    id: 4,
    name: "Face Moisturizer 200ml",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTwQL1SPNfDeRzb318L9IWyvVU29lUfE6JUmCegAdxPCgbvod3V6lOCrNeC6ZJlDLKGo6uc9FAnaxb_bjJzQdBnwr0X6N7o-LHWzT_geSNxzms0m4kjYgnWdw",
    category: "Beauty & Personal Care",
    stock: 5,
    totalStock: 30,
    status: "Low Stock"
  },
  {
    id: 5,
    name: "Wooden Study Table",
    image: "data:image/jpeg;base64,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",
    category: "Furniture",
    stock: 1,
    totalStock: 5,
    status: "Critical"
  },
  {
    id: 6,
    name: "Kids Remote Control Car",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTh9vJkK-6Uyz4FSOiR_HwJYtbwkXhUKibOcJUrb94JVnRkslYHWrbI5WmD0i_4yb2Ghnklhw3le8CvQCLTk5l7V6QqU743_fJza8JO0_0k115oer-h_4TdVLw",
    category: "Toys",
    stock: 9,
    totalStock: 20,
    status: "Low Stock"
  },
  {
    id: 7,
    name: "Stainless Steel Water Bottle 1L",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQdkEfpKWOka8N3s2aJq2a73jJsD6KxXnQlLLL4jQK5NgPaHY-7bzTYTUYMd50Okyl9gL_1Zkbynd-aVBDvMWP6GWpVsJkQrI80MYreofY",
    category: "Kitchenware",
    stock: 3,
    totalStock: 15,
    status: "Critical"
  },
  {
    id: 8,
    name: "Yoga Mat Anti-Slip",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRHByipg8PgMOq4jALEkOYYLdPx6UtL07INDSKjPtMiFmeqae4k1tcRGOKunNCK6aukb31F25f1zp9LKwePkxFkRZ7oE7gXTVJzCsbed79lNwMSMYPTalyo",
    category: "Fitness",
    stock: 6,
    totalStock: 25,
    status: "Low Stock"
  },
  {
    id: 9,
    name: "Organic Green Tea Pack",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ6c0sgkbEkj-t3at3qVEEzkyH9eMYC2QshzhqS4pAi-7sf8sXgBZ-hLIkPXeWjVP1EUP2IXpRODDzjHTesBOlbMawqyE1QEZmM0huuog2UzQiXxiwS68r1XQ",
    category: "Beverages",
    stock: 7,
    totalStock: 20,
    status: "Low Stock"
  },
  {
    id: 10,
    name: "LED Desk Lamp",
    image: "https://m.media-amazon.com/images/I/41r9TOs1D5L._SX342_SY445_QL70_FMwebp_.jpg",
    category: "Home Decor",
    stock: 2,
    totalStock: 12,
    status: "Critical"
  },

  
];
