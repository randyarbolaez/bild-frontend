import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import styled from "styled-components";

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

let Input = styled.input`
  margin-bottom: 1vw;
  /* background: #fe5f55; */
  /* border-radius: 20px; */
  text-align: center;
  border: none;
  margin: 0.5vh 0.5vw;
  border-radius: 16px;
  font-size: 2vw;
  color: #fe5f55;
  outline: none;
  padding: 10px 5px;
  :hover {
    border-bottom: 0.3vw solid #fe5f55;
  }
  ::placeholder {
    color: #fe5f55;
  }
`;

let LabelFile = styled.label`
  font-size: 2vw;
  color: #fe5f55;
  cursor: pointer;
  /* background: #fe5f55; */
  margin: 0 5vw;
  padding: 10px 5px;
  /* width: 10%; */
  font-family: "Montserrat", sans-serif;
  border-radius: 20px;
  white-space: nowrap;
  /* word-wrap: break-word; */
  line-height: 1.38;
  :hover {
    border-bottom: 0.3vw solid #fe5f55;
  }
`;

let ButtonDiv = styled.div`
  text-align: center;
`;

let InputButton = styled.input`
  outline: none;
  font-family: "Montserrat", sans-serif;
  background-color: transparent;
  color: #fe5f55;
  font-weight: bold;
  font-size: 2.3vw;
  font-variant: small-caps;
  border: none;
  padding: 10px 0;
  width: 13vw;
  margin: 1vw 0;
  :disabled {
    color: #d3d3d3;
    border: none;
  }
  :hover {
    border-bottom: 0.3vw solid #fe5f55;
    border-radius: 16px;
    cursor: pointer;
    :disabled {
      color: #d3d3d3;
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

  return (
    <Mutation
      mutation={CREATE_POST_MUTATION}
      variables={{ caption, picture }}
      refetchQueries={[{ query: ALL_POSTS_QUERY }]}
    >
      {(createPost, { loading, error }) => {
        return (
          <form
            action="post"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await createPost();
                setCaption("");
                setPicture("");
                setPictureLoading(!pictureLoading);
              } catch (error) {
                console.log("Error[CreatePost]: ", error);
              }
            }}
          >
            <Input
              required
              type="text"
              placeholder="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <LabelFile htmlFor="file">
              {fileName ? fileName.substring(0, 20) : "Upload Profile Picture"}
              <input
                maxLength={255}
                type="file"
                name="file"
                id="file"
                onChange={uploadFile}
                required
                style={{ display: "none" }}
              />
            </LabelFile>
            <ButtonDiv>
              <InputButton
                disabled={!pictureLoading}
                type="submit"
                value="Create Post"
                onClick={props.sendData()}
              />
            </ButtonDiv>
          </form>
        );
      }}
    </Mutation>
  );
};

export default CreatePost;
