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
    return this.dataMapper.values().find((item) => item.id === id);
  }

  getAll() {
    return this.dataMapper.values().toArray();
  }

  get keys() {
    return this.dataMapper.keys().toArray();
  }

  get ids() {
    return this.dataMapper
      .values()
      .map((item) => item.id)
      .toArray();
  }

  get labels() {
    return this.dataMapper
      .values()
      .map((item) => item.label)
      .toArray();
  }
}
