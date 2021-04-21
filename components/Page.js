import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Nav from "./Nav";
import Meta from "./Meta";
import { Container } from "next/app";

const GlobalStyle = createGlobalStyle`
  html{
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body{
    background:#ced4da;
    height:100vh;
    padding:0;
    margin:0;
    font-size:1.5rem;
    line-height:2;
  }
  a{
    text-decoration:none;
    font-family: "Montserrat", sans-serif;
    color:#F4F4F9;
    font-size: 1.5vmax;
  }
  a:hover{
    color:#ACBDBA;
  }
`;

const Page = (props) => {
  return (
    <div>
      <GlobalStyle />
      <Meta />
      {props.children}
    </div>
  );
};

export default Page;
