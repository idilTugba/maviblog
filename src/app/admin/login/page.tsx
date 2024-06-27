import { useMutation, gql } from "@apollo/client";
import { getClient } from "@/lib/apolloClient";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import Login from "./login";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const data = getClient().query({
    query: gql`
      query GetAllPosts {
        allPosts {
          id
          title
          content
          authorId
          createdAt
          updatedAt
          images
          videos
        }
      }
    `,
  });
  //   const [login] = useMutation(LOGIN_MUTATION);
  //   const { loading, error, data } = useQuery(GET_LOCATIONS);
  //   console.log(data);
  return (
    <ApolloWrapper>
      <Login />
    </ApolloWrapper>
  );
}
