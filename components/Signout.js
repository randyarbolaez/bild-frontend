import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      name
    }
  }
`;

const Button = styled.input`
  background: none;
  margin-top: 0.3vw;
  border: none;
  font-size: 1.6vw;
  font-weight: 600;
  outline: none;
  transition: border 0.4s ease-in-out;
  border-bottom: 3.5px solid transparent;
  color: #fffff4;
  :hover {
    border-bottom: 3.5px solid #fa7775;
    // color: #9dc5bb;
    cursor: pointer;
  }
`;

const Signout = () => {
  return (
    <Mutation
      mutation={SIGN_OUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signout) => (
        <Button type="button" onClick={signout} value={"Signout"} />
      )}
    </Mutation>
  );
};

export default Signout;
