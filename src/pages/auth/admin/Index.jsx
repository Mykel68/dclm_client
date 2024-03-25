import React, { useState, useEffect } from "react";
import axios from "axios";
import Bar from "../../../components/Bar";
import Body from "../../../components/Body";
import { Stack } from "@mui/material";
import Card from "../../../components/Card";
// import Home from "../super_admin/Index";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const Index = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);

  useEffect(() => {
    fetchReportCount();
  }, []);

  const fetchReportCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/getReportCount`
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

      <Body>
        {/* <Stack direction="row" spacing={2}> */}
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
        {/* {userType === "Super admin" ? ( */}
        <Card
          icon={<TextSnippetIcon color="primary" style={{ fontSize: 150 }} />}
          item={"Report"}
          quantity={reportCount}
        />
        {/* ) : null} */}
        {/* </Stack> */}
      </Body>
    </div>
  );
};

export default Index;
