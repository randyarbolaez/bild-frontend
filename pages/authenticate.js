import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Signup from "../components/Signup";
import Signin from "../components/Signin";
import User from "../components/User";
import Nav from "../components/Nav";

let Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

let WrapperAuth = styled.div`
  display: flex;
`;

let WrapperSwitch = styled.div`
  display: flex;
  width: 30vw;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

let Title = styled.h1`
  font-family: "Julius Sans One", sans-serif;
  color: white;
  font-size: 3vw;
  margin-bottom: 0;
`;

let SubTitle = styled.p`
  font-family: "Halant", serif;
  font-size: 1.2vw;
  color: #23395b;
  width: 80%;
  align-self: center;
`;

// let InputButton = styled.input`
//   font-family: "Montserrat", sans-serif;
//   font-weight: bold;
//   width: 30%;
//   margin: 4px 2px;
//   padding: 10px 0;
//   border: none;
//   border-radius: 16px;
//   background: white;
//   border-color: red;
//   color: #8ea8c3;
//   align-self: center;
//   text-decoration: none;
//   font-size: 1.2vw;
//   cursor: pointer;
//   outline: none;
//   // background-image: linear-gradient(to right, #fffff4, #fe5f55);
//   transition: transform 0.5s ease-in-out;
//   :hover {
//     transform: scale(1.2);
//   }
// `;
let InputButton = styled.input`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  width: 30%;
  margin: 4px 2px;
  padding: 10px 0;
  border: none;
  // border-radius: 16px;
  border-bottom: 3px solid #f8f8ff;
  background: transparent;
  // border-color: red;
  color: #8ea8c3;
  align-self: center;
  text-decoration: none;
  font-size: 1.4vw;
  cursor: pointer;
  outline: none;
  transition: transform 0.5s ease-in-out;
  :hover {
    transform: scale(1.2);
  }
`;

export default function authenticate() {
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(true);

  let user = null;

  useEffect(() => {
    if (user) {
      router.push("/", "/");
    }
  }, [user]);

  return (
    <User>
      {({ data, loading }) => {
        if (loading) {
          return null;
        } else {
          user = data.user;
        }
        return (
          <>
            <Nav />
            <Container>
              {!user ? (
                <WrapperAuth>
                  {isSignUp ? (
                    <Signup />
                  ) : (
                    <WrapperSwitch
                      style={{
                        backgroundColor: "#fffff4",
                        borderTopLeftRadius: "5%",
                        borderBottomLeftRadius: "5%",
                      }}
                    >
                      <Title style={{ color: "#fe5f55" }}>Sign Up!</Title>
                      <SubTitle style={{ color: "#fe5f55" }}>
                        If you don't have an account please sign up.
                      </SubTitle>
                      <InputButton
                        style={{
                          // backgroundColor: "#fe5f55",
                          color: "#fffff4",
                          color: "#fe5f55",
                          borderColor: "#fe776e",
                        }}
                        onClick={() => setIsSignUp(!isSignUp)}
                        type="button"
                        value="Sign Up"
                      />
                    </WrapperSwitch>
                  )}
                  {!isSignUp ? (
                    <Signin />
                  ) : (
                    <WrapperSwitch
                      style={{
                        backgroundColor: "#fe5f55",
                        borderTopRightRadius: "5%",
                        borderBottomRightRadius: "5%",
                      }}
                    >
                      <Title style={{ color: "#fffff4" }}>Welcome Back!</Title>
                      <SubTitle style={{ color: "#fffff4" }}>
                        If you already have an account please sign in.
                      </SubTitle>
                      <InputButton
                        style={{
                          // backgroundColor: "#fffff4",
                          color: "#fe5f55",
                          color: "#fffff4",
                          borderColor: "#fafaf9",
                        }}
                        onClick={() => setIsSignUp(!isSignUp)}
                        type="button"
                        value="Sign In"
                      />
                    </WrapperSwitch>
                  )}
                </WrapperAuth>
              ) : (
                <Title style={{ color: "#fffff4" }}>Already signed in...</Title>
              )}
            </Container>
          </>
        );
      }}
    </User>
  );
}
