import { getAuthUser } from "api/profile";
import { Loading } from "components/Loading";
import Message from "components/Message";
import NotFound from "components/NotFound";
import AuthLayout from "pages/Auth/AuthLayout";
import React from "react";
import { useQuery } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStore } from "store";
import AppLayout from "./AppLayout";
import { GlobalStyle } from "./GlobalStyles";
import ScrollToTop from "./ScrollToTop";

/**
 * Root component of the app
 */
const App = () => {
  const [{ message }] = useStore();

  const { isLoading, data, error, refetch } = useQuery("user", getAuthUser, {
    retry: 0,
  });

  if (isLoading) return <Loading top="xl" />;

  if (error) {
    const isDevelopment =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    if (isDevelopment) {
      console.error(error);
    }
    const devErrorMessage =
      "Sorry, something went wrong. Please open the browser console to view the detailed error message.";
    const prodErrorMessage =
      "Sorry, something went wrong. We're working on getting this fixed as soon as we can.";
    return (
      <NotFound
        message={isDevelopment ? devErrorMessage : prodErrorMessage}
        showHomePageLink={false}
      />
    );
  }

  return (
    <Router>
      <GlobalStyle />

      <ScrollToTop>
        <Switch>
          {data ? (
            <Route exact render={() => <AppLayout authUser={data} />} />
          ) : (
            <Route exact render={() => <AuthLayout refetch={refetch} />} />
          )}
        </Switch>
      </ScrollToTop>

      {message.content.text && (
        <Message
          type={message.content.type}
          autoClose={message.content.autoClose}
        >
          {message.content.text}
        </Message>
      )}
    </Router>
  );
};

export default App;
