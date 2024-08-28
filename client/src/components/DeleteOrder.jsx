import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const DeleteOrder = ({refetch,orderId}) => {

    const DELETE_ORDER = gql`
     mutation DeleteOrderById($orderId: ID!){
    deleteOrder(orderId: $orderId)
  }
    `;

    const [deleteOrder] = useMutation(DELETE_ORDER,{
        onCompleted:()=>{
            refetch()
        }
      });
    
      const handleDelete = () => {
        deleteOrder({ variables: { orderId } });
       
      };
  return (
    <button className="btn btn-error text-white text-xl" onClick={handleDelete} >
    Delete
  </button>
  )
}

export default DeleteOrder