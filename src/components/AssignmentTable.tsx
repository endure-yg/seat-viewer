import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { seats } from "../data/seats";

interface Seat {
  section: string;
  row: number;
  seat: number;
}

interface SeatEntry {
  date: string;
  seats: Seat[];
}

interface GroupInfo {
  congregationId: string;
  congregationName: string;
  seats: SeatEntry[];
}

interface Props {
  section: string;
  date: string;
}

export const AssignmentsTable: React.FC<Props> = ({ section, date }) => {
    const filteredData = seats
    .map((group) => {
      const dateEntry = group.seats.find((entry) => entry.date === date);
      if (!dateEntry) return null;
  
      const filteredSeats = dateEntry.seats.filter(
        (seat) => seat.section === section
      );
      if (filteredSeats.length === 0) return null;
  
      const rows: { [row: number]: number[] } = {};
      filteredSeats.forEach((seat) => {
        if (!rows[seat.row]) rows[seat.row] = [];
        rows[seat.row].push(seat.seat);
      });
  
      const formattedRows = Object.entries(rows)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([row, seats]) => {
          const sortedSeats = seats.sort((a, b) => a - b);
          return `Row ${row} Seats ${sortedSeats[0]}-${sortedSeats[sortedSeats.length - 1]}`;
        })
        .join("\n");
  
      return {
        congregationId: group.congregationId,
        idName: `${group.congregationId}: ${group.congregationName}`,
        seatInfo: formattedRows,
      };
    })
    .filter(Boolean)
    .sort((a, b) => Number(a!.congregationId) - Number(b!.congregationId));
  
  if (filteredData.length === 0) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Congregation</strong></TableCell>
            <TableCell><strong>Seat Assignments</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry!.idName}</TableCell>
              <TableCell style={{ whiteSpace: "pre-line" }}>
                {entry!.seatInfo}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssignmentsTable;
