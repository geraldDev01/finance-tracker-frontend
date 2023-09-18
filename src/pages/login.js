import { useState } from "react";
import Image from "next/image";
import loginImage from "../assets/images/login.svg";
import Link from "next/link";
import { login } from "../services/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUserReducer } from "../redux/reducers/user";
import { validateForm, loginValidationRules, showToast } from "../utils";
import { Input } from "@/components/Input";

export default function Login() {
  const initialState = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm(data, loginValidationRules);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const response = await login(data);

    if (!response.token) {
      setErrors({ server: response.error.response.data.message });
      setData(() => {
        return initialState;
      });
      showToast("Login failed. Please check your credentials", "error");

      return;
    }
    dispatch(setUserReducer(response.user));
    router.push("/profile");
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: undefined,
    });
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
        <h1 className="text-large primary-color">LOGIN</h1>
        <p className="text-lead">
          <i className="fas fa-user"></i>
          Sign into your account
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <Input
              name="email"
              onChange={handleChange}
              type="text"
              label="Email address"
              value={data.email}
            />
            {errors.email && <div className="danger-color">{errors.email}</div>}
          </div>
          <div className="form-group">
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              label="password"
              value={data.password}
            />
            {errors.password && (
              <div className="danger-color">{errors.password}</div>
            )}
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
