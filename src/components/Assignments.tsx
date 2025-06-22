import { Box, Divider, Tooltip, Typography } from "@mui/material";
import { findSeatAssignment } from "./HelperFunctions";
import { AssignmentsTable } from "./AssignmentTable";
import { useMemo } from "react";

type SectionLayoutProps = {
  seats: number[][];
  sectionNumber: string;
  date: string;
  minRow: number;
  minSeat: number;
  seatColors: Record<string, string>;
};

// Descriptions for special seat types
const seatTypeLabels: { [key: number]: string } = {
  2: "ADA",
  3: "ADA Retractable",
  4: "Retractable",
  5: "Not Used During Wednesday Worship",
};

export const SectionLayout = ({
  seats,
  sectionNumber,
  date,
  minRow,
  minSeat,
  seatColors,
}: SectionLayoutProps) => {
  const columns = seats[0].length;

  const seatComponents = useMemo(
    () =>
      seats.map((row, rowIndex) => (
        <Box key={rowIndex} display="flex" alignItems="center" gap={1}>
          <Typography width={20}>
            {minRow + seats.length - rowIndex - 1}
          </Typography>

          <Box
            display="grid"
            gridTemplateColumns={`repeat(${columns}, 30px)`}
            gap="8px"
          >
            {row.map((seat, colIndex) => {
              const rowNum = minRow + seats.length - rowIndex - 1;
              const seatNum = colIndex + minSeat;
              const seatNumber = `Row ${rowNum}, Seat ${seatNum}`;
              let tooltipTitle =
                seat > 1
                  ? `${seatNumber} (${seatTypeLabels[seat]})`
                  : seatNumber;

              //const color = seatColors[seatNum];
              const cong = findSeatAssignment(
                date,
                sectionNumber,
                rowNum,
                seatNum
              )[0];
              let color: string;
              let border: string = "";
              if (cong) {
                color = seatColors[cong.congregationId];
                tooltipTitle = `Cong ID: ${cong.congregationId} - ${cong.congregationName} - ${tooltipTitle}`;
                border = `1px solid ${color}`;
              } else {
                color = "trasparent";
                border = "1px solid #757575";
              }

              return seat !== 0 ? (
                <Tooltip title={tooltipTitle} key={seatNumber + "_TT"}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: color || "#9e9e9e", // fallback gray
                      borderRadius: 1,
                      border,
                      "&:hover": {
                        backgroundColor: color || "#757575",
                        cursor: "pointer",
                      },
                    }}
                  />
                </Tooltip>
              ) : (
                <Box key={seatNumber + "_Box"} sx={{ width: 30, height: 30 }} />
              );
            })}
          </Box>
        </Box>
      )),
    [columns, date, minRow, minSeat, seatColors, seats, sectionNumber]
  );

  return (
    <Box display="flex" flexDirection="column" gap={1} sx={{ mb: "3rem" }}>
      <Typography variant="h4">Section {sectionNumber}</Typography>
      {seatComponents}
      <Typography>Row Number</Typography>
      <Typography align="center" variant="h6">
        Front of Section
      </Typography>

      <Divider />
      <AssignmentsTable section={sectionNumber} date={date} />
    </Box>
  );
};
