import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { sectionLayouts } from "../data/sectionLayouts_0_1_2_3_4";
import { SectionInfo } from "../types/SectionInfo";
import { SectionLayout } from "./Assignments";
import { generateColorFromCongId } from "./ColorGenerator";
import { getCongregationIdsInSection } from "./HelperFunctions";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const SectionAssignments = () => {
  const PASSWORD_HASH =
    "cbac75f301ac40be82c4fbb6b1ed3a9950bf785db3f08428599f3050d136fcc5";
  const [sectionNumber, setSectionNumber] = useState("");
  const [result, setResult] = useState<SectionInfo>();
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [congIds, setCongIds] = useState<string[]>([]);
  const seats = useMemo<number[][]>(
    () => [...(result?.seats ?? [])].reverse(),
    [result?.seats]
  );

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const seatColors = useMemo<Record<string, string>>(
    () =>
      Object.fromEntries(
        congIds.map((id) => [id, generateColorFromCongId(id)])
      ),
    [congIds]
  );

  const search = useCallback(() => {
    setHasSearched(true);
    setResult(
      sectionLayouts.find(
        (s) => s.sectionNumber.toLowerCase() === sectionNumber.toLowerCase()
      )
    );
    setCongIds(getCongregationIdsInSection(selectedDate, sectionNumber));
  }, [sectionNumber, selectedDate]);

  async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  const handleLogin = async () => {
    const hash = await hashPassword(password);
    if (hash === PASSWORD_HASH) {
      setAccessGranted(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!accessGranted) {
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
        <Typography variant="h4">Stadium Seating Team Access Only</Typography>

        <Typography variant="h5">Please Enter Password to View Page</Typography>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Submit
        </Button>
      </Box>
    );
  }
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
              seats={seats}
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
