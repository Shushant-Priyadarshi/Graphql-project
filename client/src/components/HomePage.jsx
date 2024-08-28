import { Link } from "react-router-dom";

const HomePage = () => {
  const links = [
    { name: "Add User", link: "/AddUser" },
    { name: "All Users", link: "/getUsers" },
    { name: "All Orders", link: "/getOrders" },
  ];

  return (
    <>
      <div className="text-5xl mt-16 text-center text-white font-semibold">GraphQL Project</div>
      <div className="flex flex-wrap justify-center gap-4  items-center mt-36">

        {links.map((link) => (
          <Link to={link.link} key={link.name} className="w-2/5 hover:scale-105 duration-300 ">
            <div className="card bg-neutral text-white">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl">{link.name}</h2>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </>
  );
};

export default HomePage;
