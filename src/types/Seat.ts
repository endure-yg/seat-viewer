export type SeatLocation = {
  section: string;
  row: number;
  seat: number;
};

export type SeatInfo = {
  date: string;
  seats: SeatLocation[];
};

export type GroupInfo = {
  congregationId: string;
  congregationName: string;
  seats: SeatInfo[];
};
