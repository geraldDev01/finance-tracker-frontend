import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { register } from "../services/auth";
import registerImage from "../assets/images/register.svg";
import { useRouter } from "next/router";
import { Input } from "@/components/Input";
import { validateForm, RegisterValidationRules, showToast } from "../utils";

export default function Login() {
  const initialState = {
    fullName: "",
    email: "",
    password: "",
  };
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm(data, RegisterValidationRules);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const response = await register(data);

    if (!response.token) {
      setErrors({ server: response.error.response.data.message });
      setData(() => {
        return initialState;
      });
      showToast("Login failed. Please check your credentials", "error");
    }
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
      <div className="waves-grid p-2 ">
        <Image
          className="waves-image"
          priority
          src={registerImage}
          alt="login image"
        />
        <h1 className="text-large primary-color">REGISTER</h1>
        <p className="text-lead">
          <i className="fas fa-user"></i>
          Create Your account
        </p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <div className="form-group">
              <Input
                name="fullName"
                type="text"
                onChange={handleChange}
                label="Full Name"
                value={data.fullName}
              />
              {errors.fullName && (
                <div className="danger-color">{errors.fullName}</div>
              )}
            </div>
          </div>
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
          <input type="submit" value="Register" className="btn btn-primary" />
        </form>

        <p className="my-1">
          Already have an account?{" "}
          <Link className="primary-color" href="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
