import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import IndividualPost from "./IndividualPost";

const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY {
    posts {
      id
      caption
      picture
      createdAt
      comments {
        id
        content
        createdAt
        user {
          id
          name
          profile {
            profilePicture
          }
        }
      }
      user {
        id
        name
        profile {
          profilePicture
        }
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-between;
  flex-grow: 3;
`;

const Posts = () => {
  let posts = null;
  return (
    <Query query={ALL_POSTS_QUERY} fetchPolicy="network-only">
      {({ data, loading, error }) => {
        if (loading) {
          return null;
        } else {
          posts = data.posts;
        }
        return (
          <Container>
            {posts &&
              posts.map((post) => <IndividualPost key={post.id} post={post} />)}
          </Container>
        );
      }}
    </Query>
  );
};

export default Posts;
export { ALL_POSTS_QUERY };
