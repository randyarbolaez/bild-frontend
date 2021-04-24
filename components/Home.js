import React, { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

import User from "./User";
import Posts from "./Posts";
import Nav from "./Nav";

let Title = styled.h2`
  margin-bottom: 0.6vw;
  font-family: "Montserrat", sans-serif;
  color: #fffff4;
  font-size: 5vw;
  margin-top: 0;
`;

const Home = () => {
  let user = null;
  return (
    <User>
      {({ data, loading }) => {
        if (loading) {
          null;
        } else {
          user = data.user;
        }

        return (
          <div>
            <div>
              <Nav />
              {loading && (
                <div>
                  <Title>Loading</Title>
                </div>
              )}
              <Posts />
            </div>
          </div>
        );
      }}
    </User>
  );
};

export default Home;
