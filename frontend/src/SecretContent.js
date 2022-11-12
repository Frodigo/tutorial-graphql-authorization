import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function SecretContent(props) {
    const { user } = props;

    return <div className="mt-3">
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Your secret data ;-)</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item><strong>First name: </strong>{user.firstName}</ListGroup.Item>
                <ListGroup.Item><strong>Last name: </strong>{user.lastName}</ListGroup.Item>
                <ListGroup.Item><strong>Email: </strong>{user.email}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Log out</Card.Link>
            </Card.Body>
        </Card>
    </div>
}