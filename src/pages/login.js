import Link from "next/link";

export default function Login() {
  return (
    <section className="container">
      <h1 className="large primary-text">LOGIN</h1>
      <p className="lead">
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

      <p className="my-1">
        Do not have an account? <Link className="primary-text" href="/signUp">Sign Up</Link>
      </p>
    </section>
  );
}
