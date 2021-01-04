import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { createApolloClient } from "utils/apollo-client";
import { StoreProvider } from "store";

import "normalize.css";
import theme from "theme";

import App from "components/App/App";

// GraphQL HTTP URL
const API_URL = process.env.REACT_APP_GRAPHQL_URL;

// Create a Apollo client
const apolloClient = createApolloClient(API_URL);

render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
