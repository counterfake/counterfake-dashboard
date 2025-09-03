export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  platform: string;
  seller: string;
  sellerUrl: string;
  status: "risky" | "safe" | "pending" | "under-review";
  reason: string;
  url: string;
  imageUrl: string;
  fakeScore: number; // 0-100, 0 = very authentic, 100 = very fake
  rating: number; // 1-5 star rating
  createdAt: Date;
  updatedAt: Date;
}

export interface Seller {
  id: string;
  name: string;
  brandName: string;
  officialName: string;
  email: string;
  phone: string;
  address: string;
  platforms: string[];
  totalProducts: number;
  activeProducts: number;
  closedProducts: number;
  riskyProducts: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalProducts: number;
  totalPlatforms: number;
  riskyProducts: number;
  riskySellers: number;
  recentActivity: Array<{
    id: string;
    action: string;
    product: string;
    timestamp: Date;
  }>;
  topRiskyPlatforms: Array<{
    platform: string;
    count: number;
  }>;
  closedProductsStats: Array<{
    month: string;
    count: number;
  }>;
  closedSellerStats: Array<{
    month: string;
    count: number;
  }>;
  riskySellerStats: Array<{
    month: string;
    count: number;
  }>;
  riskyProductStats: Array<{
    month: string;
    count: number;
  }>;
  topRiskySellers: Array<{
    name: string;
    riskyCount: number;
    totalProducts: number;
  }>;
  topRiskyClasses: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
}

export const mockBrandProducts: Product[] = [
  {
    id: "1",
    name: "Nike Air Max 90",
    price: 129.99,
    category: "Sneakers",
    platform: "Amazon",
    seller: "SportShoes Ltd",
    status: "risky",
    reason: "Risky Product Image",
    url: "https://example.com/product/1",
    imageUrl:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    fakeScore: 85,
    rating: 2.3,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    sellerUrl: "https://example.com/seller/1",
  },
  {
    id: "2",
    name: "Nike React Infinity Run",
    price: 159.99,
    category: "Running",
    platform: "eBay",
    seller: "RunningWorld",
    status: "safe",
    reason: "Low Seller Rating",
    url: "https://example.com/product/2",
    imageUrl:
      "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400",
    fakeScore: 15,
    rating: 4.2,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
    sellerUrl: "https://example.com/seller/2",
  },
  {
    id: "3",
    name: "Nike Air Force 1",
    price: 89.99,
    category: "Sneakers",
    platform: "Trendyol",
    seller: "Fashion Store TR",
    status: "pending",
    reason: "Low Seller Rating",
    url: "https://example.com/product/3",
    imageUrl:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
    fakeScore: 45,
    rating: 3.1,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
    sellerUrl: "https://example.com/seller/3",
  },
  {
    id: "4",
    name: "Nike Dunk Low",
    price: 110.0,
    category: "Sneakers",
    platform: "Hepsiburada",
    seller: "Official Nike Turkey",
    status: "safe",
    reason: "Brand Usage",
    url: "https://example.com/product/4",
    imageUrl:
      "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=400",
    fakeScore: 8,
    rating: 4.7,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
    sellerUrl: "https://example.com/seller/4",
  },
  {
    id: "5",
    name: "Nike Zoom Pegasus",
    price: 45.0,
    category: "Running",
    platform: "Sahibinden",
    seller: "Individual Seller",
    status: "safe",
    reason: "Listed as used item",
    url: "https://example.com/product/5",
    imageUrl:
      "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400",
    fakeScore: 25,
    rating: 3.8,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
    sellerUrl: "https://example.com/seller/5",
  },
  {
    id: "6",
    name: "Nike Air Jordan 1",
    price: 180.0,
    category: "Basketball",
    platform: "Amazon",
    seller: "Sneaker Paradise",
    status: "safe",
    reason: "Brand Usage",
    url: "https://example.com/product/6",
    imageUrl:
      "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400",
    fakeScore: 55,
    rating: 3.5,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
    sellerUrl: "https://example.com/seller/6",
  },
];

