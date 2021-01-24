import { Spacing } from "components/Layout";
import { Loading } from "components/Loading";
import { OutsideA, H3 } from "components/Text";
import { HEADER_HEIGHT, USER_SUGGESTIONS_WIDTH } from "constants/Layout";
import PropTypes from "prop-types";
import React from "react";
import { useQuery } from "react-query";
import { matchPath } from "react-router";
import * as Routes from "routes";
import styled from "styled-components";

const Root = styled.div`
  display: none;
  background-color: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.border.main};
  position: sticky;
  top: ${HEADER_HEIGHT + 40}px;
  right: 0;
  height: 100%;
  width: ${USER_SUGGESTIONS_WIDTH}px;
  padding: ${(p) => p.theme.spacing.sm};
  border-radius: ${(p) => p.theme.radius.sm};

  @media (min-width: ${(p) => p.theme.screen.md}) {
    display: block;
  }
`;

const List = styled.ul`
  padding: 0;
  padding-top: ${(p) => p.theme.spacing.xs};
`;

const ListItem = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  margin-bottom: ${(p) => p.theme.spacing.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.div`
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) =>
    p.active ? p.theme.colors.primary.main : p.theme.colors.text.primary};
`;

const Description = styled.div`
  color: ${(p) => p.theme.colors.text.hint};
`;

/**
 * Displays user suggestions
 */
const UserNews = ({ pathname }) => {
  const { isLoading, data } = useQuery("news", () =>
    fetch(
      "https://mi0xobmf2m.execute-api.us-east-1.amazonaws.com/prod/news"
    ).then((res) => res.json())
  );

  const hideUserNews = matchPath(pathname, {
    path: [Routes.MESSAGES, Routes.PEOPLE, Routes.EXPLORE, Routes.USER_PROFILE],
  });

  if (hideUserNews) return null;

  if (isLoading) {
    return (
      <Root>
        <Loading />
      </Root>
    );
  }

  if (!data?.length > 0) {
    return null;
  }

  return (
    <Root>
      <H3>News Listings</H3>

      <List>
        {data.map((newsItem) => (
          <ListItem key={newsItem.id}>
            <Spacing left="xs">
              <OutsideA href={newsItem.url} target="blank">
                <Title>{newsItem.title}</Title>
                <Description>{newsItem.des}</Description>
              </OutsideA>
            </Spacing>
          </ListItem>
        ))}
      </List>
    </Root>
  );
};

UserNews.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default UserNews;
