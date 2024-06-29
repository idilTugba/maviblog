"use client";
import { gql, useQuery } from "@apollo/client";

const GET_CURRENT_USER = gql`
  query {
    currentUser @client {
      id
      username
      fullname
    }
  }
`;

const Profile = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  const user = data.currentUSer;

  if (loading) return loading;
  if (error) return error;

  return (
    <div>
      <p>{user.username}</p>
      <p>{user.fullname}</p>
    </div>
  );
};

export default Profile;
