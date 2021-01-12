import { ApolloProvider } from "@apollo/client";
import App from "components/App/App";
import "normalize.css";
import React from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { StoreProvider } from "store";
import { ThemeProvider } from "styled-components";
import theme from "theme";
import { createApolloClient } from "utils/apollo-client";

// GraphQL HTTP URL
const API_URL = process.env.REACT_APP_GRAPHQL_URL;

// Create a Apollo client
const apolloClient = createApolloClient(API_URL);

// Create react-query client
const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ThemeProvider>
    </ApolloProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
