import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Finance Track App</h1>
            <p className="lead">Track your spending</p>
            <div className="buttons">
              <Link href="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link href="/login" className="btn">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
