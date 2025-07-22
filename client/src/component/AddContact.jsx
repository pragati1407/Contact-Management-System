import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/form.css";
import Validation from "../component/Validation"; // ensure this path is correct
import axios from "axios";
import { toast } from "react-toastify";
import { FaAt, FaPhoneFlip, FaRegAddressCard, FaUserPlus } from "react-icons/fa6";

const AddContact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run front-end validation
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // If any validation error exists, stop
    if (
      validationErrors.name ||
      validationErrors.email ||
      validationErrors.phone ||
      validationErrors.address
    ) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in. Please login again.");
      navigate("/login");
      return;
    }

    try {
      setSubmitting(true);

      const res = await axios.post(
        "http://localhost:3000/contactmsyt/add-contact",
        {
          name: values.name.trim(),
            email: values.email.trim(),
            phone: values.phone.trim(),
            address: values.address.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Correct spelling
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      if (res.data?.success) {
        toast.success("Contact added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Clear form
        setValues({ name: "", email: "", phone: "", address: "" });
        // Navigate back to contacts list (adjust route if different)
        navigate("/dashboard");
      } else {
        toast.error(res.data?.message || "Contact creation failed");
      }
    } catch (err) {
      console.error("Add Contact Error:", err.response?.data || err.message);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit} noValidate>
        <h2 className="form-h2">Create Contact</h2>

        {/* Name */}
        <div className="form-group">
          <FaUserPlus />
          <input
            type="text"
            placeholder="Enter Name"
            className="form-control"
            name="name"
            onChange={handleInput}
            value={values.name}
            autoComplete="off"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <FaAt />
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control"
            name="email"
            onChange={handleInput}
            value={values.email}
            autoComplete="off"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <FaPhoneFlip />
          <input
            type="text"
            placeholder="Enter Phone Number"
            className="form-control"
            name="phone"
            onChange={handleInput}
            value={values.phone}
            autoComplete="off"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        {/* Address */}
        <div className="form-group">
          <FaRegAddressCard />
          <input
            type="text"
            placeholder="Enter Address"
            className="form-control"
            name="address"
            onChange={handleInput}
            value={values.address}
            autoComplete="off"
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <button
          type="submit"
            className="form-btn"
          disabled={submitting}
          style={{ opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddContact;
