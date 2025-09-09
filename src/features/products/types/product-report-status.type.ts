import { productReportStatuses } from "../data/product-report-statuses";

export type ProductReportStatus = (typeof productReportStatuses)[number];

export type ProductReportStatusKey = ProductReportStatus["key"];

export type ProductReportStatusId = ProductReportStatus["id"];

export type ProductReportStatusLabel = ProductReportStatus["label"];
