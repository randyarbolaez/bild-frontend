import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ALL_POSTS_QUERY } from "./Posts";

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: String!) {
    deleteComment(commentId: $id) {
      id
    }
  }
`;

const Span = styled.span`
  color: #2b2d42;
  margin-right: 1.2vw;
  :hover {
    color: #fe5f55;
    transition: 0.5s;
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
      <Span>
        <RiDeleteBin2Line
          size={16}
          onClick={async (e) => {
            e.preventDefault();
            try {
              await deleteOneComment();
            } catch (error) {
              console.log("Error[DeleteComment.js]: ", error);
            }
          }}
        />
      </Span>
    )}
  </Mutation>
);

export default DeleteComment;
