import { productStatuses } from "../data/product-statuses";

export type ProductStatus = (typeof productStatuses)[number];

export type ProductStatusName = (typeof productStatuses)[number]["label"];

export type ProductStatusKey = (typeof productStatuses)[number]["key"];

export type ProductStatusId = (typeof productStatuses)[number]["id"];
