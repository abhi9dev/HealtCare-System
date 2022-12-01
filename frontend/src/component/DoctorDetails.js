import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import styled from "styled-components";
import { Rating } from "@mui/material";

// import starIcon from "../assets/images/starIcon.svg";

export default function DoctorDetails(props) {
  const [oneRate, setOneRate] = React.useState(0);
  const [twoRate, setTwoRate] = React.useState(0);
  const [threeRate, setThreeRate] = React.useState(0);
  const [fourRate, setFourRate] = React.useState(0);
  const [fiveRate, setFiveRate] = React.useState(0);
  const [totalRating, setTotalRating] = useState(0);

  useEffect(() => {
    function setRatingNum(doctorData) {
      doctorData.reviews.map((review) => {
        var ratingg = review.starReview;
        setTotalRating(doctorData.reviews.length);
        // console.log(ratingg);

        if (ratingg == 1) {
          setOneRate(oneRate + 1);
        } else if (ratingg == 2) {
          setTwoRate(twoRate + 1);
        } else if (ratingg == 3) {
          setThreeRate(threeRate + 1);
        } else if (ratingg == 4) {
          setFourRate(fourRate + 1);
        } else if (ratingg == 5) {
          setFiveRate(fiveRate + 1);
        }
      });
    }

    setRatingNum(props.doctorData);
    // console.log(props.doctorData);
    // console.log(
    //   (parseInt(oneRate) +
    //     parseInt(twoRate) * 2 +
    //     parseInt(threeRate) * 3 +
    //     parseInt(fourRate) * 4 +
    //     parseInt(fiveRate) * 5) /
    //     totalRating
    // );
  }, []);

  return (
    <Body>
      <Part1>
        <SubPart1>
          <h4>{`${props.doctorData.firstName} ${props.doctorData.lastName}`}</h4>
          <h5>{props.doctorData.speciality}</h5>
        </SubPart1>
        <SubPart2>
          <Rating
            name="rating"
            value={
              (parseInt(oneRate) +
                parseInt(twoRate) * 2 +
                parseInt(threeRate) * 3 +
                parseInt(fourRate) * 4 +
                parseInt(fiveRate) * 5) /
              totalRating
            }
            readOnly
          />
          {oneRate + twoRate + threeRate + fourRate + fiveRate}
        </SubPart2>
      </Part1>
      <Address>{props.doctorData.hopitalAdd}</Address>
    </Body>
  );
}

const Body = styled.div`
  margin: 1rem;
  border-bottom: 1px solid black;
`;

const Part1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const SubPart1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
`;

const SubPart2 = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Address = styled.p`
  text-align: left;
  margin-left: 1rem;
`;
