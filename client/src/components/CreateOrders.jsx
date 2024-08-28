import { gql, useMutation } from "@apollo/client";
import Button from "./common/Button";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Shimmer from "./common/Shimmer";
import { useParams } from "react-router-dom";

const CreateOrders = () => {
  const { Id } = useParams();  // Retrieve userId from the URL

  const CREATE_ORDER = gql`
    mutation MakeOrders($userId: ID!, $price: Int!, $orderDetails: String!, $address: String!) {
      createOrder(
        userId: $userId
        orderDetails: $orderDetails
        address: $address
        price: $price
      ) {
        orderDetails
        address
        price
      }
    }
  `;

  const [orderDetails, setorderDetails] = useState("");
  const [price, setPrice] = useState();
  const [address, setaddress] = useState("");

  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER, {
    onCompleted: () => {
      setorderDetails("");
      setaddress("");
      setPrice();
    }
  });

  if (loading) return <Shimmer />;
  if (error) return <div className='text-center text-3xl font-bold m-12'>{`Error: ${error.message}`}</div>;

  const handleOrder = async (e) => {
    e.preventDefault();
    createOrder({ variables: { userId: Id, orderDetails, address, price:parseInt(price, 10) } }); // Pass userId along with other variables
    toast.success("Order saved", { duration: 2000 });
  };

  return (
    <div>
      <Toaster />
      <h1 className='text-center text-3xl p-3 text-white'>Create Order</h1>
      <form onSubmit={handleOrder} className='text-center flex flex-col p-4 w-6/12 m-auto mt-20 gap-5'>
        <input
          className='p-3 text-xl'
          value={orderDetails}
          onChange={(e) => setorderDetails(e.target.value)}
          placeholder="Order Details"
        />
        <input
          className='p-3 text-xl'
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          placeholder="Address"
        />
        <input
          className='p-3 text-xl'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <button type="submit" className='btn btn-primary text-lg'>Create Order</button>
      </form>
      <Button />
    </div>
  );
};

export default CreateOrders;
