import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import styled from "styled-components";

import User from "./User";
import { ALL_POSTS_QUERY } from "./Posts";

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($caption: String!, $picture: String!) {
    createPost(caption: $caption, picture: $picture) {
      id
      caption
      picture
    }
  }
`;

let Form = styled.form`
  display: flex;
  background: #778798;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 90vh;
  height: 100vh;
  width: 50%;
`;

let Title = styled.h2`
  margin-bottom: 0.6vw;
  font-family: "Montserrat", sans-serif;
  color: #fffff4;
  font-size: 5vw;
  margin-top: 0;
`;

let Caption = styled.input`
  margin-bottom: 2vw;
  background-image: linear-gradient(to bottom, #778798, #94a1ae);
  border: 0.2vw solid #cdcdcd;
  border-radius: 0.4vw;
  font-size: 1.2vw;
  color: #ede8e4;
  outline: none;
  padding: 10px 5px;
  transition: 0.3s;
  width: 20vw;
  :hover {
    transition: 0.3s;
    border-color: #ebedf0;
  }
  ::placeholder {
    color: #ede8e4;
  }
`;

let PictureFile = styled.label`
  font-size: 1.2vw;
  width: 16vw;
  color: #ede8e4;
  cursor: pointer;
  background: #fe5f55;
  border: 0.2vw solid #ffbeba;
  padding: 10px 5px;
  font-family: "Montserrat", sans-serif;
  border-radius: 0.4vw;
  white-space: nowrap;
  margin-bottom: 2vw;
  line-height: 1.38;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    border-color: #ffd6d4;
  }
`;

let ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

let InputButton = styled.input`
  border-top-left-radius: 0.5vw;
  border-bottom-left-radius: 0.5vw;
  outline: none;
  font-family: "Montserrat", sans-serif;
  background: #ced4da;
  color: #fe5f55;
  font-weight: 550;
  font-size: 2vw;
  border: none;
  padding: 2vh 0;
  width: 13vw;
  width: 15vw;
  margin: 1vw 0;
  color: #66798c;
  :disabled {
    color: #dde1e5;
    border: none;
  }
  :hover {
    cursor: pointer;
    color: #fa6359;
    :disabled {
      color: #dde1e5;
      cursor: default;
      border: none;
    }
  }
`;

const CreatePost = (props) => {
  const [caption, setCaption] = useState("");
  const [picture, setPicture] = useState("");
  const [fileName, setFileName] = useState("");
  const [pictureLoading, setPictureLoading] = useState(false);

  const router = useRouter();

  const uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    setFileName(files[0].name);
    data.append("upload_preset", "bild-post-picture");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dx3i4rcnz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setPicture(file.url);
    setPictureLoading(!pictureLoading);
  };

  let user = null;

  return (
    <Mutation
      mutation={CREATE_POST_MUTATION}
      variables={{ caption, picture }}
      refetchQueries={[{ query: ALL_POSTS_QUERY }]}
    >
      {(createPost, { loading, error }) => {
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
                  {!user && <Title>Please sign in</Title>}
                  {user && (
                    <Form
                      action="post"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                          await createPost();
                          setCaption("");
                          setPicture("");
                          setPictureLoading(!pictureLoading);
                          router.push("/", "/");
                        } catch (error) {
                          console.log("Error[CreatePost]: ", error);
                        }
                      }}
                    >
                      <Title>Create Post</Title>
                      <PictureFile htmlFor="file">
                        {fileName ? fileName.substring(0, 20) : "Add Picture"}
                        <input
                          maxLength={255}
                          type="file"
                          name="file"
                          id="file"
                          onChange={uploadFile}
                          required
                          style={{ display: "none" }}
                        />
                      </PictureFile>
                      <Caption
                        required
                        type="text"
                        placeholder="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        maxLength={70}
                      />
                      {picture && (
                        <img
                          src={picture}
                          style={{ width: "25vw", height: "25vh" }}
                        />
                      )}
                      <ButtonDiv>
                        <InputButton
                          disabled={!pictureLoading || !caption}
                          type="submit"
                          value="Create Post"
                        />
                      </ButtonDiv>
                    </Form>
                  )}
                </>
              );
            }}
          </User>
        );
      }}
    </Mutation>
  );
};

export default CreatePost;
