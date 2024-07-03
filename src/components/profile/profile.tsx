"use client";
import { gql, useQuery } from "@apollo/client";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser @client {
      id
      username
      fullname
    }
  }
`;

export default function Profile() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  if (!data || !data.currentUser) return <p>No user data</p>;

  const currentUser = data.currentUser;

  if (loading) return <p>{loading}</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <p>Username: {currentUser.username}</p>
      <p>Fullname: {currentUser.fullname}</p>
    </div>
  );
}
