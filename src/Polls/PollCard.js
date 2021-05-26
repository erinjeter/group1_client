import { Card, CardBody, CardTitle, Button, CardSubtitle } from "reactstrap";

const PollCard = (props) => {
  return (
    <Card key={props.poll.id}>
      <CardBody>
        <CardTitle>{props.poll.question}</CardTitle>
        <CardSubtitle></CardSubtitle>
        <Button>{props.poll.response1}</Button>
        <Button>{props.poll.response2}</Button>
        <Button>{props.poll.response3}</Button>
        <Button>{props.poll.response4}</Button>
      </CardBody>
    </Card>
  );
};

export default PollCard;
