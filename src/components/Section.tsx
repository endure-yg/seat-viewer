import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { sectionLayouts } from "../data/sectionLayouts_0_1_2_3_4_5";
import { SectionInfo } from "../types/SectionInfo";
import { SectionLayout } from "./SectionLayout";
import { Link } from "@mui/material";

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
      <Typography>
        <strong>Important note: </strong>This visual may not display some seat 
        locations accurately because of variations in seat numbering or section layout. 
        Please use{" "}
        <Link href="https://3ddigitalvenue.com/3dmap/clients/saints/">
          this website
        </Link>{" "}
        for an accurate depiction of seat locations. Sections that start with
        "F" are on the floor and not in the linked website.
      </Typography>
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
