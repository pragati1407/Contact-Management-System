import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/form.css";
import Validation from '../src/component/Validation';
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
      try {
        const res = await axios.post("http://localhost:3000/contactmsyt/register", values, {
          headers: { "Content-Type": "application/json" }
        });

        if (res.status === 201) {
          toast.success("Account created successfully!", {
            position: "top-right",
            autoClose: 3000
          });
          setValues({ name: "", email: "", password: "" });
          navigate("/login");
        } else {
          toast.error(res.data?.message || "Registration failed");
        }
      } catch (err) {
        console.error("Register Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            placeholder="Enter Name"
            className="form-control"
            name="name"
            onChange={handleInput}
            value={values.name}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control"
            name="email"
            onChange={handleInput}
            value={values.email}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="form-control"
            name="password"
            onChange={handleInput}
            value={values.password}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" className="form-btn">Register</button>
        <p>Already Registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
