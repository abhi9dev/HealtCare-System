import React, { useEffect } from "react";
import styled from "styled-components";

import SideMenu from "../../component/SideMenu";
import IdCardFront from "../../component/IdCardFront";
import IdCardBack from "../../component/IdCardBack";

import barcode from "../../assets/images/barcode.png";
import maleAvatar from "../../assets/images/maleAvatar.svg";
import femaleAvatar from "../../assets/images/femaleAvatar.svg";

const UserDashboard = () => {
  //
  const [authenticated, setAuthenticated] = React.useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setAuthenticated(loggedInUser);
    }
  }, []);

  if (!authenticated) {
  } else {
    return (
      <Body>
        <SideMenu />
        <Card>
          <IdCardFront
            hId="ADNMH2101"
            maleAvatar={maleAvatar}
            name="Abhinav Deshmukh"
            city="Nagpur"
            state="Maharashtra"
            dob="21/01/1999"
            barcode={barcode}
          />
          <IdCardBack
            phone="9856789547"
            mail="abc@gmail.com"
            location="Oak's Nest, Faras, Koradi Road, Nagpur"
          />
        </Card>
      </Body>
    );
  }
};

const Body = styled.div`
  height: 100vh;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8rem;
  width: 80%;
  margin-left: 30%;
  margin-top: 10%;
`;

export default UserDashboard;
