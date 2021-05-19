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
  height: 7vh;
  display: flex;
  justify-content: space-around;
  font-family: "Julius Sans One", sans-serif;
  align-items: center;
  width: 95vw;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ShowNavButton = styled.button`
  background: transparent;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

const UserName = styled.h1`
  color: #66798c;
  font-size: 1.6vw;
  :hover {
    span {
      color: #e9ecef;
    }
    cursor: pointer;
  }
`;

const TitleContainer = styled.h1`
  color: #e9ecef;
  margin: 0;
  font-weight: 600;
  transition: 0.5s;
  :hover {
    transition: 0.5s;
    color: #66798c;
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
    font-size: 2.3vw;
    transition: 0.5s;
    font-weight: bold;
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
                right: "20px",
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
              }}
            >
              {navInfoShown ? (
                <>
                  <Link href="/" as={"/"}>
                    <a style={{ display: "flex", alignItems: "center" }}>
                      {/* <RiCamera2Fill size={"1.5vw"} color={"#fe5f55"} /> */}
                      <TitleContainer>Bild</TitleContainer>
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
                          <UserName>
                            <span>"</span>
                            {user.name}
                            <span>"</span>
                          </UserName>
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
