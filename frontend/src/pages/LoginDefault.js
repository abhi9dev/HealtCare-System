import React from "react";
import styled from "styled-components";

import ImageSliderr from "../component/ImageSlider";
import Box from "../component/Box";
import PreviewImage from "./../assets/images/previeww.jpg";

import patientImage from "../assets/images/patient.png";
import doctorImage from "../assets/images/doctor.png";
import adminImage from "../assets/images/admin.png";
import { SliderData } from "../component/SliderData";

const LoginDefault = () => {
  return (
    <Body>
      <ImageContainer>
        <img src={PreviewImage} alt="preview" />
      </ImageContainer>
      <Boxes>
        <Box title="Patient" link="ul" previewImage={patientImage} />
        <Box title="Doctor" link="dl" previewImage={doctorImage} />
        <Box title="Admin" link="al" previewImage={adminImage} />
      </Boxes>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Boxes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  /* margin-left: 6%; */
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 80%;
  margin: 2rem 0;
`;

export default LoginDefault;
