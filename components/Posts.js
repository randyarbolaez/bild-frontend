import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import IndividualPost from "./IndividualPost";
import Loading from "./Loading";

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

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

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
          <InfiniteScroll
            dataLength={posts.length}
            style={styles.container}
            loader={<Loading />}
          >
            {posts &&
              posts.map((post) => <IndividualPost key={post.id} post={post} />)}
          </InfiniteScroll>
        );
      }}
    </Query>
  );
};

export default Posts;
export { ALL_POSTS_QUERY };
