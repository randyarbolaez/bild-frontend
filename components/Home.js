import React, { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

import User from "./User";
import Posts from "./Posts";
import Nav from "./Nav";

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
                  <h1>Loading</h1>
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
