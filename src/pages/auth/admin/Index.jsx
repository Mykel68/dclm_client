import React, { useEffect, useState } from "react";
import Bar from "../../../components/Bar";
import Container from "@mui/material/Container";
import Card from "../../../components/Card";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Stack from "@mui/material/Stack";
const Index = () => {
  const [reportCount, setReportCount] = useState(0);
  useEffect(() => {
    fetchReportCount();
  }, []);

  const fetchReportCount = async () => {
    try {
      const response = await fetch("/api/getReportCount");
      const data = await response.json();

      console.log(data);

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
