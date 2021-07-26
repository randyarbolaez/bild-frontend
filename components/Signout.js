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
  font-size: 2.5vh;
  font-weight: 600;
  outline: none;
  transition: color 0.4s ease-in-out;
  color: #fffff4;
  :hover {
    color: #fe7471;
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
