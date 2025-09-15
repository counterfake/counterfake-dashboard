import { productStatuses } from "../data/product-statuses";
import {
  ProductStatusId,
  ProductStatusKey,
} from "../types/product-status.types";

export class ProductStatusService {
  private statuses = productStatuses;

  getByKey(key: ProductStatusKey) {
    return this.statuses.find((item) => item.key === key);
  }

  getById(id: ProductStatusId) {
    return this.statuses.find((item) => item.id === id);
  }

  getAll() {
    return this.statuses;
  }

  get keys() {
    return this.statuses.map((item) => item.key);
  }

  get ids() {
    return this.statuses.map((item) => item.id);
  }

  get labels() {
    return this.statuses.map((item) => item.label);
  }
}

export const productStatusService = new ProductStatusService();
