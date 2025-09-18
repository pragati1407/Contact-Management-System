import React, { useState } from 'react';
import '../assets/css/form.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validate = (vals) => {
    let err = {};
    if (!vals.email) err.email = "Email is required";
    if (!vals.password) err.password = "Password is required";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);

    if (!errs.email && !errs.password) {
      try {
        const res = await axios.post(
          'http://localhost:3000/contactmsyt/login',
          values,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          toast.success('Login successful');
          navigate('/dashboard');
        } else {
          toast.error(res.data.message || 'Invalid email or password');
        }
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          'Invalid login or server error';

        toast.error(msg);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleInput}
            placeholder="Enter email"
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleInput}
            placeholder="********"
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" className="form-btn">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
