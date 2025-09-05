import { productReportStatuses } from "../data/product-report-statuses";
import {
  ProductReportStatusId,
  ProductReportStatusKey,
} from "../types/product-report-status.type";

export class ProductReportStatusService {
  private reportStatuses = productReportStatuses;

  getByKey(key: ProductReportStatusKey) {
    if (!key) return null;

    return this.reportStatuses.find((item) => item.key === key);
  }

  getById(id: ProductReportStatusId) {
    if (!id) return null;

    return this.reportStatuses.find((item) => item.id === id);
  }

  getAll() {
    return this.reportStatuses;
  }

  filterByKeys(
    keys: ProductReportStatusKey[],
    operation: "include" | "exclude" = "include"
  ) {
    return this.getAll().filter((item) =>
      operation === "include"
        ? keys.includes(item.key)
        : !keys.includes(item.key)
    );
  }

  get keys() {
    return this.reportStatuses.map((item) => item.key);
  }

  get ids() {
    return this.reportStatuses.map((item) => item.id);
  }

  get labels() {
    return this.reportStatuses.map((item) => item.label);
  }
}

export const productReportStatusService = new ProductReportStatusService();
