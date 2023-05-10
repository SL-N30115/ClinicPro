import { useState } from "react";

const useInfoForm = () => {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const resetValue = () => {
    setValues({});
  };

  return { values, handleChange, resetValue };
};

export default useInfoForm;
