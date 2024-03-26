import React, { useState, useEffect } from "react";
import SimpleInput from "../../../../components/SimpleInput";
import Bar from "../../../../components/Bar";
import Typography from "@mui/material/Typography";
import { Button, Stack, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { jwtDecode } from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    date: null,
    serviceType: null,
    subService: null,
    subServiceDay: null,
    section: "",
    supervisor: null,
    personnelCount: null,
    volunteersCount: null,
    challenges: [],
    solution: null,
    equipmentDetails: null,
    remarks: null,
    location: null,
  });
  const [section, setSection] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setSection(decodedToken.section);
      setFormData((prevFormData) => ({
        ...prevFormData,
        section: decodedToken.section,
      }));
    }
  }, []);

  const handleAddChallenge = () => {
    setFormData({ ...formData, challenges: [...formData.challenges, ""] });
  };

  const handleRemoveChallenge = (index) => {
    const updatedChallenges = [...formData.challenges];
    updatedChallenges.splice(index, 1);
    setFormData({ ...formData, challenges: updatedChallenges });
  };

  const serviceOptions = [
    {
      service: "Monday Bible Study",
    },
    {
      service: "Tuesday Leadership Development Training ",
    },
    {
      service: "Thursday Power Night/ Revival Broadcast",
    },
    {
      service: "Saturday Workers Training",
    },
    {
      service: "Sunday Worship Service ",
    },
    {
      service: "Global Crusade With Kumuyi",
      subService: [
        {
          subServiceName: `Minister's Conference`,
          subServiceDay: ["Day 1", "Day 2", "Day 3"],
        },
        {
          subServiceName: `Crusade`,
          subServiceDay: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
        },
        {
          subServiceName: `Impact`,
          subServiceDay: [],
        },
      ],
    },
  ];

  const handleServiceTypeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: e.target.value,
      subService: null,
      subServiceDay: null,
    }));
  };

  const handleAdditionalOptionChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      subService: e.target.value,
      subServiceDay: null,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubOptionChange = (e) => {
    setFormData(() => ({ ...formData, subServiceDay: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "date",
      "serviceType",
      "section",
      "supervisor",
      "personnelCount",
      "volunteersCount",
      "location",
    ];

    const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

    if (isAnyFieldEmpty) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/submit-report`,
        formData
      );

      if (response.status === 201) {
        toast.success("Report submitted successfully");

        // Reset form data after submission as null
        setFormData({
          date: null,
          serviceType: null,
          subService: null,
          subServiceDay: null,
          section: null,
          supervisor: null,
          personnelCount: null,
          volunteersCount: null,
          challenges: null,
          solution: null,
          equipmentDetails: null,
          remarks: null,
          location: null,
        });
      } else {
        console.error("Error submitting report");
        toast.error("Error submitting report. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
    console.log("The form data", formData);
  };
  return (
    <div>
      <Bar />

      <div
        component="form"
        display="flex"
        gap={4}
        p={2}
        style={{
          width: "100%",
          //   height: "90vh",
          backgroundColor: "#f5f5f5",
          padding: "100px",
        }}
      >
        <Typography
          variant="h4"
          color="initial"
          pb={2}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Admin Report Form
        </Typography>
        <SimpleInput
          label="Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder=""
          type="date"
        />

        <Box sx={{ mb: 2 }} className="form-control bg-transparent">
          <fieldset className="mb-3 form-group">
            <legend>Service Type</legend>
            {serviceOptions.map((e) => {
              return (
                <div key={e.service}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="ServiceType"
                      id="option1"
                      value={e.service}
                      onChange={handleServiceTypeChange}
                      checked={formData.serviceType === e.service}
                    />
                    <label className="form-check-label" htmlFor="option1">
                      {e.service}
                    </label>
                  </div>
                  {e.subService && formData.serviceType === e.service
                    ? e.subService.map((e) => {
                        return (
                          <div
                            className="form-check"
                            style={{ marginLeft: "15px" }}
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="additionalOptions"
                              id="option1"
                              value={e.subServiceName}
                              onChange={handleAdditionalOptionChange}
                              checked={formData.subService === e.subServiceName}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="option1"
                            >
                              {e.subServiceName}
                            </label>
                            {e.subServiceDay &&
                            e.subServiceName === formData.subService
                              ? e.subServiceDay.map((e) => {
                                  return (
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="subsub"
                                        id="option1"
                                        value={e}
                                        onChange={handleSubOptionChange}
                                        checked={formData.subServiceDay === e}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="option1"
                                      >
                                        {e}
                                      </label>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        );
                      })
                    : null}
                </div>
              );
            })}
          </fieldset>
        </Box>

        <SimpleInput
          label="Supervisor on Duty"
          name="supervisor"
          value={formData.supervisor}
          onChange={handleChange}
          placeholder=""
          type="text"
        />
        <SimpleInput
          label="Number of Personnel on Duty"
          name="personnelCount"
          value={formData.personnelCount}
          onChange={handleChange}
          placeholder=""
          type="number"
        />
        <SimpleInput
          label="Number of Volunteers on Duty"
          name="volunteersCount"
          value={formData.volunteersCount}
          onChange={handleChange}
          placeholder=""
          type="number"
        />
        <SimpleInput
          label="Challenges Encountered"
          value={formData.challenges}
          onChange={(value) => setFormData({ ...formData, challenges: value })}
          isArrayInput={true}
        />

        <Box sx={{ mb: 2 }} className="form-control bg-transparent">
          <Typography variant="h6" color="initial">
            Challenges Encountered
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={handleAddChallenge}
            startIcon={<AddCircleIcon />}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            Add Challenges
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleRemoveChallenge}
            startIcon={<DeleteIcon />}
          >
            Remove
          </Button>
        </Box>

        <SimpleInput
          label="Solution Provided"
          name="solution"
          value={formData.solution}
          onChange={handleChange}
          placeholder=""
          type="text"
        />
        <SimpleInput
          label="Any Equipment Failure or Malfunction, Kindly provide Details:"
          name="equipmentDetails"
          value={formData.equipmentDetails}
          onChange={handleChange}
          placeholder=""
          type="text"
        />
        <SimpleInput
          label="Remarks and Recommendations:"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder=""
          type="text"
        />
        <SimpleInput
          label="Location:"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder=""
          type="text"
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            size="large"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </Stack>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReportForm;
