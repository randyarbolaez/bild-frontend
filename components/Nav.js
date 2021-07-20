import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { CgBolt } from "react-icons/cg";

import User from "./User";
import Signout from "./Signout";

const ShowNavButton = styled.button`
  background: transparent;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Julius Sans One", sans-serif;
  align-items: center;
  width: 90vw;
  margin: 0 5vw;
`;

const TitleContainer = styled.span`
  position: fixed;
  left: 1vw;
  bottom: 5vh;
  margin: 1% 0;
  zindex: 6;
  transform: rotate(-90deg);
  color: #e58c8a;
  font-size: 2vh;
  font-weight: 600;
  transition: 0.5s;
  :hover {
    color: #fe7471;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1.6vw;
  font-weight: 600;
  color: #fffff4;
  outline: none;
  transition: border 0.4s ease-in-out;
  border-bottom: 3.5px solid transparent;
  :hover {
    border-bottom: 3.5px solid #fa7775;
    cursor: pointer;
  }
`;

const SignoutButton = styled.span`
  position: fixed;
  left: 70px;
  bottom: 20px;
  zindex: 6;
`;

const Username = styled.h1`
  color: #fe7471;
  font-size: 1.6vw;
  position: fixed;
  bottom: 20px;
  left: 0px;
  zindex: 6;
  transform: skewY(-11deg);
  :hover {
    color: red;
    cursor: pointer;
  }
`;
const Nav = () => {
  let user = null;
  let [navInfoShown, setNavInfoShown] = useState(!false);
  let [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ]
    );
  }, [url]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <User>
      {({ data, loading }) => {
        if (loading) {
          null;
        } else {
          user = data.user;
        }
        return (
          <div
            onMouseLeave={() => {
              setNavInfoShown(false);
            }}
          >
            <>
              <ShowNavButton
                style={{
                  position: "fixed",
                  bottom: "2vh",
                  left: "0.5vw",
                  zIndex: 6,
                }}
                onMouseEnter={() => {
                  setNavInfoShown(true);
                }}
              >
                <CgBolt size={"4vh"} color={"#fe5f55"} />
              </ShowNavButton>
            </>
            <Container
              style={{
                position:
                  navInfoShown && url !== "authenticate" ? null : "fixed",
              }}
            >
              {navInfoShown && (
                <>
                  <Link href="/" as={"/"}>
                    <a>
                      <TitleContainer>BILD</TitleContainer>
                    </a>
                  </Link>
                  {!user && (
                    <Link href="/authenticate" as={"/authenticate"}>
                      <a>
                        <Button
                          style={{
                            position: "fixed",
                            bottom: "16%",
                            left: "3%",
                            zIndex: 6,
                          }}
                        >
                          Sign Up/In
                        </Button>
                      </a>
                    </Link>
                  )}
                  {user && (
                    <>
                      <Link
                        href={{
                          pathname: "create",
                        }}
                      >
                        <a>
                          <Button
                            style={{
                              position: "fixed",
                              left: "70%",
                              bottom: "50px",
                            }}
                          >
                            Create Post
                          </Button>
                        </a>
                      </Link>
                      <SignoutButton>
                        <Signout />
                      </SignoutButton>
                      <Link
                        href={{
                          pathname: "user-profile",
                          query: { id: user.id },
                        }}
                        as={{
                          pathname: "user-profile",
                          query: { id: user.id },
                        }}
                      >
                        <a>
                          <Username>{user.name}</Username>
                        </a>
                      </Link>
                    </>
                  )}
                </>
              )}
            </Container>
          </div>
        );
      }}
    </User>
  );
};

export default Nav;
