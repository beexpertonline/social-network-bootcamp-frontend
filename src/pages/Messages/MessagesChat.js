import { useApolloClient, useQuery } from "@apollo/client";
import { LoadingDots } from "components/Loading";
import { GET_MESSAGES, UPDATE_MESSAGE_SEEN } from "graphql/messages";
import { GET_AUTH_USER, GET_CONVERSATIONS, GET_USER } from "graphql/user";
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import * as Routes from "routes";
import styled from "styled-components";
import MessagesChatConversation from "./MessagesChatConversation";
import MessagesChatHeading from "./MessagesChatHeading";

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

/**
 * Messages chat wrapper
 */
const MessagesChat = ({ match, authUser }) => {
  const { userId } = match.params;

  const client = useApolloClient();

  const { data, loading } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: userId === Routes.NEW_ID_VALUE,
  });

  const { data: messages, loading: messagesLoading } = useQuery(GET_MESSAGES, {
    variables: { authUserId: authUser.id, userId },
    skip: userId === Routes.NEW_ID_VALUE,
    fetchPolicy: "network-only",
  });

  const updateMessageSeen = useCallback(async () => {
    try {
      await client.mutate({
        mutation: UPDATE_MESSAGE_SEEN,
        variables: {
          input: {
            receiver: authUser.id,
            sender: userId,
          },
        },
        refetchQueries: () => [
          {
            query: GET_CONVERSATIONS,
            variables: { authUserId: authUser.id },
          },
          { query: GET_AUTH_USER },
        ],
      });
    } catch (err) {}
  }, [authUser.id, client, userId]);

  useEffect(() => {
    if (userId !== Routes.NEW_ID_VALUE) {
      updateMessageSeen();
    }
  }, [userId, updateMessageSeen]);

  if (loading || messagesLoading) {
    return (
      <Root>
        <LoadingDots />
      </Root>
    );
  }

  let chatUser = null;
  if (data && data.getUser) {
    chatUser = data.getUser;
  }

  return (
    <Root>
      <MessagesChatHeading match={match} chatUser={chatUser} />

      <MessagesChatConversation
        authUser={authUser}
        messages={messages ? messages.getMessages : []}
        chatUser={chatUser}
        data={messages}
        match={match}
      />
    </Root>
  );
};

MessagesChat.propTypes = {
  match: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
};

export default MessagesChat;
