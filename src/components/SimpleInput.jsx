import React from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { isArray } from "lodash";

const SimpleInput = ({
  type,
  label,
  value,
  onChange,
  isArrayInput,
  ...rest
}) => {
  if (type === "date") {
    return (
      <TextField
        type="date"
        label={label}
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
        autoComplete="off"
        InputLabelProps={{
          shrink: true,
        }}
        {...rest}
        style={{ marginBottom: "10px", background: "transparent" }}
      />
    );
  } else if (type === "number") {
    return (
      <TextField
        type="number"
        label={label}
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
        autoComplete="off"
        {...rest}
        style={{ marginBottom: "10px" }}
      />
    );
  } else if (type === "checkbox") {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={onChange}
            color="primary"
            {...rest}
            style={{ marginBottom: "20px" }}
          />
        }
        label={label}
      />
    );
  } else if (isArrayInput && isArray(value)) {
    // Checking if input is an array
    return (
      <div>
        {value.map((item, index) => (
          <TextField
            key={index}
            type="text"
            label={`${label} ${index + 1}`}
            value={item}
            onChange={(e) => {
              const updatedArray = [...value];
              updatedArray[index] = e.target.value;
              onChange(updatedArray);
            }}
            variant="outlined"
            fullWidth
            {...rest}
            style={{ marginBottom: "10px", background: "transparent" }}
          />
        ))}
      </div>
    );
  } else {
    return (
      <TextField
        type="text"
        label={label}
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
        autoComplete="off"
        {...rest}
        style={{ marginBottom: "10px", background: "transparent" }}
      />
    );
  }
};

export default SimpleInput;
