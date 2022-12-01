import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

import SideMenu from "../../component/SideMenu";
import IdCardFront from "../../component/IdCardFront";
import IdCardBack from "../../component/IdCardBack";

import barcode from "../../assets/images/barcode.png";
import maleAvatar from "../../assets/images/maleAvatar.svg";
import femaleAvatar from "../../assets/images/femaleAvatar.svg";

const UserDashboard = () => {
  let { id } = useParams();
  // console.log(id);
  const [authenticated, setAuthenticated] = React.useState(null);
  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    const url1 = `http://localhost:5000/user/${id}`; // using https instead of http will return error.

    const fetchData = async () => {
      await axios.get(url1).then((res) => setUserData(res.data));
    };

    if (loggedInUser) {
      setAuthenticated(loggedInUser);
      fetchData();
    }
  }, []);

  if (!authenticated) {
  } else {
    return (
      <Body>
        <SideMenu />
        <Card>
          <IdCardFront
            hId={userData.healthID}
            maleAvatar={maleAvatar}
            name={`${userData.firstName} ` + `${userData.lastName}`}
            city={userData.city}
            state={userData.state}
            dob={userData.DOB}
            barcode={barcode}
          />
          <IdCardBack
            address={userData.address}
            phone={userData.phoneNo}
            mail={userData.email}
            location={userData.address}
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
