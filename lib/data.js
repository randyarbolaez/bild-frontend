import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import env from "../env";

function createClient({ headers }) {
  return new ApolloClient({
    uri: env.NODE_ENV === "development" ? env.ENDPOINT : env.PROD_ENDPOINT,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: "include",
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
