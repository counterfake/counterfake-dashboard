const productReportStatusData = [
  {
    label: "New",
    key: "NEW",
    id: 0,
  },
  {
    label: "Clustered",
    key: "CLUSTERED",
    id: 1,
  },
  {
    label: "Reported",
    key: "REPORTED",
    id: 2,
  },
  {
    label: "Test Received",
    key: "TEST_RECEIVED",
    id: 3,
  },
  {
    label: "Report Requested",
    key: "REPORT_REQUESTED",
    id: 4,
  },
  {
    label: "Removed",
    key: "REMOVED",
    id: 5,
  },
  {
    label: "Reopened",
    key: "REOPENED",
    id: 6,
  },
  {
    label: "Notified",
    key: "NOTIFIED",
    id: 7,
  },
  {
    label: "Ready",
    key: "READY",
    id: 8,
  },
] as const;

export class ProductReportStatusService {
  private dataMapper = new Map(
    productReportStatusData.map((item) => [item.key, item])
  );

  getByKey(key: (typeof productReportStatusData)[number]["key"]) {
    if (!key) return null;

    return this.dataMapper.get(key);
  }

  getById(id: (typeof productReportStatusData)[number]["id"]) {
    if (!id) return null;

    return this.getAll().find((item) => item.id === id);
  }

  getAll() {
    return Array.from(this.dataMapper.values());
  }

  filterByKeys(
    keys: (typeof productReportStatusData)[number]["key"][],
    operation: "include" | "exclude" = "include"
  ) {
    return this.getAll().filter((item) =>
      operation === "include"
        ? keys.includes(item.key)
        : !keys.includes(item.key)
    );
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
