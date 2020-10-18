import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { ALL_POSTS_QUERY } from "./Posts";

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: String!) {
    deleteComment(commentId: $id) {
      id
    }
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1vw;
  color: #fe5f55;
  transition: 0.5s;
  outline: none;
  :hover {
    transition: 0.5s;
    font-weight: bold;
    border-left: 0.5vw solid #e9ecef;
    border-right: 0.5vw solid #e9ecef;
    border-top: 0.5vw solid #e9ecef;
    border-bottom: 0.5vw solid #e9ecef;
    border-bottom-left-radius: 15%;
    border-top-right-radius: 15%;
    cursor: pointer;
  }
`;

const DeleteComment = ({ commentId }) => (
  <Mutation
    variables={{ id: commentId }}
    mutation={DELETE_COMMENT_MUTATION}
    refetchQueries={[{ query: ALL_POSTS_QUERY }]}
  >
    {(deleteOneComment, { loading, error }) => (
      <Button
        onClick={async (e) => {
          e.preventDefault();
          try {
            await deleteOneComment();
          } catch (error) {
            console.log("Error[DeleteComment.js]: ", error);
          }
        }}
      >
        Delete
      </Button>
    )}
  </Mutation>
);

export default DeleteComment;
