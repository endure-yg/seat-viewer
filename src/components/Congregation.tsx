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
  section: string;
  notes?: string;
  seatsFormatted: string[];
};

export const Congregation = () => {
  const [congregationId, setCongregationId] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(() => {
    const congregationSeating = seats.find(
      (s) => s.congregationId === congregationId
    );
    if (!congregationSeating) {
      setResults([]);
    } else {
      const { seats = [], congregationName, notes } = congregationSeating;
      const formattedSeatData: Result[] = [];

      seats.forEach(({ date, seats }) => {
        // Group by row
        const rowMap = new Map<number, number[]>();
        let section = seats[0]?.section || "";

        seats.forEach(({ row, seat, section: seatSection }) => {
          section = seatSection; // assume same section per seatInfo
          if (row && !rowMap.has(row)) {
            rowMap.set(row, []);
          }
          if (row && seat) rowMap.get(row)!.push(seat);
        });

        const seatsFormatted =
          section === "Open Seating" && seats[0]?.notes
            ? [seats[0].notes]
            : Array.from(rowMap.entries()).map(([row, seatNumbers]) => {
                const sorted = seatNumbers.sort((a, b) => a - b);
                const range = `${sorted[0]}-${sorted[sorted.length - 1]}`;
                return `Row ${row}: Seats ${range}`;
              });

        formattedSeatData.push({
          congregationName,
          date,
          section,
          seatsFormatted,
          notes,
        });
      });
      setResults(formattedSeatData);
    }
    setHasSearched(true);
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
              {results[0].notes !== undefined && (
                <Typography>Note: {results[0].notes}</Typography>
              )}
              <TableContainer component={Paper} sx={{ mb: "3rem" }}>
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
                          <strong>
                            {seat.section !== "Open Seating" ? "Section " : ""}
                            {seat.section}
                          </strong>
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
