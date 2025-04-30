import { Box, Tooltip, Typography } from "@mui/material";

type SectionLayoutProps = {
  seats: number[][];
  sectionNumber: string;
  minRow: number;
  minSeat: number;
};

export const SectionLayout = ({
  seats,
  sectionNumber,
  minRow,
  minSeat,
}: SectionLayoutProps) => {
  const columns = seats[0].length; // Get columns from first row

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="h4">Section {sectionNumber}</Typography>
      {seats.map((row, rowIndex) => (
        <Box key={rowIndex} display="flex" alignItems="center" gap={1}>
          {/* Row Label (A, B, C, ...) */}
          <Typography width={20}>
            {minRow + seats.length - rowIndex - 1}
          </Typography>

          {/* Seats in Row */}
          <Box
            display="grid"
            gridTemplateColumns={`repeat(${columns}, 30px)`}
            gap="4px"
          >
            {row.map((seat, colIndex) => {
              const rowNum = minRow + seats.length - rowIndex - 1;
              const seatNum = colIndex + minSeat;
              const seatNumber = `Row ${rowNum}, Seat ${seatNum}`;
              return seat === 1 ? (
                <Tooltip title={`${seatNumber}`} key={colIndex + minSeat}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: "primary.main",
                      borderRadius: 1,
                      "&:hover": {
                        bgcolor: "primary.dark",
                        cursor: "pointer",
                      },
                    }}
                  />
                </Tooltip>
              ) : (
                <Box key={colIndex} sx={{ width: 30, height: 30 }} />
              );
            })}
          </Box>
        </Box>
      ))}
      <Typography>Row Number</Typography>
      <Typography align="center" variant="h6">
        Front of Section
      </Typography>
    </Box>
  );
};
