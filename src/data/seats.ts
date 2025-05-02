import { GroupInfo } from "../types/Seat";

export const seats: GroupInfo[] = [
  {
    congregationId: "123456",
    congregationName: "Peace Lutheran",
    seats: [
      {
        date: "Saturday, July 20, 2025",
        seats: [
          { section: "261", row: 1, seat: 1 },
          { section: "261", row: 1, seat: 2 },
          { section: "261", row: 1, seat: 3 },
          { section: "261", row: 1, seat: 4 },
          { section: "261", row: 2, seat: 1 },
          { section: "261", row: 2, seat: 2 },
          { section: "261", row: 2, seat: 3 },
          { section: "261", row: 2, seat: 4 },
        ],
      },
      {
        date: "Sunday, July 21, 2025",
        seats: [
          { section: "247", row: 1, seat: 1 },
          { section: "247", row: 1, seat: 2 },
          { section: "247", row: 1, seat: 3 },
          { section: "247", row: 1, seat: 4 },
          { section: "247", row: 2, seat: 1 },
          { section: "247", row: 2, seat: 2 },
          { section: "247", row: 2, seat: 3 },
          { section: "247", row: 2, seat: 4 },
        ],
      },
    ],
  },
  {
    congregationId: "654321",
    congregationName: "Hope Lutheran",
    seats: [
      {
        date: "Saturday, July 20, 2025",
        seats: [
          { section: "261", row: 3, seat: 5 },
          { section: "261", row: 3, seat: 6 },
          { section: "261", row: 3, seat: 7 },
        ],
      },
    ],
  },
];
