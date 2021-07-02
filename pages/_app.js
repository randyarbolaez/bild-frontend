import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import data from "../lib/data";

const MyApp = ({ Component, pageProps, apollo }) => {
  MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.res.query;
    return { pageProps };
  };
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
};

export default data(MyApp);
