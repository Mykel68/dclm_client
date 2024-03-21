import React, { useState, useEffect } from "react";
import { Link, useAsyncError } from "react-router-dom";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { Box, Paper, Typography, Stack } from "@mui/material";

import Bar from "../../../components/Bar";
import Container from "@mui/material/Container";
import Card from "../../../components/Card";

const Index = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const response = await fetch("/api/getAdminCount");
      const data = await response.json();

      console.log(data);

      setAdminCount(data.adminCount);
      setReportCount(data.reportCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
          item={"Admin"}
          quantity={adminCount}
        />
        <Card
          icon={
            <SupervisedUserCircleIcon
              color="primary"
              style={{ fontSize: 150 }}
            />
          }
          item={"Report"}
          quantity={reportCount}
        />
      </Container>
    </div>
  );
};

export default Index;
