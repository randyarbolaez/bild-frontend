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
  font-weight: 600;
  display: flex;
  // justify-content: center;
  background: none;
  width: 50%;
  border: none;
  font-size: 1.3vw;
  color: #fe5f55;
  transition: 0.5s;
  outline: none;
  border-left: 0vw solid #fe5f55;
  transition: border 0.4s ease-in-out;
  :hover {
    border-left: 10vw solid #fe5f55;
    cursor: pointer;
  }
`;

const ButtonSpan = styled.span`
  display: flex;
  background: yellow;
  color: purple;
  font-size: 2vw;
  align-items: center;
  :hover {
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
      // <ButtonSpan
      //   onClick={async (e) => {
      //     e.preventDefault();
      //     try {
      //       await deleteOneComment();
      //     } catch (error) {
      //       console.log("Error[DeleteComment.js]: ", error);
      //     }
      //   }}
      // >
      //   <TiDelete />
      // </ButtonSpan>
    )}
  </Mutation>
);

export default DeleteComment;
