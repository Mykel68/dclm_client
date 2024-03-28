import React, { useState, useEffect } from "react";
import Axios from "axios";
import Bar from "../../../../components/Bar";
import AdminCard from "../../../../components/AdminCard";
import { Stack } from "@mui/material";

const AllAdmin = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auth/getAllAdmin`
      );
      if (response.status === 200) {
        setAdmins(response.data.admin);
      } else {
        console.error("Error fetching admins. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  return (
    <div>
      <Bar />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: "20px",
          marginTop: "40px",
        }}
      >
        {admins.map((admin, index) => (
          <AdminCard key={index} name={admin.name} userType={admin.userType} />
        ))}
      </Stack>
    </div>
  );
};

export default AllAdmin;
