export interface BusStopDTO {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  regionName: string;
}

export interface BusDTO {
  id: number;
  num: number;
  isReversed: boolean;
  variantId: string;
  destinations?: BusStopDTO[];
  isCardAccepted: boolean;
  totalStops: number;
  startStop?: BusStopDTO | null;
  endStop?: BusStopDTO | null;
}

export interface ResponseForBusStop {
  bus: BusDTO[];
  location: BusStopDTO;
  totalBuses: number;
}

export interface BusStopScrollDTO {
  related_bus: ResponseForBusStop[];
  totalPages: number;
}

export interface PathDTO {
  totalBuses: number;
  totalBusStops: number;
  busSequence: BusDTO[];
}

export interface StoreDTO {
  id: number;
  mmName: string;
  engName: string;
  category: string;
  regionName: string;
  latitude: number;
  longitude: number;
  totalNearestStops?: number;
}

export interface PageInfo {
  pageNumber: number;
  pageSize: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageResponse<T> {
  content: T[];
  pageable: PageInfo;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
