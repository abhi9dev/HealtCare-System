import { Button } from "bootstrap";
import React from "react";
import styled from "styled-components";
import copy from "copy-to-clipboard";

import contact from "../assets/images/contact.svg";
import location from "../assets/images/location.svg";
import phone from "../assets/images/phone.svg";
import mail from "../assets/images/mail.svg";

const IdCardBack = (props) => {
  const copyPhoneNumber = () => {
    copy(props.phone);
  };

  const copyLocation = () => {
    copy(props.location);
  };

  const copyMailId = () => {
    copy(props.mail);
  };

  return (
    <Body>
      <Avatar>
        <img src={contact}></img>
      </Avatar>
      <Text>
        <h6>Oaks Next, Faras Square, Near Mankapur, Nagpur </h6>
      </Text>
      <Icons>
        <button onClick={copyPhoneNumber}>
          <img src={phone} alt="contact"></img>
        </button>
        <button onClick={copyLocation}>
          <img src={location} alt="location"></img>
        </button>
        <button onClick={copyMailId}>
          <img src={mail} alt="mail"></img>
        </button>
      </Icons>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 25rem;
  width: 18rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 1rem;
`;

const Avatar = styled.div`
  /* height: 50%; */
  margin: 1rem;

  img {
    width: 100%;
  }
`;

const Text = styled.div`
  h6 {
    margin: 1rem 0;
  }
`;

const Icons = styled.div`
  button {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: white;
    border: none;
    margin: 0 0.8rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
    transition: 300ms cubic-bezier(0.075, 0.82, 0.165, 1);

    :hover,
    :active {
      transform: scale(1.03);
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }
  }
`;

export default IdCardBack;
