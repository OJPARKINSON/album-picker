import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from "react-router-dom";

const LINK = gql`
{
    getLink
  }
`;

const Home = () => {
    const { loading, error, data } = useQuery(LINK);
    if (loading) return <div>Loading</div>;
    if (error) return <p>{error}</p>;

    return (
    <>
        <h1>Welcome to service dashboard</h1>
        {
        data?.getLink ? 
            <a href={data?.getLink}>Login</a> 
            : 
            <Link to="/collection">See your collection</Link>
        }
    </>
    )
}

export default Home