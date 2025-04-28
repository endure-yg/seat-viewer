import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { seats } from "../data/seats";

type Result = {
  congregationName: string;
  date: string;
  seatsFormatted: string[];
};

export const Congregation = () => {
  const [congregationId, setCongregationId] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(() => {
    const filteredSeats = seats.filter(
      (s) => s.congregationId === congregationId
    );
    const results: Result[] = Object.values(
      filteredSeats.reduce((acc, seat) => {
        const key = seat.date;
        if (!acc[key]) {
          acc[key] = {
            congregationName: seat.congregationName,
            date: seat.date,
            sections: {} as Record<string, number[]>,
          };
        }
        if (!acc[key].sections[seat.section]) {
          acc[key].sections[seat.section] = [];
        }
        acc[key].sections[seat.section].push(seat.seat);
        return acc;
      }, {} as Record<string, { congregationName: string; date: string; sections: Record<string, number[]> }>)
    ).map((group) => {
      const seatsFormatted = Object.entries(group.sections).map(
        ([section, seats]) => {
          const sortedSeats = seats.sort((a, b) => a - b);
          const seatRange =
            sortedSeats.length > 1
              ? `${sortedSeats[0]}-${sortedSeats[sortedSeats.length - 1]}`
              : `${sortedSeats[0]}`;
          return `Section ${section}, Seats ${seatRange}`;
        }
      );

      return {
        congregationName: group.congregationName,
        date: group.date,
        seatsFormatted,
      };
    });
    setHasSearched(true);
    setResults(results);
  }, [congregationId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        margin: "1rem",
        flex: 1,
      }}
    >
      <Typography variant="h4">Congregation Lookup</Typography>
      <TextField
        id="congregation-id"
        label="Congregation ID"
        variant="outlined"
        value={congregationId}
        onChange={(e) => setCongregationId(e.target.value)}
      />
      <Button variant="contained" disabled={!congregationId} onClick={search}>
        Search
      </Button>
      {hasSearched ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Divider />
          {results.length ? (
            <>
              <Typography variant="h5">
                {results[0].congregationName}
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="results table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Seats</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((seat) => (
                      <TableRow
                        key={`${seat.date}_${seat.seatsFormatted}`}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {seat.date}
                        </TableCell>
                        <TableCell align="right">
                          {seat.seatsFormatted.map((s) => (
                            <div key={s}>{s}</div>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Typography>No results found.</Typography>
          )}
        </Box>
      ) : null}
    </Box>
  );
};
