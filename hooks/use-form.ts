import { useState } from "react";

export const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);
  const resetValue = () => setValues(initialValues);
  const setPreview = (value: any) => setValues({ ...values, ...value });
  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return {
    values,
    onChange,
    setPreview,
    resetValue,
  };
};