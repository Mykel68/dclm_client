import React, { useState, useEffect } from "react";
import { Link, useAsyncError } from "react-router-dom";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { Box, Paper, Typography, Stack } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Bar from "../../../components/Bar";
import Container from "@mui/material/Container";
import Card from "../../../components/Card";

const Index = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);

  useEffect(() => {
    fetchAdminCount();
  }, []);

  const fetchAdminCount = async () => {
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
  useEffect(() => {
    fetchReportCount();
  }, []);

  const fetchReportCount = async () => {
    try {
      const response = await fetch("/api/getReportCount");
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
        <Stack direction="row" spacing={2}>
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
            icon={<TextSnippetIcon color="primary" style={{ fontSize: 150 }} />}
            item={"Report"}
            quantity={reportCount}
          />
        </Stack>
      </Container>
    </div>
  );
};

export default Index;
