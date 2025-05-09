import { seats } from "../data/seats";


type SeatRecord = {
    congregationId: string;
    congregationName: string;
    date: string;
  };
  
export function findSeatAssignment(
    date: string,
    section: string,
    row: number,
    seat: number
  ): SeatRecord[] {
    return seats.flatMap((congregation) => {
      return congregation.seats
        .filter((seatGroup) => seatGroup.date === date)
        .flatMap((seatGroup) =>
          seatGroup.seats.some(
            (s) =>
              s.section === section &&
              s.row === row &&
              s.seat === seat
          )
            ? [
                {
                  congregationId: congregation.congregationId,
                  congregationName: congregation.congregationName,
                  date: seatGroup.date,
                },
              ]
            : []
        );
    });
  }

export function getCongregationIdsInSection(
    date: string,
    section: string
  ): string[] {
    const ids = new Set<string>();
  
    seats.forEach((congregation) => {
      const matchingSeatGroup = congregation.seats.find(
        (seatGroup) => seatGroup.date === date
      );
  
      if (matchingSeatGroup) {
        const hasSeatInSection = matchingSeatGroup.seats.some(
          (seat) => seat.section === section
        );
  
        if (hasSeatInSection) {
          ids.add(congregation.congregationId);
        }
      }
    });
  
    return Array.from(ids);
  }
  