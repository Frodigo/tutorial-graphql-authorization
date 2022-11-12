import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useCallback } from "react";
import { client } from "./index";

export default function SecretContent(props) {
  const { user } = props;

  const logOut = useCallback(async () => {
    await localStorage.removeItem("token");
    client.cache.evict({
      fieldName: "me",
    });
    client.refetchQueries({
      include: ["getMe"],
    });
  }, []);

  return (
    <div className="mt-3">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Your secret data ;-)</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <strong>First name: </strong>
            {user.firstName}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Last name: </strong>
            {user.lastName}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Email: </strong>
            {user.email}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="primary" onClick={logOut}>
            Log out
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
