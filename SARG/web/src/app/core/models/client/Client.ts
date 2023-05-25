import { DocumentType } from "@models/billing/DocumentType";
import { TaxpayerType } from "@models/billing/TaxpayerType";

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  businessName: string;
  addressName: string;
  addressNumber: number;
  addressFlat: number;
  addressDepartment: string;
  addressLocation: string;
  phoneNumber: string;
  phoneNumberAlt: string;
  documentType: DocumentType;
  documentNumber: string;
  taxpayerType: TaxpayerType;
  slug: string;
  observations: string;
  observationsAlt: string;
  status: string;
}
