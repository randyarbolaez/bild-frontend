import React from "react";
import styled from "styled-components";

import IndividualComment from "./IndividualComment";
import CreateComment from "./CreateComment";
import User from "./User";

const Container = styled.div`
  margin-top: 15px;
  height: 70vh;
  width: 80vw;
  flex-direction: column;
  overflow-y: auto;
`;

const Comments = ({ comments, post }) => {
  let user = null;
  return (
    <User>
      {({ data, loading }) => {
        if (loading) {
          null;
        } else {
          user = data.user;
        }
        return (
          <Container>
            {comments.map((comment) => (
              <IndividualComment key={comment.id} comment={comment} />
            ))}
            {/* {user && <CreateComment post={post} />} */}
          </Container>
        );
      }}
    </User>
  );
};

export default Comments;
