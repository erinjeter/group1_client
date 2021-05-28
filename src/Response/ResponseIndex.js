import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Card, CardTitle, CardSubtitle, CardBody, CardImg } from "reactstrap";
import PollDisplay from "../Polls/PollDisplay";

const ResponseDisplay = (props) => {
  const [responses, setResponses] = useState([]);

  const fetchResponses = () => {
    fetch("http://localhost/3000/responses/getAllResp/:poll_id", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token
          ? props.token
          : localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((responsesData) => {
        setResponses(responsesData);
        console.log(props.token);
      });
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  return (
    <div className="main">
      <Card>
        <CardImg />
        <CardBody>
          <CardTitle tag="h5">Responses</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
          <Pie data={fetchResponses} />
        </CardBody>
      </Card>
    </div>
  );
};

export default ResponseDisplay;
