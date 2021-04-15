import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import styled from "styled-components";

import { CURRENT_USER_QUERY } from "./User";

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      password
    }
  }
`;

let Fieldset = styled.fieldset`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  border: none;
  padding: 0;
  width: 30vw;
  background: #fe5f55;
  margin: 0;
  padding: 5vh 0;
  border-top-right-radius: 5%;
  border-bottom-right-radius: 5%;
`;

let ErrorText = styled.p`
  color: #fffff4;
  font-size: 1.4vw;
`;

let Title = styled.h2`
  text-align: center;
  font-style: italic;
  font-variant: small-caps;
  margin-bottom: 0.6vw;
  font-family: "Montserrat", sans-serif;
  color: #fffff4;
  font-size: 5vw;
  margin-top: 0;
`;

let Input = styled.input`
  margin-bottom: 1vw;
  background: #fffff4;
  border-radius: 20px;
  text-align: center;
  border: none;
  font-size: 2vw;
  color: #fe5f55;
  outline: none;
  padding: 10px 5px;
  ::placeholder {
    color: #fe5f55;
  }
`;

let ButtonDiv = styled.div`
  text-align: center;
`;

let InputButton = styled.input`
  cursor: pointer;
  outline: none;
  font-family: "Montserrat", sans-serif;
  background-color: transparent;
  color: #fffff4;
  font-weight: bold;
  font-size: 2.3vw;
  font-variant: small-caps;
  border: none;
  padding: 10px 0;
  width: 12vw;
  :disabled {
    color: #d3d3d3;
    cursor: default;
  }
  :hover {
    background-color: #fffff4;
    color: #fe5f55;
    border-radius: 16px;
    :disabled {
      background: none;
      color: #d3d3d3;
    }
  }
`;

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorTimer, setErrorTimer] = useState();

  const emailRegex = /\S+@\S+\.\S+/;

  const router = useRouter();

  return (
    <Mutation
      mutation={SIGN_IN_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      variables={{ email, password }}
    >
      {(signin, { error, loading }) => {
        return (
          <form
            action="post"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await signin();
                setEmail("");
                setPassword("");
                router.push("/", "/");
              } catch (error) {
                console.log("Error[Signin.js]: ", error);
                setErrorTimer(true);
                setTimeout(() => {
                  setErrorTimer(false);
                }, 1000);
              }
            }}
          >
            <Fieldset disabled={loading}>
              {error && errorTimer && (
                <ErrorText>{error.toString().split(":")[2]}</ErrorText>
              )}
              <Title>Sign In</Title>
              <label htmlFor="email">
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
              {emailRegex.test(email) && (
                <label htmlFor="password">
                  <Input
                    required
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </label>
              )}
              <ButtonDiv>
                <InputButton
                  disabled={!password}
                  type="submit"
                  value="Sign In"
                />
              </ButtonDiv>
            </Fieldset>
          </form>
        );
      }}
    </Mutation>
  );
};

export default Signin;
