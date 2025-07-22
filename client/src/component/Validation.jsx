

export default function Validation(values) {
  const errors = {};

  const isEmpty = (val) => !val || !val.trim();

  
  if (values.name !== undefined) {
    if (isEmpty(values.name)) {
      errors.name = "Name is required";
    }
  }

  
  if (values.email !== undefined) {
    if (isEmpty(values.email)) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Email is invalid";
    }
  }


  if (values.password !== undefined) {
    if (isEmpty(values.password)) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  
  if (values.phone !== undefined) {
    if (isEmpty(values.phone)) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9+\-()\s]{6,20}$/.test(values.phone)) {
      errors.phone = "Invalid phone number format";
    }
  }

  if (values.address !== undefined) {
    if (isEmpty(values.address)) {
      errors.address = "Address is required";
    }
  }

  return errors;
}
