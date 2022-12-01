import React from "react";
import styled from "styled-components";

const Box = (props) => {
  return (
    <Body>
      <Photuu>
        <img src={props.previewImage} alt="preview" />
      </Photuu>
      <Text>
        <Title>{props.title}</Title>
        <span>
          <a href={props.link}>Click Here</a>
        </span>
      </Text>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: row;
  height: 10rem;
  width: 20rem;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const Photuu = styled.div`
  width: 30%;
  margin: 10%;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  /* width: 50%; */
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 2vw, 2.5rem);
`;

export default Box;
