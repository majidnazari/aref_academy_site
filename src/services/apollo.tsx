import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
    concat,
} from "@apollo/client";
import { getToken } from "../utils/auth";
import { onError } from '@apollo/client/link/error';
import { showError } from "../utils/swlAlert";


const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = getToken();
    if (token) {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
            }
        }));
    }

    return forward(operation);
})

const logoutLink = onError((networkError) => {
    console.log(networkError);
    if (networkError.response?.errors) {
        showError(networkError.response.errors[0].message);
    }
})

const mid = concat(authMiddleware, logoutLink);

const apolloClient = new ApolloClient({
    link: concat(mid, httpLink),
    cache: new InMemoryCache()
});

export default apolloClient;