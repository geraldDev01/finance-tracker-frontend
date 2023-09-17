import Navbar from "@/components/Navbar";
import { Table } from "@/components/Table";

export default function Profile() {
  return (
    <div>
      <Navbar />
      <section>
        <div className="mt-1">
          <section className="historical-container">
            <div className="flex flex-items-center">
              <h2 className="text-primary mx-1">Historical transaction</h2>
            </div>
            <Table />
          </section>
        </div>
      </section>
    </div>
  );
}
