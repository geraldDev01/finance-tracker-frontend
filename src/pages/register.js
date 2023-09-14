import Link from "next/link";
import Image from "next/image";
import registerImage from "../assets/images/register.svg";

export default function Login() {
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
        <form className="form">
          <div className="form-group">
            <input name="username" type="text" placeholder="Username" />
          </div>
          <div className="form-group">
            <input name="email" type="email" placeholder="Email Address" />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Password" />
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
