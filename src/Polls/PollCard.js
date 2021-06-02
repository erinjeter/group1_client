import { useState, useEffect } from "react";
import {
  Alert,
  Card,
  CardBody,
  CardTitle,
  Button,
  CardSubtitle,
  Row,
  Col
} from "reactstrap";
import BarResult from "../Response/BarResult";
import EditPoll from "./EditPoll";

const PollCard = (props) => {
  // const [nbVotes, setNbVotes] = useState("");
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [displayResultUser, setDisplayResultUser] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);
  const [resultArray, setResultArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPoll, setEditPoll] = useState({});

  const updatePoll = (poll) => {
    setEditPoll(poll);
  };
  // SELECT RESPONSE FROM POLL //
  const selectResponse = (event) => {
    console.log("click on ", event.target.id);
    // return (<SelectResponse poll={props.poll} selection={event.target.id} token={props.token}/>)
    if (localStorage.role === "user") {
      fetch(`http://localhost:3000/responses/select/${props.poll.id}`, {
        method: "POST",
        body: JSON.stringify({
          selection: event.target.id,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: props.token,
        }),
      })
        .then((res) => res.json())
        .then((responseData) => {
          console.log(responseData.message);
          setAlert(true); // turn on alert confirming vote for a poll
          setMsg(responseData.message);
          setDisableBtn(true); // cannot vote twice
          setDisplayResultUser(true);
          console.log("displayResultUser = ", displayResultUser);
        });
    }
  };

  // turn off alert after 1.5sec
  useEffect(() => {
    const timer = setTimeout(() => setAlert(false), 1500);
    return () => {
      clearTimeout(timer);
      setMsg("");
    };
  }, [alert]);

  // disable selection if admin
  useEffect(() => {
    localStorage.role === "admin" ? setReadOnly(true) : setReadOnly(false);
  }, []);

  // display results in a bar chart
  const seeResults = (event) => {
    console.log("click on ", event.target.id);

    // getVotes
    fetch(`http://localhost:3000/responses/getResult/${props.poll.id}`, {
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

  const deletePoll = () => {
    fetch(`http://localhost:3000/poll/delete/${props.poll.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Poll Deleted", data);
        props.fetchPolls();
      });
  };

  const parseData = (data) => {
    console.log("in parse ");
    setResultArray(data);
  };

  const updateOff = () => {
    setShowModal(false);
  };

  const updateOn = () => {
    setShowModal(true);
  };

  return (
    <>
      <Card key={props.poll.id}>
        <CardBody>
          <Alert color="success" isOpen={alert}>
            {msg}
          </Alert>
          <CardTitle style={{textAlign: "center"}}>{props.poll.question}</CardTitle>
          <Row>
            <Col style={{textAlign: "center"}}>
            
          <Button
            id="response1"
            onClick={selectResponse}
            disabled={readOnly || disableBtn}
          >
            {props.poll.response1}
          </Button>{' '}
          <Button
            id="response2"
            onClick={selectResponse}
            disabled={readOnly || disableBtn}
          >
            {props.poll.response2}
          </Button>{' '}
          <Button
            id="response3"
            onClick={selectResponse}
            disabled={readOnly || disableBtn}
          >
            {props.poll.response3}
          </Button>{' '}
          <Button
            id="response4"
            onClick={selectResponse}
            disabled={readOnly || disableBtn}
          >
            {props.poll.response4}
          </Button>
          </Col>
          </Row>
        </CardBody>
        {localStorage.role === "admin" ? (
          <>
          <Row style={{justifyContent: "center"}}>
            <Button
            color="outline-success"
            style={{width: "120px", marginLeft: "10px"}}
              onClick={(e) => {
                updateOn();
                updatePoll(props.poll);
              }}
            >
              Edit Poll
            </Button>
            {showModal ? (
              <EditPoll
                closeModal={updateOff}
                openModal={updateOn}
                poll={props.poll}
                fetchPolls={props.fetchPolls}
                editPoll={editPoll}
              />
            ) : null}
            <Button
            color="outline-danger"
            style={{width: "120px", marginLeft: "10px"}}
              onClick={(e) => {
                deletePoll(props.poll);
              }}
            >
              Delete Poll
            </Button>
          </Row>
          </>
      ) : (
        <></>
      )}
      </Card>

      {displayResultUser ? (
        <>
          <Button id="result" color="warning" onClick={seeResults}>
            See Results
          </Button>
          {resultArray.length > 0 ? (
            <BarResult
              data={resultArray}
              question={props.poll.question}
              responses={[
                props.poll.response1,
                props.poll.response2,
                props.poll.response3,
                props.poll.response4,
              ]}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PollCard;
