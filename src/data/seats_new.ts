type SeatLocation = {
  section: string;
  row: number;
  seat: number;
};

type GroupInfo = {
  congName: string;
  seats: SeatLocation[];
};

const groupSeating: Record<string, GroupInfo> = {
  123456: {
    congName: "Peace Lutheran",
    seats: [
      { section: "261", row: 1, seat: 1 },
      { section: "261", row: 1, seat: 2 },
      { section: "261", row: 1, seat: 3 },
      { section: "261", row: 1, seat: 4 },
      { section: "261", row: 2, seat: 1 },
      { section: "261", row: 2, seat: 2 },
      { section: "261", row: 2, seat: 3 },
      { section: "261", row: 2, seat: 4 }
    ],
  },
  654321: {
    congName: "Hope Lutheran",
    seats: [
      { section: "261", row: 3, seat: 5 },
      { section: "261", row: 3, seat: 6 },
      { section: "261", row: 3, seat: 7 }
    ],
  },
};