export const mockSellers: Seller[] = [
  {
    id: "1",
    name: "SportShoes Ltd",
    brandName: "SportShoes",
    officialName: "SportShoes Limited Company",
    email: "info@sportshoes.com",
    phone: "+1 234 567 8900",
    address: "123 Sport Street, NY 10001",
    platforms: ["Amazon", "eBay"],
    totalProducts: 156,
    activeProducts: 89,
    closedProducts: 67,
    riskyProducts: 23,
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    name: "RunningWorld",
    brandName: "Running World",
    officialName: "Running World Inc.",
    email: "contact@runningworld.com",
    phone: "+1 234 567 8901",
    address: "456 Runner Ave, CA 90210",
    platforms: ["eBay", "Trendyol"],
    totalProducts: 234,
    activeProducts: 178,
    closedProducts: 56,
    riskyProducts: 5,
    createdAt: new Date("2023-08-20"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    name: "Fashion Store TR",
    brandName: "Fashion Store",
    officialName: "Fashion Store Turkey Ltd.",
    email: "info@fashionstore.com.tr",
    phone: "+90 212 123 4567",
    address: "Levent Mahallesi, İstanbul",
    platforms: ["Trendyol", "Hepsiburada"],
    totalProducts: 89,
    activeProducts: 45,
    closedProducts: 44,
    riskyProducts: 12,
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2024-01-22"),
  },
];

export const mockDashboardStats: DashboardStats = {
  totalProducts: 1247,
  totalPlatforms: 8,
  riskyProducts: 89,
  riskySellers: 15,
  recentActivity: [
    {
      id: "1",
      action: "New risky product detected",
      product: "Nike Air Max 90",
      timestamp: new Date("2024-01-25T10:30:00Z"),
    },
    {
      id: "2",
      action: "Seller marked as risky",
      product: "Multiple products",
      timestamp: new Date("2024-01-25T09:15:00Z"),
    },
    {
      id: "3",
      action: "Product status updated",
      product: "Nike React Infinity Run",
      timestamp: new Date("2024-01-25T08:45:00Z"),
    },
  ],
  topRiskyPlatforms: [
    { platform: "Amazon", count: 34 },
    { platform: "eBay", count: 28 },
    { platform: "Trendyol", count: 15 },
    { platform: "Sahibinden", count: 12 },
  ],
  closedProductsStats: [
    { month: "Mar 2023", count: 45 },
    { month: "Apr 2023", count: 52 },
    { month: "May 2023", count: 38 },
    { month: "Jun 2023", count: 67 },
    { month: "Jul 2023", count: 71 },
    { month: "Aug 2023", count: 59 },
    { month: "Sep 2023", count: 82 },
    { month: "Oct 2023", count: 94 },
    { month: "Nov 2023", count: 103 },
    { month: "Dec 2023", count: 87 },
  ],
  closedSellerStats: [
    { month: "Jun 2023", count: 8 },
    { month: "Jul 2023", count: 12 },
    { month: "Aug 2023", count: 15 },
    { month: "Sep 2023", count: 9 },
    { month: "Oct 2023", count: 18 },
    { month: "Nov 2023", count: 22 },
    { month: "Dec 2023", count: 19 },
    { month: "Jan 2024", count: 14 },
  ],
  riskySellerStats: [
    { month: "Jun 2023", count: 12 },
    { month: "Jul 2023", count: 18 },
    { month: "Aug 2023", count: 25 },
    { month: "Sep 2023", count: 21 },
    { month: "Oct 2023", count: 32 },
    { month: "Nov 2023", count: 28 },
    { month: "Dec 2023", count: 35 },
    { month: "Jan 2024", count: 29 },
  ],
  riskyProductStats: [
    { month: "Jun 2023", count: 78 },
    { month: "Jul 2023", count: 92 },
    { month: "Aug 2023", count: 105 },
    { month: "Sep 2023", count: 87 },
    { month: "Oct 2023", count: 134 },
    { month: "Nov 2023", count: 119 },
    { month: "Dec 2023", count: 142 },
    { month: "Jan 2024", count: 156 },
  ],
  topRiskySellers: [
    { name: "FakeShoes Co", riskyCount: 45, totalProducts: 67 },
    { name: "Counterfeit Store", riskyCount: 38, totalProducts: 52 },
    { name: "Replica World", riskyCount: 32, totalProducts: 89 },
    { name: "Cheap Sneakers", riskyCount: 28, totalProducts: 41 },
    { name: "Fashion Fakes", riskyCount: 24, totalProducts: 78 },
    { name: "Discount Brands", riskyCount: 21, totalProducts: 35 },
    { name: "Quick Sales", riskyCount: 19, totalProducts: 44 },
    { name: "Budget Store", riskyCount: 17, totalProducts: 29 },
    { name: "Fast Fashion", riskyCount: 15, totalProducts: 38 },
    { name: "Outlet Plus", riskyCount: 12, totalProducts: 26 },
  ],
  topRiskyClasses: [
    { category: "Sneakers", count: 156, percentage: 42.3 },
    { category: "Electronics", count: 89, percentage: 24.1 },
    { category: "Clothing", count: 67, percentage: 18.2 },
    { category: "Accessories", count: 34, percentage: 9.2 },
    { category: "Watches", count: 23, percentage: 6.2 },
  ],
};

export function getProductsByStatus(status?: string): Product[] {
  if (!status) return mockBrandProducts;
  return mockBrandProducts.filter((product) => product.status === status);
}

export function getProductsByPlatform(platform?: string): Product[] {
  if (!platform) return mockBrandProducts;
  return mockBrandProducts.filter((product) => product.platform === platform);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return mockBrandProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.url.toLowerCase().includes(lowercaseQuery) ||
      product.seller.toLowerCase().includes(lowercaseQuery)
  );
}
