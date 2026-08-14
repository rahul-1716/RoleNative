import React from "react";
import "../auth.form.scss"
import { Link } from "react-router";
const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Email Address"
            />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="button primary-button">
            Login
          </button>
        </form>
        <p>Don&apos;t have an account? <Link to={"/register"}>Register</Link></p>
      </div>
    </main>
  );
};

export default Login;
