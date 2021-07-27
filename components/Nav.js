import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { FiAperture } from "react-icons/fi";

import User from "./User";
import Signout from "./Signout";

const ShowNavButton = styled.button`
  background: transparent;
  border: none;
  transition: 1s;
  position: fixed;
  bottom: 11vh;
  bottom: 10.5vh;
  left: 3.5vw;
  zindex: 6;
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
  left: 2vw;
  left: 1.7vw;
  bottom: 11vh;
  bottom: 12vh;
  margin: 1% 0;
  zindex: 6;
  transform: rotate(-45deg);
  color: #e58c8a;
  font-size: 2.6vh;
  font-weight: 600;
  color: #fe928f;
  transition: color 0.4s ease-in-out;
  :hover {
    color: #fe7471;
    cursor: pointer;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 2.5vh;
  font-weight: 600;
  outline: none;
  position: fixed;
  bottom: 8.6vh;
  left: 4.3vw;
  zindex: 6;
  transform: rotate(-47deg);
  color: #fe928f;
  transition: color 0.4s ease-in-out;
  :hover {
    color: #fe7471;
    cursor: pointer;
  }
`;

const SignoutButton = styled.span`
  position: fixed;
  left: 0.1vw;
  bottom: 7.5vh;
  transform: rotate(47deg);
  zindex: 6;
`;

const Username = styled.h1`
  font-size: 2.8vh;
  position: fixed;
  bottom: 12.3vh;
  left: 4.4vw;
  zindex: 6;
  transform: rotate(45deg);
  color: #fe928f;
  transition: color 0.4s ease-in-out;
  :hover {
    color: #fe7471;
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
            onMouseEnter={() => {
              setNavInfoShown(true);
            }}
          >
            <>
              <ShowNavButton
                style={{
                  bottom: !user ? "10vh" : null,
                  left: !user ? "3.5vw" : null,
                }}
              >
                <FiAperture size={"3.5vh"} color={"#fe5f55"} />
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
                            bottom: "6.5vh",
                            left: "-0.1vw",
                            transform: "rotate(45deg)",
                            fontSize: "2.5vh",
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
                          <Button>Create</Button>
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
                          <Username>Profile</Username>
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
