import Image from "next/image";
import loginImage from "../assets/images/login.svg";
import Link from "next/link";

export default function Login() {
  return (
    <section className="waves-container">
      <div className="waves-grid p-2">
        <Image
          className="waves-image"
          priority
          src={loginImage}
          alt="login image"
        />
        <h1 className="text-large primary-color mt-2">LOGIN</h1>
        <p className="text-lead">
          <i className="fas fa-user"></i>
          Sign into your account
        </p>
        <form className="form">
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" />
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
