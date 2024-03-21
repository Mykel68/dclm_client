import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography, Stack } from "@mui/material";

import Bar from "../../../../components/Bar";

const AdminPage = () => {
  return (
    <div>
      <Bar />
      {/* <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <Typography variant="h3" component="h5">
          Admin Page
        </Typography>

        <Box>
          <Stack>
            <Drawer />
            <span>
              <Link to="/report">Report Page</Link>
            </span>
          </Stack>
        </Box>
      </Box> */}
    </div>
  );
};

export default AdminPage;
