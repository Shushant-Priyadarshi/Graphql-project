import { gql, useQuery } from "@apollo/client";
import Button from "./common/Button";
import { useEffect } from "react";
import Shimmer from "./common/Shimmer";
import DeleteOrder from "./DeleteOrder";

const AllOrders = () => {
  const GET_USERS_ORDER = gql`
    query getAllOrders {
      getOrders {
        orderId
        orderDetails
        address
        price
        user {
          name
          email
          phone
          password
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_USERS_ORDER);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Shimmer />;
  if (error) return <p>Error : {error.message}</p>;

  const orders = data.getOrders;
  return (
    <div className="m-10 flex flex-wrap justify-center gap-4 ">
      {orders.map((order) => (
        <div className="card bg-neutral text-white w-2/5" key={order.orderId}>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">{order.orderDetails}</h2>

            <div className="card-actions justify-end ">
              <button className="btn btn-primary text-xl">
                {order.address}
              </button>
              <button className="btn btn-primary text-xl">
              ₹{order.price}
              </button>
              <button className="btn btn-primary text-xl text-white">
                - By {order.user.name}
              </button>
              <DeleteOrder orderId={order.orderId} refetch={refetch}/>
           
            </div>
          </div>
        </div>
      ))}
      <Button />
    </div>
  );
};

export default AllOrders;
