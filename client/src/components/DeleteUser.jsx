import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
export const DeleteUser = ({ userId,refetch }) => {


const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!){
    deleteUser(userId: $userId)
  }
`;
  const [deleteUser] = useMutation(DELETE_USER,{
    onCompleted:()=>{
        refetch()
    }
  });

  const handleDelete = () => {
    deleteUser({ variables: { userId } });
   
  };

  return (
    <button className="btn btn-error text-white text-xl" onClick={handleDelete}>
      Delete
    </button>
  );
};
