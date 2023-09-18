import Navbar from "@/components/Navbar";
import { Table } from "@/components/Table";

export default function Profile() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-large">Historical transaction </h1>
        <p className="text-lead primary-color">
          Now you can  SEE all your<strong> Historical Transactions</strong>
        </p>
        <section>
          <div className="mt-1">
            <section className="historical-container">
              <Table />
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
