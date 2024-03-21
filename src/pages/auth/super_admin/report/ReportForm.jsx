import React, { useState } from "react";
import Image from "../../../../assets/dlbc.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    date: null,
    serviceType: null,
    subService: null,
    subServiceDay: null,
    section: null,
    supervisor: null,
    personnelCount: null,
    volunteersCount: null,
    challenges: [],
    solution: null,
    equipmentDetails: null,
    remarks: null,
    location: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleAdd = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      challenges: [...prev.challenges, ""],
    }));
  };

  const handleChallengeInputChange = (index, value) => {
    setFormData((prev) => {
      const updatedChallenges = [...prev.challenges];
      updatedChallenges[index] = value;
      return { ...prev, challenges: updatedChallenges };
    });
  };

  const handleRemoveChallenge = (index) => {
    setFormData((prev) => {
      const updatedChallenges = [...prev.challenges];
      updatedChallenges.splice(index, 1);
      return { ...prev, challenges: updatedChallenges };
    });
  };

  const handleSubOptionChange = (e) => {
    setFormData(() => ({ ...formData, subServiceDay: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
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
        console.log(formData);
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
  };

  return (
    <div className="bg">
      <div
        className="container p-5 d-flex align-items-center justify-content-center flex-column"
        id="report_form"
      >
        <div className="banner">
          <img src={Image} alt="" />
        </div>
        <div className="form-container mb-5 p-4">
          <div className="title-container">
            <h2 className="border-bottom border-3 border-dark pb-2 text-start">
              DCLM Operational Report
            </h2>
            <p className="text-start">
              Kindly fill all fields with all diligence with accuracy as this
              feedback will enable us to improve on our operations.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                id="date"
                aria-describedby="emailHelpId"
                placeholder=""
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

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
                                checked={
                                  formData.subService === e.subServiceName
                                }
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

            <div className="form-group mb-3">
              <label htmlFor="selectOption">Section</label>
              <select
                className="form-control"
                id="section"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
              >
                <option value="">Select your section...</option>
                <option value="Zoom and Playback">Zoom and Playback</option>
                <option value="Teleprompting">Teleprompting</option>
                <option value="Video">Video</option>
                <option value="Audio">Audio</option>
                <option value="Streaming">Streaming</option>
                <option value="Uplink">Uplink</option>
                <option value="Graphics">Graphics</option>
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="supervisor">Supervisor on Duty:</label>
              <input
                type="text"
                className="form-control"
                name="supervisor"
                id="supervisor"
                aria-describedby="helpId"
                placeholder=""
                value={formData.supervisor}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="">Number of Personnel on Duty:</label>
              <input
                type="number"
                className="form-control"
                name="personnelCount"
                id=""
                aria-describedby="helpId"
                placeholder=""
                value={formData.personnelCount}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="">Number of Volunteers on Duty:</label>
              <input
                type="number"
                className="form-control"
                name="volunteersCount"
                id=""
                aria-describedby="helpId"
                placeholder=""
                value={formData.volunteersCount}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="challenges">Challenges Encountered: </label>
              {formData.challenges.map((challenge, index) => (
                <div key={index} className="d-flex mb-2">
                  <input
                    className="form-control me-2"
                    name={`challenges-${index}`}
                    id={`challenges-${index}`}
                    type="text"
                    style={{ resize: "none" }}
                    placeholder={`Challenge ${index + 1}`}
                    value={challenge}
                    onChange={(e) =>
                      handleChallengeInputChange(index, e.target.value)
                    }
                  />
                  <IconButton
                    aria-label="RemoveIcon"
                    size="small"
                    className="bg-danger text-white"
                    onClick={() => handleRemoveChallenge(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </div>
              ))}
              <div className="d-flex justify-content-between mb-1">
                <p>Add Challenges</p>
                <IconButton
                  aria-label="AddIcon"
                  size="small"
                  className="bg-success text-white"
                  onClick={handleAdd}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="">Solution Proposed: </label>
              <input
                type="text"
                className="form-control"
                name="solution"
                id=""
                aria-describedby="helpId"
                placeholder=""
                value={formData.solution}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="">
                Any Equipment Failure or Malfunction, Kindly provide Details:
              </label>
              <input
                type="text"
                className="form-control"
                name="equipmentDetails"
                id=""
                aria-describedby="helpId"
                placeholder=""
                value={formData.equipmentDetails}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="">Remarks and Recommendations:</label>
              <input
                type="text"
                className="form-control"
                name="remarks"
                id=""
                aria-describedby="helpId"
                placeholder=""
                value={formData.remarks}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="">Location:</label>
              <input
                type="text"
                className="form-control"
                name="location"
                id=""
                aria-describedby="helpId"
                placeholder=""
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="btn-container d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-primary btn-lg ">
                Submit
              </button>

              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
