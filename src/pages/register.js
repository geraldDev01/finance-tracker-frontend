import Link from "next/link";

export default function Login() {
  return (
    <section className="container">
      <h1 className="large primary-text">REGISTER</h1>
      <p className="lead">
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
        Already have an account? <Link className="primary-text" href="/login">Login</Link>
      </p>
    </section>
  );
}
