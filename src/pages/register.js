import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { register } from "../services/auth";
import registerImage from "../assets/images/register.svg";
import { useRouter } from "next/router";


export default function Login() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await register(data);

    if (!response.token) {
      return setError(response.error.response.data.message);
    }
    router.push("/profile");
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
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
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
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
