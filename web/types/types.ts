export interface ShippingInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export enum SortOption {
  ZA = 'za',
  AZ = 'az',
  LOHI = 'lohi',
  HILO = 'hilo'
}