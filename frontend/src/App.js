import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import SecretContent from "./SecretContent";
import {gql, useQuery} from "@apollo/client";
import {useMemo} from "react";

const ME_QUERY = gql`
query getMe {
  me {
    email
    firstName
    lastName
  }
}
`;

function App() {
  const { data, isLoading, error} = useQuery(ME_QUERY, {
      fetchPolicy: 'cache-and-network'
  });
  console.log(data);
  const userData = useMemo(() => {
    return data?.me;
  }, [data]);

  const shouldDisplayError = error ? <Alert variant="danger" className="mt-3">
      {error.message}
  </Alert> : null;

    if (isLoading) {
        return <div>Loading...</div>
    }

  const shouldDisplaySecretContent = userData ?
      <SecretContent user={userData}/>
      :
      <>
        <Alert variant="warning" className="mt-3">
          Please login by using the form below to se the secret content!
        </Alert>

        <LoginForm/>

        <div className="mt-3">
          <Alert variant="info">
            You can register to the secret app by using the form below, if you are not registered yet
          </Alert>
        </div>

        <RegisterForm/>

      </>


  return <Container>
      <h1 className="mt-3">The secret app</h1>
      {shouldDisplayError}
      {shouldDisplaySecretContent}
</Container>
}

export default App;
