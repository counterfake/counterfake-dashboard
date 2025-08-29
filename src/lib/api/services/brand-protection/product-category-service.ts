const productCategoriesData = [
  {
    label: "Risky",
    key: "risky",
    id: 1,
  },
  {
    label: "Not Risky",
    key: "not-risky",
    id: 0,
  },
  {
    label: "Brand Decision",
    key: "brand-decision",
    id: 11,
  },
  {
    label: "Second Hand",
    key: "second-hand",
    id: 2,
  },
  {
    label: "On Hold",
    key: "on-hold",
    id: 5,
  },
  {
    label: "Paralel Import",
    key: "paralel-import",
    id: 7,
  },
  {
    label: "Brand Monitor",
    key: "brand-monitor",
    id: 9,
  },
  {
    label: "Third Party",
    key: "third-party",
    id: 12,
  },
] as const;

export class ProductCategoryService {
  private dataMapper = new Map(
    productCategoriesData.map((item) => [item.key, item])
  );

  getByKey(key: (typeof productCategoriesData)[number]["key"]) {
    return this.dataMapper.get(key);
  }

  getById(id: (typeof productCategoriesData)[number]["id"]) {
    return Array.from(this.dataMapper.values()).find((item) => item.id === id);
  }

  getAll() {
    return Array.from(this.dataMapper.values());
  }

  get keys() {
    return Array.from(this.dataMapper.keys());
  }

  get ids() {
    return Array.from(this.dataMapper.values()).map((item) => item.id);
  }

  get labels() {
    return Array.from(this.dataMapper.values()).map((item) => item.label);
  }
}
