import React, { useState } from 'react';
import Image from '../assets/logoo.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    serviceType: '',
    subService: '',
    subServiceDay: '',
    section: '',
    supervisor: '',
    personnelCount: '0',
    volunteersCount: '0',
    challenges: '',
    solution: '',
    equipmentDetails: '',
    remarks: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [serviceType, setServiceType] = useState('');
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [subOptions, setSubOptions] = useState([]);

  const handleServiceTypeChange = (e) => {
    e.preventDefault();
    setServiceType(e.currentTarget.value); // Use e.currentTarget.value instead of e.target.value
    setShowAdditionalOptions(e.currentTarget.value === 'Global Crusade With Kumuyi');
    setShowSubOptions(false);
  };
  
  const handleAdditionalOptionChange = (e) => {
    setShowSubOptions(true);
    setFormData({ ...formData, additionalOption: e.currentTarget.value }); // Use e.currentTarget.value
    // Set sub-options based on the selected additional option
    if (e.currentTarget.value === 'Minister\'s Conference') {
      setSubOptions(['Day 1', 'Day 2', 'Day 3']);
    } else if (e.currentTarget.value === 'Crusade') {
      setSubOptions(['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6']);
    } else {
      // For other options, reset sub-options
      setShowSubOptions(false);
      setSubOptions([]);
    }
  };
  

  const handleSubOptionChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, subServiceDay: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = ['date', 'section', 'supervisor', 'personnelCount', 'volunteersCount', 'location'];
    const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

    if (isAnyFieldEmpty) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/submit-report', formData);

      if (response.status === 201) {
        toast.success('Report submitted successfully');
        console.log(formData);
        // Reset form data after submission if needed
        setFormData({
          date: '',
          serviceType: '',
          subService: '',
          subServiceDay: '',
          section: '',
          supervisor: '',
          personnelCount: '0',
          volunteersCount: '0',
          challenges: '',
          solution: '',
          equipmentDetails: '',
          remarks: '',
          location: ' ',
        });
      } else {
        console.error('Error submitting report');
        toast.error('Error submitting report. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className='bg'>
      <div className="container p-5 d-flex align-items-center justify-content-center flex-column">
        <div className="banner">
          <img src={Image} alt="" />
        </div>
        <div className="form-container mb-5 p-4">
          <div className="title-container">
            <h2 className='border-bottom border-3 border-dark pb-2 text-start'>DCLM Operational Report</h2>
            <p className='text-start'>Kindly fill all fields with all diligence with accuracy as this feedback will enable us to improve on our operations.</p>
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

            <fieldset className='mb-3 form-group'>
              <legend>Service Type</legend>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="ServiceType" 
                  id="option1" 
                  value='Monday Bible Study' 
                  onChange={handleServiceTypeChange}
                  checked={serviceType === 'Monday Bible Study'}
                />
                <label className="form-check-label" htmlFor="option1">Monday Bible Study</label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="ServiceType" 
                  id="option2" 
                  value="Tuesday Leadership Development Training"
                  onChange={handleServiceTypeChange}
                  checked={serviceType === 'Tuesday Leadership Development Training'}
                  />
                <label className="form-check-label" htmlFor="option2">Tuesday Leadership Development Training
                </label>
              </div>
              <div className="form-check">
                <input  
                  className="form-check-input" 
                  type="radio" 
                  name="ServiceType" 
                  id="option3" 
                  value="Thursday Power Night/ Revival Broadcast" 
                  onChange={handleServiceTypeChange}
                  checked={serviceType === 'Thursday Power Night/ Revival Broadcast'}
                  />
                <label className="form-check-label" htmlFor="option3">Thursday Power Night/ Revival Broadcast</label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="ServiceType" 
                  id="option4" 
                  value="Saturday Workers Training" 
                  onChange={handleServiceTypeChange}
                  checked={serviceType === 'Saturday Workers Training'}
                  />
                <label className="form-check-label" htmlFor="option4">Saturday Workers Training</label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="ServiceType" 
                  id="option5" 
                  value="Sunday strdup Service" 
                  onChange={handleServiceTypeChange}
                  checked={serviceType === 'Sunday strdup Service'}
                  />
                <label className="form-check-label" htmlFor="option5">Sunday Worship Service</label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="ServiceType" 
                  id="option6" 
                  value="Global Crusade With Kumuyi"
                  onChange={handleServiceTypeChange}
                  checked={serviceType === 'Global Crusade With Kumuyi'}
                />
                <label className="form-check-label" htmlFor="option6">Global Crusade With Kumuyi</label>
              </div>
              {showAdditionalOptions && (
                <div>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="additionalOptions" 
                      id="additionalOption1" 
                      value="Crusade"
                      onChange={handleAdditionalOptionChange}
                      checked={formData.additionalOption === 'Crusade'}
                    />
                    <label className="form-check-label" htmlFor="additionalOption1">Crusade</label>
                  </div>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="additionalOptions" 
                      id="additionalOption2" 
                      value="Minister's Conference"
                      onChange={handleAdditionalOptionChange}
                      checked={formData.additionalOption === 'Minister\'s Conference'}
                    />
                    <label className="form-check-label" htmlFor="additionalOption2">Minister's Conference</label>
                  </div>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="additionalOptions" 
                      id="additionalOption1" 
                      value="Impact Academy"
                      onChange={handleAdditionalOptionChange}
                      checked={formData.additionalOption === 'Impact Academy'}
                    />
                    <label className="form-check-label" htmlFor="additionalOption1">Impact Academy</label>
                  </div>
                  {showSubOptions && (
                    <div>
                      {subOptions.map((subOption, index) => (
                        <div className="form-check" key={index}>
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="subOptions" 
                            id={`subOption${index + 1}`} 
                            value={subOption}
                            onChange={handleSubOptionChange}
                            checked={formData.subOption === subOption}
                          />
                          <label className="form-check-label" htmlFor={`subOption${index + 1}`}>{subOption}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </fieldset>

            <div className="form-group mb-3">
              <label htmlFor="selectOption">Section</label>
              <select className="form-control" id="section" name="section" value={formData.section} onChange={handleInputChange}>
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
                onChange={handleInputChange}/>
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
                onChange={handleInputChange}/>
            </div>

            <div className="form-group mb-3">
            <label htmlFor="challenges">Challenges Encountered: </label>
            <p>Explain in details</p>
            <textarea
              className="form-control"
              name="challenges"
              id="challenges"
              rows="4" // You can adjust the number of rows as needed
              style={{ resize: 'none' }}
              placeholder=""
              value={formData.challenges}
              onChange={handleInputChange}
            />
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
                onChange={handleInputChange}/>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="">Any Equipment Failure or Malfunction, Kindly provide Details:</label>
              <input 
                type="text"
                className="form-control" 
                name="equipmentDetails" 
                id="" 
                aria-describedby="helpId" 
                placeholder=""
                value={formData.equipmentDetails}
                onChange={handleInputChange}/>
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
                onChange={handleInputChange}/>
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
                onChange={handleInputChange}/>
            </div>

            <div className="btn-container d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-primary ">Submit</button>

              <ToastContainer/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportForm;