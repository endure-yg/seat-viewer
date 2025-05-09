import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useCallback, useState } from "react";
import { sectionLayouts } from "../data/sectionLayouts_0_1_2_3_4";
import { SectionInfo } from "../types/SectionInfo";
import { SectionLayout } from "./Assignments";
import { generateColorFromCongId } from "./ColorGenerator";
import { getCongregationIdsInSection } from "./HelperFunctions"

export const SectionAssignments = () => {
  const [sectionNumber, setSectionNumber] = useState("");
  const [result, setResult] = useState<SectionInfo>();
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const congIds = getCongregationIdsInSection(selectedDate, sectionNumber);

  const seatColors: Record<string, string> = Object.fromEntries(
    congIds.map((id) => [String(id), generateColorFromCongId(String(id))])
  );

  const search = useCallback(() => {
    setHasSearched(true);
    setResult(
      sectionLayouts.find(
        (s) => s.sectionNumber.toLowerCase() === sectionNumber.toLowerCase()
      )
    );
  }, [sectionNumber]);

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
      {/* <div>
        {Object.entries(seatColors).map(([id, color]) => (
          <div
            key={id}
            style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
          >
            <div
              style={{
                backgroundColor: color,
                width: 24,
                height: 24,
                borderRadius: "50%",
                marginRight: 12,
                border: "1px solid #ccc",
              }}
            />
            <span>
              {id} – {color}
            </span>
          </div>
        ))}
      </div> */}
      <Typography variant="h4">Section Assignments</Typography>
      <TextField
        id="section-number"
        label="Section Number"
        variant="outlined"
        value={sectionNumber}
        onChange={(e) => setSectionNumber(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id="day-select-label">Select Day</InputLabel>
        <Select
          labelId="day-select-label"
          value={selectedDate}
          label="Select Day"
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {[
            "Saturday, July 20, 2025",
            "Sunday, July 21, 2025",
            "Monday, July 22, 2025",
            "Tuesday, July 23, 2025",
            "Wednesday, July 24, 2025",
          ].map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        disabled={!sectionNumber || !selectedDate}
        onClick={search}
      >
        Search
      </Button>
      {hasSearched ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider />
          {result ? (
            <SectionLayout
              seats={[...result.seats].reverse()}
              sectionNumber={result.sectionNumber}
              date={selectedDate}
              minRow={result.minRow}
              minSeat={result.minSeat}
              seatColors={seatColors}
            />
          ) : (
            <Typography>Section not found or section not used.</Typography>
          )}
        </Box>
      ) : null}
    </Box>
  );
};
