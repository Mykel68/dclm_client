import React from "react";
import Box from "@mui/material/Box";

const Body = () => {
  return (
    <div>
      <Box
        component="section"
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        style={{
          width: "100%",
          height: "90vh",
          backgroundColor: "#f5f5f5",
        }}
      ></Box>
    </div>
  );
};

export default Body;
