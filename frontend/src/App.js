import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import SecretContent from "./SecretContent";

function App() {
  return <Container>
    <Alert variant="warning">
      Please login by using the form below to se the secret content!
    </Alert>

    <RegisterForm/>

    <div className="mt-3">
      <Alert variant="info">
        You can register to the secret app by using the form below, if you are not registered yet
      </Alert>
    </div>

    <LoginForm/>

    <SecretContent user={{firstName: 'Andrzej', lastName: 'Duda', email: 'andrzej@duda.pl'}}/>
  </Container>
}

export default App;
