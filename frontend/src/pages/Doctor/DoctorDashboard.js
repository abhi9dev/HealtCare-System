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
  const [totalRating, setTotalRating] = React.useState(0);

  var [rating, setRating] = React.useState([
    { star: "one", value: 0 },
    { star: "two", value: 0 },
    { star: "three", value: 0 },
    { star: "four", value: 0 },
    { star: "five", value: 0 },
  ]);

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    const url = `http://localhost:5000/doc/${id}/`;

    async function getDoctorData() {
      await axios.get(url).then((res) => {
        setDoctorData(res.data);
        // console.log(res.data);

        res.data.reviews.map((review) => {
          var ratingg = review.starReview;
          setTotalRating(res.data.reviews.length);

          setRating((curr) =>
            curr.map((item) => {
              if (item.star === "one" && ratingg === 1) {
                return { ...item, value: item.value + 1 };
              } else if (item.star === "two" && ratingg === 2) {
                return { ...item, value: item.value + 1 };
              } else if (item.star === "three" && ratingg === 3) {
                return { ...item, value: item.value + 1 };
              } else if (item.star === "four" && ratingg === 4) {
                return { ...item, value: item.value + 1 };
              } else if (item.star === "five" && ratingg === 5) {
                return { ...item, value: item.value + 1 };
              }
              return item;
            })
          );
        });

        console.log(rating);
      });
    }

    if (loggedInUser) {
      setAuthenticated(loggedInUser);
      getDoctorData();
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
          <Part2 elevation={10}>
            <SubPart1>
              <p>Overall Rating</p>
              <Rating
                readOnly
                value={
                  (parseInt(rating[0].value) +
                    parseInt(rating[1].value) * 2 +
                    parseInt(rating[2].value) * 3 +
                    parseInt(rating[3].value) * 4 +
                    parseInt(rating[4].value) * 5) /
                  (parseInt(rating[0].value) +
                    parseInt(rating[1].value) +
                    parseInt(rating[2].value) +
                    parseInt(rating[3].value) +
                    parseInt(rating[4].value))
                }
                size="large"
              />
              <p>
                {(parseInt(rating[0].value) +
                  parseInt(rating[1].value) * 2 +
                  parseInt(rating[2].value) * 3 +
                  parseInt(rating[3].value) * 4 +
                  parseInt(rating[4].value) * 5) /
                  (parseInt(rating[0].value) +
                    parseInt(rating[1].value) +
                    parseInt(rating[2].value) +
                    parseInt(rating[3].value) +
                    parseInt(rating[4].value))}{" "}
                average rating out of{" "}
                {parseInt(rating[0].value) +
                  parseInt(rating[1].value) +
                  parseInt(rating[2].value) +
                  parseInt(rating[3].value) +
                  parseInt(rating[4].value)}{" "}
                reviews.
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
                      (rating[4].value / totalRating) * 100
                    }%, lightgrey ${(rating[4].value / totalRating) * 100}%)`,
                  }}
                />
                <p>{rating[4].value}</p>
              </Bar>
              {/* 4star */}
              <Bar>
                <h6>4 Star</h6>
                <Barr
                  style={{
                    background: `linear-gradient(to right, lightgreen ${
                      (rating[3].value / totalRating) * 100
                    }%, lightgrey ${(rating[3].value / totalRating) * 100}%)`,
                  }}
                />
                <p>{rating[3].value}</p>
              </Bar>
              {/* 3star */}
              <Bar>
                <h6>3 Star</h6>
                <Barr
                  style={{
                    background: `linear-gradient(to right, yellow ${
                      (rating[2].value / totalRating) * 100
                    }%, lightgrey ${(rating[2].value / totalRating) * 100}%)`,
                  }}
                />
                <p>{rating[2].value}</p>
              </Bar>
              {/* 2star */}
              <Bar>
                <h6>2 Star</h6>
                <Barr
                  style={{
                    background: `linear-gradient(to right, orange ${
                      (rating[1].value / totalRating) * 100
                    }%, lightgrey ${(rating[1].value / totalRating) * 100}%)`,
                  }}
                />
                <p>{rating[1].value}</p>
              </Bar>
              {/* 1star */}
              <Bar>
                <h6>1 Star</h6>
                <Barr
                  style={{
                    background: `linear-gradient(to right, red ${
                      (rating[0].value / totalRating) * 100
                    }%, lightgrey ${(rating[0].value / totalRating) * 100}%)`,
                  }}
                />
                <p>{rating[0].value}</p>
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
