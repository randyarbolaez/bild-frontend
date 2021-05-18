import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { TiDelete } from "react-icons/ti";

import { ALL_POSTS_QUERY } from "./Posts";

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: String!) {
    deleteComment(commentId: $id) {
      id
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  // margin-left: 20%;
  // margin-right: 20%;
  margin: 1vh 0;
  font-weight: 600;
  display: flex;
  background: none;
  // background: white;
  border: none;
  font-size: 1.3vw;
  color: #ffd6d4;
  outline: none;
  transition: color 0.3s ease-in-out;
  border-top-right-radius: 1vw;
  border-top-left-radius: 1vw;
  :hover {
    cursor: pointer;
    color: #fe5f55;
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
