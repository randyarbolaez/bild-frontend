import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
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

const TitleContainer = styled.h1`
  font-size: 4.5vw;
  color: #e58c8a;
  margin: 0;
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
                bottom: "20px",
                zIndex: 6,
              }}
            >
              <ShowNavButton
                onClick={() => {
                  setNavInfoShown(!navInfoShown);
                  if (!navInfoShown) {
                    scroll(0, 0);
                  }
                }}
              >
                {navInfoShown ? (
                  <RiLayoutTop2Line size={"3vw"} color={"#fe5f55"} />
                ) : (
                  <RiLayoutTop2Fill size={"3vw"} color={"#fe5f55"} />
                )}
              </ShowNavButton>
            </div>
            <Container
              style={{
                position:
                  navInfoShown && url !== "authenticate" ? null : "fixed",
                height: navInfoShown ? "10vh" : null,
              }}
            >
              {navInfoShown ? (
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
              ) : null}
            </Container>
          </>
        );
      }}
    </User>
  );
};

export default Nav;
