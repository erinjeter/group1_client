import { CardColumns, Button } from "reactstrap";
import PollCard from "./PollCard";
import BarResult from "../Response/BarResult";
import React from "react";

const PollDisplay = (props) => {
  let arrResults = [];

  const display = () => {
    // get Results
    console.log(props.allPolls);
    arrResults = [];

    fetch("http://localhost:3000/responses/getAllResults", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((responsesData) => {
        console.log(responsesData);
        parseData(responsesData);
      })
      .catch((err) => console.log(err));
  };

  const parseData = (data) => {
    for (let i = 0; i < props.allPolls.length; i++) {
      // console.log(props.allPolls[i].id);
      arrResults.push(
        data.filter((element) => element.pollid === props.allPolls[i].id)
      );

      // <BarResult data={newArr} question={props.allPolls[i].question} responses={[props.allPolls[i].response1,props.allPolls[i].response2,props.allPolls[i].response3,props.allPolls[i].response4]}  />
    }
    console.log(arrResults);
  };

  const barDisplays = () => {
    console.log("in barDisplays: ");
    return arrResults.map((array, index) => {
      return (
        <>
          <BarResult
            data={array}
            question={props.allPolls[index].question}
            responses={[
              props.allPolls[index].response1,
              props.allPolls[index].response2,
              props.allPolls[index].response3,
              props.allPolls[index].response4,
            ]}
          />
        </>
      );
    });
  };

  return (
    <div>
      <CardColumns>
        {props.allPolls?.map((poll) => (
          <CardColumns>
            <PollCard
              poll={poll}
              token={props.token}
              fetchPolls={props.fetchPolls}
            />
          </CardColumns>
        ))}
      </CardColumns>

      {localStorage.role === "admin" ? (
        <>
          <Button color="warning" onClick={display}>
            See All Results
          </Button>
          {barDisplays()}
          {/* <BarResult data={arrResults[0]} question={props.allPolls[0].question} responses={[props.allPolls[0].response1,props.allPolls[0].response2,props.allPolls[0].response3,props.allPolls[0].response4]} />  */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PollDisplay;
