import { useQuery, gql } from "@apollo/client";
import Button from "./common/Button";
import Shimmer from "./common/Shimmer";
import { useEffect } from "react";
import { DeleteUser } from "./DeleteUser";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const GET_ALL_USERS = gql`
    query GetUsers {
      getUsers {
        userId
        name
        phone
        password
        email
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Shimmer />;
  if (error) return <p>Error : {error.message}</p>;
  const users = data.getUsers;

  return (
    <div className="m-10 flex flex-wrap justify-center gap-4  ">
      {users.map((userData) => (
        <div className="card bg-neutral text-white w-2/5 " key={userData.userId}>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">{userData.name}</h2>

            <div className="card-actions justify-end ">
            
            
              <DeleteUser userId ={userData.userId} refetch={refetch}/>
              <button className="btn btn-primary text-xl">
                <Link to={`/createOrder/${userData.userId}`} >Make Orders</Link>
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* <button onClick={() => refetch()} className="btn btn-primary absolute top-20 left-2 text-lg">Refresh</button> */}
      <Button />
    </div>
  );
};

export default AllUsers;
