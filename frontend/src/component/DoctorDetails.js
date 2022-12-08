import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import styled from "styled-components";
import { Rating } from "@mui/material";

// import starIcon from "../assets/images/starIcon.svg";

export default function DoctorDetails(props) {
  var [rating, setRating] = React.useState([
    { star: "one", value: 0 },
    { star: "two", value: 0 },
    { star: "three", value: 0 },
    { star: "four", value: 0 },
    { star: "five", value: 0 },
  ]);

  useEffect(() => {
    function setRatingNum(doctorData) {
      doctorData.reviews.map((review) => {
        var ratingg = review.starReview;

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
            readOnly
          />
          {parseInt(rating[0].value) +
            parseInt(rating[1].value) +
            parseInt(rating[2].value) +
            parseInt(rating[3].value) +
            parseInt(rating[4].value)}
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
