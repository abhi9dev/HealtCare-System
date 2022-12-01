import React from "react";
import styled from "styled-components";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";

import { Paper } from "@mui/material";

import SideMenu from "./sideMenu";
import profilePhoto from "../../assets/images/maleAvatar.svg";
import axios from "axios";

const DoctorDashboard = (props) => {
  const { id } = useParams();
  const [authenticated, setAuthenticated] = React.useState(null);
  const [doctorData, setDoctorData] = React.useState({});
  const [oneRate, setOneRate] = React.useState(0);
  const [twoRate, setTwoRate] = React.useState(0);
  const [threeRate, setThreeRate] = React.useState(0);
  const [fourRate, setFourRate] = React.useState(0);
  const [fiveRate, setFiveRate] = React.useState(0);
  const [totalRating, setTotalRating] = React.useState(0);

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    const url = `http://localhost:5000/doc/${id}/`;

    async function getDoctorData() {
      await axios.get(url).then((res) => {
        setDoctorData(res.data);

        res.data.reviews.map((review) => {
          var ratingg = review.starReview;
          setTotalRating(totalRating + ratingg);

          if (ratingg === 1) {
            setOneRate(oneRate + 1);
          } else if (ratingg === 2) {
            setTwoRate(twoRate + 1);
          } else if (ratingg === 3) {
            setThreeRate(threeRate + 1);
          } else if (ratingg === 4) {
            setFourRate(fourRate + 1);
          } else if (ratingg === 5) {
            setFiveRate(fiveRate + 1);
          }
        });
      });
    }

    if (loggedInUser) {
      setAuthenticated(loggedInUser);
      getDoctorData();
      // console.log(doctorData);
      // console.log({
      //   oneRate,
      //   twoRate,
      //   threeRate,
      //   fourRate,
      //   fiveRate,
      //   totalRating,
      // });
    }
  }, []);

  if (!authenticated) {
  } else {
    return (
      <>
        <SideMenu />
        <Body>
          <Part1>
            <ProfilePhoto>
              <img src={profilePhoto} alt="profile" />
            </ProfilePhoto>
            <Name>
              Hello, Dr. {doctorData.firstName} {doctorData.lastName}
            </Name>
            <h5>Have a great Day!!</h5>
          </Part1>
          <Part2 elevation={8}>
            <SubPart1>
              <p>Overall Rating</p>
              <Rating readOnly value={totalRating} size="large" />
              <p>
                {(oneRate +
                  twoRate * 2 +
                  threeRate * 3 +
                  fourRate * 4 +
                  fiveRate * 5) /
                  totalRating}{" "}
                average rating out of {totalRating} reviews.
              </p>
            </SubPart1>
            <svg width="100" height="3">
              <line x1="0" y1="0" x2="0" y2="100" />
            </svg>
            <SubPart2>
              {/* 5star */}
              <Bar>
                <h6>5 Star</h6>
                <Barr
                  style={{
                    background: `linear-gradient(to right, green ${
                      (fiveRate / totalRating) * 100
                    }%, lightgrey ${(fiveRate / totalRating) * 100}%)`,
                  }}
                />
                <p>{fiveRate}</p>
              </Bar>
              {/* 4star */}
              <Bar>
                <h6>4 Star</h6>
                <Barr
                  style={{
                    background: `linear-gradient(to right, lightgreen ${
                      (fourRate / totalRating) * 100
                    }%, lightgrey ${(fourRate / totalRating) * 100}%)`,
                  }}
                />
                <p>{fourRate}</p>
              </Bar>
              {/* 3star */}
              <Bar>
                <h6>3 Star</h6>
                <Barr
                  style={{
                    background: `linear-gradient(to right, yellow ${
                      (threeRate / totalRating) * 100
                    }%, lightgrey ${(threeRate / totalRating) * 100}%)`,
                  }}
                />
                <p>{threeRate}</p>
              </Bar>
              {/* 2star */}
              <Bar>
                <h6>2 Star</h6>
                <Barr
                  style={{
                    background: `linear-gradient(to right, orange ${
                      (twoRate / totalRating) * 100
                    }%, lightgrey ${(twoRate / totalRating) * 100}%)`,
                  }}
                />
                <p>{twoRate}</p>
              </Bar>
              {/* 1star */}
              <Bar>
                <h6>1 Star</h6>
                <Barr
                  style={{
                    background: `linear-gradient(to right, red ${
                      (oneRate / totalRating) * 100
                    }%, lightgrey ${(oneRate / totalRating) * 100}%)`,
                  }}
                />
                <p>{oneRate}</p>
              </Bar>
            </SubPart2>
          </Part2>
        </Body>
      </>
    );
  }
};

const Body = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Part1 = styled.div`
  img {
    height: 10rem;
    margin: 2rem 0;
  }
`;

const ProfilePhoto = styled.div``;

const Name = styled.h1`
  font-size: 2rem;
`;

const Part2 = styled(Paper)`
  height: 30rem;
  width: 80rem;
  display: flex;
  flex-direction: column;
`;

const SubPart1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const SubPart2 = styled.div``;

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Barr = styled.div`
  height: 2rem;
  width: 60rem;
  margin: 1rem 2rem;
  background-color: lightgrey;
  border-radius: 0.4rem;
`;
export default DoctorDashboard;
