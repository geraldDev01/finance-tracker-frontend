import Image from "next/image";

export default function Profile() {
  return (
    <section className="container">
      <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <Image
            className="round-img my-1"
            href="https://www.011global.com/Account/Slices/user-anonymous.png"
            alt=""
          />
          <h1 className="large">Gerald Solano</h1>
          <p className="lead">user</p>
        </div>

        <section>
          <h2 className="text-primary my-1">Historial</h2>
          <div className="my-1 p-1">
            <ul>
              <li className="badge badge-success">Balance: 500 us</li>
              <li className="badge badge-danger">Date: 19/23/2013</li>
              <li className="badge badge-dark">expense:400</li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}
