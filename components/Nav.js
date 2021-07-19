import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  RiSpaceShipFill,
  RiSpaceShipLine,
  RiLayoutTop2Fill,
  RiLayoutTop2Line,
  RiCamera2Fill,
  RiCamera2Line,
} from "react-icons/ri";

import User from "./User";
import Signout from "./Signout";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Julius Sans One", sans-serif;
  align-items: center;
  width: 90vw;
  margin: 0 5vw;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ShowNavButton = styled.button`
  background: transparent;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

const Username = styled.h1`
  color: #fe7471;
  font-size: 1.6vw;
  :hover {
    color: red;
    cursor: pointer;
  }
`;

const TitleContainer = styled.p`
  position: fixed;
  left: 10px;
  bottom: 70px;
  margin: 1vh 0;
  zindex: 6;
  transform: rotate(-90deg);
  color: #e58c8a;
  // font-size: 1.3em;
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

const Nav = () => {
  let user = null;
  let [navInfoShown, setNavInfoShown] = useState(false);
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
          <>
            <div
              style={{
                position: "fixed",
                bottom: "2%",
                left: "15px",
                zIndex: 6,
              }}
            >
              <ShowNavButton
                onClick={() => {
                  setNavInfoShown(!navInfoShown);
                }}
              >
                {/* {navInfoShown ? (
                  <RiLayoutTop2Line size={"3vw"} color={"#fe5f55"} />
                ) : (
                  <RiLayoutTop2Fill size={"3vw"} color={"#fe5f55"} />
                )} */}
                {navInfoShown ? (
                  <RiSpaceShipLine size={"2.5em"} color={"#fe5f55"} />
                ) : (
                  <RiSpaceShipFill size={"2.5em"} color={"#fe5f55"} />
                )}
              </ShowNavButton>
            </div>
            <Container
              style={{
                position:
                  navInfoShown && url !== "authenticate" ? null : "fixed",
                // height: navInfoShown ? "10vh" : null,
              }}
            >
              {/* {navInfoShown ? (
                <>
                  <Link href="/" as={"/"}>
                    <a style={{ display: "flex", alignItems: "center" }}>
                      <TitleContainer>BILD</TitleContainer>
                    </a>
                  </Link>
                  {!user && (
                    <Link href="/authenticate" as={"/authenticate"}>
                      <a>
                        <Button>Sign Up/In</Button>
                      </a>
                    </Link>
                  )}
                  {user && (
                    <Wrapper>
                      <Link
                        href={{
                          pathname: "create",
                        }}
                      >
                        <a>
                          <Button>Create Post</Button>
                        </a>
                      </Link>
                      <Signout />
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
                    </Wrapper>
                  )}
                </>
              ) : null} */}
              {navInfoShown && (
                <>
                  <Link href="/" as={"/"}>
                    <a
                      style={{
                        position: "fixed",
                        left: "10px",
                        bottom: "70px",
                        margin: "1vh 0",
                        zindex: "6",
                      }}
                    >
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
                    <Wrapper>
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
                      <span
                        style={{
                          position: "fixed",
                          left: "70px",
                          bottom: "20px",
                          zIndex: 6,
                        }}
                      >
                        <Signout />
                      </span>
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
                        <a
                          style={{
                            position: "fixed",
                            bottom: "20px",
                            zIndex: 6,
                          }}
                        >
                          <Username style={{ transform: "skewY(-11deg)" }}>
                            {user.name}
                          </Username>
                        </a>
                      </Link>
                    </Wrapper>
                  )}
                </>
              )}
            </Container>
          </>
        );
      }}
    </User>
  );
};

export default Nav;
