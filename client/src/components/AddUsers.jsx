import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import Button from './common/Button';
import Shimmer from './common/Shimmer';


const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $phone: String!, $password: String!) {
    createUser(name: $name, email: $email, phone: $phone, password: $password) {
      name
      email
      phone
      password
    }
  }
`;

function AddUsers() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      setName("")
      setEmail("")
      setPhone("")
      setPassword("")

    },
    onError: (err) => {
      toast.error(`Failed to add user: ${err.message}`);
    }
  });

  if (loading) return <Shimmer/> ;
  if (error) return <div className='text-center text-3xl font-bold m-12'>{`User Already Present with email : ${email}`}</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUser({ variables: { name, email, phone, password } });
    toast.success("User saved", { duration: 2000 });
  };

  return (
    <div>
      <Toaster />
      <h1 className='text-center text-3xl p-3 text-white'>Add User</h1>
      <form onSubmit={handleSubmit} className='text-center flex flex-col p-4 w-6/12 m-auto mt-20 gap-5'>
        <input className='p-3 text-xl' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className='p-3 text-xl' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className='p-3 text-xl' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        <input className='p-3 text-xl' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit" className='btn btn-primary text-lg'>Create User</button>
      </form>
      <Button />
    </div>
  );
}

export default AddUsers;
