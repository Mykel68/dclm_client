import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
export default function Card({ icon, item, quantity }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 250,
          height: 250,
        },
      }}
    >
      <Paper elevation={3} sx={{ textAlign: "center", p: 2 }}>
        {icon}
        <Typography variant="h4" gutterBottom>
          {item}: {quantity}
        </Typography>
      </Paper>
    </Box>
  );
}
