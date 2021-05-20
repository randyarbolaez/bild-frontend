import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { RiDeleteBin2Line } from "react-icons/ri";

import { ALL_POSTS_QUERY } from "./Posts";

const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($id: String!) {
    deleteOnePost(where: { id: $id }) {
      id
    }
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 2vmax;
`;

const Span = styled.span`
  color: #2b2d42;
  :hover {
    color: #fe5f55;
    transition: 0.5s;
    cursor: pointer;
  }
`;

const DeletePost = ({ postId }) => {
  return (
    <Mutation
      mutation={DELETE_POST_MUTATION}
      variables={{ id: postId }}
      refetchQueries={[{ query: ALL_POSTS_QUERY }]}
    >
      {(deleteOnePost, { loading, error }) => (
        <Span>
          <RiDeleteBin2Line
            size={15}
            onClick={async (e) => {
              e.preventDefault();
              try {
                console.log("hello");
                await deleteOnePost();
              } catch (error) {
                console.log("Error[DeletePost.js]: ", error);
              }
            }}
          />
        </Span>
      )}
    </Mutation>
  );
};

export default DeletePost;
