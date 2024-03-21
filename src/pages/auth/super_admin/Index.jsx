import React, { useState } from "react";
import { Link, useAsyncError } from "react-router-dom";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { Box, Paper, Typography, Stack } from "@mui/material";

import Bar from "../../../components/Bar";
import Container from "@mui/material/Container";
import Card from "../../../components/Card";

const Index = () => {
  const [item, setItem] = useState(
    "admin".charAt(0).toUpperCase() + "admin".slice(1)
  );
  const [quantity, setQuantity] = useState(2);

  return (
    <div>
      <Bar />
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
        <Card
          icon={
            <SupervisedUserCircleIcon
              color="primary"
              style={{ fontSize: 150 }}
            />
          }
          item={item}
          quantity={quantity}
        />
      </Container>
    </div>
  );
};

export default Index;
