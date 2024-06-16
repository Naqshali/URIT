function validations() {
  const validateForm = (obj) => {
    return Object.values(obj).every((value) => value !== null && value !== "");
  };

  const isRequired = (val, msg) => {
    if (!val || (val && val === "")) {
      return msg ? msg : "Required";
    }
    return false;
  };

  return { isRequired, validateForm };
}

export default validations;
