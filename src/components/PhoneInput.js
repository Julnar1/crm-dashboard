// src/components/PhoneInput.js
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomPhoneInput = ({ value, onChange }) => {
  return (
    <PhoneInput
      country={"ae"} // Default country (UAE)
      value={value}
      onChange={onChange}
      inputProps={{
        name: "phone",
        required: true,
        autoFocus: false,
      }}
      inputStyle={{
        width: "100%",
        height: "38px",
        fontSize: "14px",
      }}
      containerStyle={{
        marginBottom: "10px",
      }}
    />
  );
};

export default CustomPhoneInput;
