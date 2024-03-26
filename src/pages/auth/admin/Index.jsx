import React, { useState, useEffect } from "react";
import axios from "axios";
import Bar from "../../../components/Bar";
import { Stack } from "@mui/material";
import Card from "../../../components/Card";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import useUserToken from "../../../hooks/useUserToken";

const Index = () => {
  const { userSection } = useUserToken();
  const [reportCount, setReportCount] = useState(0);

  useEffect(() => {
    if (userSection) {
      fetchReportCount(userSection);
    }
  }, [userSection]);

  const fetchReportCount = async (section) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/getReportCount/${section}`
      );
      const data = response.data;

      setReportCount(data.reportCount);
    } catch (error) {
      console.error("Error fetching report count:", error);
    }
  };

  return (
    <div>
      <Bar />
      <div
        component="section"
        display="flex"
        gap={4}
        p={2}
        style={{
          width: "100%",
          height: "90vh",
          backgroundColor: "#f5f5f5",
          padding: "100px",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Card
            icon={<TextSnippetIcon color="primary" style={{ fontSize: 150 }} />}
            item={"Report"}
            quantity={reportCount}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Index;
