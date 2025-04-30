import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { SectionLayout } from "./SectionLayout";
import { useCallback, useState } from "react";
import { SectionInfo } from "../types/SectionInfo";
import { sectionLayouts } from "../data/sectionLayouts";

export const Section = () => {
  const [sectionNumber, setSectionNumber] = useState("");
  const [result, setResult] = useState<SectionInfo>();
  const [hasSearched, setHasSearched] = useState(false);

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
      <Typography variant="h4">Section Lookup</Typography>
      <TextField
        id="section-number"
        label="Section Number"
        variant="outlined"
        value={sectionNumber}
        onChange={(e) => setSectionNumber(e.target.value)}
      />
      <Button variant="contained" disabled={!sectionNumber} onClick={search}>
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
              minRow={result.minRow}
              minSeat={result.minSeat}
            />
          ) : (
            <Typography>Section not found or section not used.</Typography>
          )}
        </Box>
      ) : null}
    </Box>
  );
};
