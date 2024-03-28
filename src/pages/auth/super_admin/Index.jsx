import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Stack } from "@mui/material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Bar from "../../../components/Bar";
import Card from "../../../components/Card";
import { jwtDecode } from "jwt-decode";

const Index = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
 
    fetchAdminCount();
    fetchReportCount();
  }, []);

  const fetchAdminCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auth/getAdminCount`
      );
      const data = response.data;

      setAdminCount(data.adminCount);
    } catch (error) {
      console.error("Error fetching admin count:", error);
    }
  };
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
    } else {
      navigate("/login");
    }
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

          {/* {userType === "Super admin" ? (
            <Card
              icon={
                <TextSnippetIcon color="primary" style={{ fontSize: 150 }} />
              }
              item={"Report"}
              quantity={reportCount}
            />
          ) : null} */}
        </Stack>
      </Container>
    </div>
  );
};

export default Index;
