import Link from "next/link";

export default function Index() {
  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="text-xl">Finance Track App</h1>
            <p className="text-lead pb-1">
              We track your spending and provide the ability to record and
              categorize expenses and income
            </p>
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
