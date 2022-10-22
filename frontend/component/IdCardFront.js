import React from "react";
import styled from "styled-components";

import maleAvatar from "../assets/images/maleAvatar.svg";
import barcode from "../assets/images/barcode.png";

const IdCardFront = (props) => {
  return (
    <Body>
      <Avatar>
        <img src={props.maleAvatar} alt="avatar" />
      </Avatar>
      <h3>{props.name}</h3>
      <h6>DOB: {props.dob}</h6>
      <h6>
        {props.city}, {props.state}
      </h6>
      <HealthId>
        <span>{props.hId}</span>
        <img src={props.barcode} alt="barcode" />
      </HealthId>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* margin: 1rem 0; */
  height: 25rem;
  width: 18rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 1rem;
`;

const Avatar = styled.div`
  height: 45%;
  width: 50%;
  margin: 1rem 0;
  img {
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }
`;

const HealthId = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-weight: 600;
    font-size: clamp(1rem, 4vw, 1.6rem);
  }

  img {
    height: 35%;
  }
`;

export default IdCardFront;
