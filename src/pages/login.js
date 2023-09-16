import { useState } from "react";
import Image from "next/image";
import loginImage from "../assets/images/login.svg";
import Link from "next/link";
import { login } from "../services/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUserReducer } from "../redux/reducers/user";

export default function Login() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(data);

    if (!response.token) {
      return setError(response.error.response.data.message);
    }
    dispatch(setUserReducer(response.user));
    router.push("/profile");
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const renderErrorAlert = () => {
    if (!error) return null;
    return <div className="alert alert-danger">{error}</div>;
  };

  return (
    <section className="waves-container">
      <div className="waves-grid p-2">
        <Image
          className="waves-image"
          priority
          src={loginImage}
          alt="login image"
        />
        {renderErrorAlert()}
        <h1 className="text-large primary-color mt-2">LOGIN</h1>
        <p className="text-lead">
          <i className="fas fa-user"></i>
          Sign into your account
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>

          <input type="submit" value="Login" className="btn btn-primary" />
        </form>
        <p className="mt-1">
          Do not have an account?{" "}
          <Link className="primary-color" href="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
