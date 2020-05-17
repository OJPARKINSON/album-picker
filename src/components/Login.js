import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const LINK = gql`
{
    getLink
    getUser {
        id
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

const Login = () => {
    const { loading, error, data } = useQuery(LINK);
    const [Logout] = useMutation(LOGOUT_MUTATION);
    console.log({ loading, error, data })
    if (loading) return <div>Loading</div>;
    return data?.getUser.id === null ? 
        <a href={data?.getLink}>Login</a> : <button onClick={() => Logout()}>Logout</button>
}

export default Login