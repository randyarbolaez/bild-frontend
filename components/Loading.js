import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 5vw;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-style: oblique 10deg;
  animation: color-me-in 5s infinite;

  @keyframes color-me-in {
    0% {
      color: #e5f4e3;
    }
    50% {
      color: #7899d4;
    }
    100% {
      color: #e5f4e3;
    }
  }
`;

const Loading = () => (
  <Wrapper>
    <Title>Loading...</Title>
  </Wrapper>
);

export default Loading;
