import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { CgBolt } from "react-icons/cg";
import { FiAperture } from "react-icons/fi";

import User from "./User";
import Signout from "./Signout";

const ShowNavButton = styled.button`
  background: transparent;
  border: none;
  transition: 1s;
  position: fixed;
  bottom: 10vh;
  left: 3vw;
  bottom: 11vh;
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
  bottom: 11vh;
  margin: 1% 0;
  zindex: 6;
  transform: rotate(-45deg);
  color: #e58c8a;
  font-size: 2.5vh;
  font-size: 2.6vh;
  font-weight: 600;
  transition: 0.5s;
  :hover {
    color: #fe7471;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 2.4vh;
  font-size: 2.2vh;
  // font-size: 2.5vh;
  font-weight: 600;
  color: #fffff4;
  outline: none;
  transition: border 0.4s ease-in-out;
  border-bottom: 3.5px solid transparent;
  position: fixed;
  bottom: 7.5vh;
  left: 3.5vw;
  bottom: 9.3vh;
  left: 3.8vw;
  zindex: 6;
  transform: rotate(-45deg);
  // transform: rotate(-50deg);
  :hover {
    border-bottom: 3.5px solid #fa7775;
    cursor: pointer;
  }
  // display: none;
`;

const SignoutButton = styled.span`
  position: fixed;
  left: 0.3vw;
  bottom: 7.8vh;
  transform: rotate(45deg);
  zindex: 6;
`;

const Username = styled.h1`
  color: #fe7471;
  font-size: 2vh;
  font-size: 2.5vh;
  position: fixed;
  bottom: 12.7vh;
  left: 4.4vw;
  zindex: 6;
  transform: rotate(45deg);
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
                onMouseEnter={() => {
                  setNavInfoShown(true);
                }}
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
