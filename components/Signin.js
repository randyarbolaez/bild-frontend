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
  padding-top: 5vh;
  border-top-right-radius: 5%;
  border-bottom-right-radius: 5%;
`;

let Title = styled.h2`
  text-align: center;
  font-style: italic;
  margin-bottom: 0.6vw;
  font-family: "Montserrat", sans-serif;
  color: #fffff4;
  font-size: 5vw;
  margin-top: 0;
`;

let Input = styled.input`
  margin-bottom: 2vh;
  background-image: linear-gradient(to bottom, #fe5f55, #e4766f);
  border-radius: 0.4vw;
  border: none;
  border: 0.2vw solid #fea7a1;
  font-size: 1.2vw;
  color: #ede8e4;
  outline: none;
  padding: 10px 5px;
  width: 16vw;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    border-color: #cdcdcd;
  }
  ::placeholder {
    color: #ede8e4;
  }
`;

let ButtonDiv = styled.div`
  text-align: left;
  padding-bottom: 4vh;
  padding-top: 2vh;
`;

let InputButton = styled.input`
  background-color: #fffff4;
  cursor: pointer;
  outline: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 2vw;
  border: none;
  font-weight: 600;
  padding: 10px 0;
  width: 12vw;
  color: #e07973;
  transition: 0.9;
  border-top-right-radius: 0.4vw;
  border-bottom-right-radius: 0.4vw;
  :disabled {
    color: #d3d3d3;
    cursor: default;
  }
  :hover {
    transition: 0.9;
    color: #fe5f55;
    :disabled {
      background: #fffff4;
      color: #d3d3d3;
    }
  }
`;

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorTimer, setErrorTimer] = useState();
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

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
                  setErrorEmail(false);
                  setErrorPassword(false);
                  setErrorTimer(false);
                }, 1000);
                if (error.toString().split(":")[2].includes("email")) {
                  setErrorEmail(true);
                } else {
                  setErrorPassword(true);
                }
              }
            }}
          >
            <Fieldset disabled={loading || errorTimer}>
              <Title>Sign In</Title>
              <label htmlFor="email">
                <Input
                  style={{
                    borderColor:
                      error && errorTimer && errorEmail ? "#ff0f0f" : "",
                  }}
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
                    style={{
                      borderColor:
                        error && errorTimer && errorPassword ? "#ff0f0f" : "",
                    }}
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
                  disabled={!password || errorTimer}
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
