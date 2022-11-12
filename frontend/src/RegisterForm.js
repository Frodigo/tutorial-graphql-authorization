import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { ME_QUERY } from "./App";

const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        firstName
        lastName
        email
      }
    }
  }
`;

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const [registerUser] = useMutation(REGISTER_USER_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.registerUser.token);
    },
    update(cache, data) {
      cache.writeQuery({
        query: ME_QUERY,
        data: {
          me: {
            ...data.data.registerUser.user,
          },
        },
      });
    },
  });
  const onSubmit = (data) =>
    registerUser({
      variables: {
        email: data.register_email,
        password: data.register_password,
        firstName: data.register_firstName,
        lastName: data.register_lastName,
      },
    });

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)} validated={isValid}>
      <legend>User registration</legend>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First name</Form.Label>
        <Controller
          name="register_firstName"
          control={control}
          rules={{ required: "First name is required" }}
          render={({ field }) => (
            <Form.Control
              type="text"
              required
              placeholder="Enter your first name"
              isInvalid={errors.register_firstName}
              {...field}
            />
          )}
        />
        {errors.register_firstName && (
          <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
            {errors.register_firstName.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last name</Form.Label>
        <Controller
          name="register_lastName"
          control={control}
          rules={{ required: "Last name is required" }}
          render={({ field }) => (
            <Form.Control
              type="text"
              required
              placeholder="Enter your first name"
              isInvalid={errors.register_lastName}
              {...field}
            />
          )}
        />
        {errors.register_lastName && (
          <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
            {errors.register_lastName.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerEmail">
        <Form.Label>Email address</Form.Label>
        <Controller
          name="register_email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Form.Control
              type="email"
              required
              placeholder="Enter email"
              isInvalid={errors.register_email}
              {...field}
            />
          )}
        />
        {errors.register_email && (
          <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
            {errors.register_email.message}
          </Form.Control.Feedback>
        )}
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerPassword">
        <Form.Label>Password</Form.Label>
        <Controller
          name="register_password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <Form.Control
              type="password"
              required
              placeholder="Enter password"
              isInvalid={errors.register_password}
              {...field}
            />
          )}
        />
        {errors.register_password && (
          <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
            {errors.register_password.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
