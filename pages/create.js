import styled from "styled-components";

import Nav from "../components/Nav";
import CreatePost from "../components/CreatePost";

const Container = styled.div`
  height: 100vh;
  overflow-y: hidden;
`;

const Create = () => (
  <Container>
    <Nav />
    <CreatePost />
  </Container>
);

export default Create;
