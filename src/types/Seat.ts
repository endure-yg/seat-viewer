export type SeatLocation = {
  section: string;
  row?: number;
  seat?: number;
  notes?: string;
};

export type SeatInfo = {
  date: string;
  seats: SeatLocation[];
};

export type GroupInfo = {
  congregationId: string;
  congregationName: string;
  seats: SeatInfo[];
  notes?:string;
};
