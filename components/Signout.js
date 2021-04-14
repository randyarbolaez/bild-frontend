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

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1.6vw;
  color: #e9ecef;
  transition: 0.5s;
  outline: none;
  :hover {
    color: #66798c;
    font-size: 2.5vw;
    transition: 0.5s;
    font-weight: bold;
    // border-left: 0.5vw solid #e9ecef;
    // border-right: 0.5vw solid #e9ecef;
    // border-top-right-radius: 25%;
    // border-bottom-left-radius: 25%;
    cursor: pointer;
  }
  :active {
    font-size: 1.6vw;
    color: #e9ecef;
    transition: 0.5s;
  }
`;

const Signout = () => {
  return (
    <Mutation
      mutation={SIGN_OUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signout) => <Button onClick={signout}>Signout</Button>}
    </Mutation>
  );
};

export default Signout;
