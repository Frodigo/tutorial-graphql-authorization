import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import {gql, useMutation} from "@apollo/client";
import { ME_QUERY } from "./App";

const LOGIN_USER_MUTATION = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
      email
      firstName
      lastName
    }
  }
}
`;


export default function LoginForm() {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm();
    const [loginUser] = useMutation(LOGIN_USER_MUTATION, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.loginUser.token)
        },
        update(cache, data) {
            cache.writeQuery({
                query: ME_QUERY,
                data: {
                    me: {
                        ...data.data.loginUser.user
                    }
                }
            });
        }
    })
    const onSubmit = data => loginUser({
        variables: {
            email: data.login_email,
            password: data.login_password
        }
    })

    return <Form noValidate onSubmit={handleSubmit(onSubmit)} validated={isValid}>
        <legend>User login</legend>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Controller
                name="login_email"
                control={control}
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                    }
                }}
                render={({ field }) => <Form.Control
                    type="email"
                    required
                    placeholder="Enter email"
                    isInvalid={errors.login_email}
                    {...field}
                />}
            />
            {errors.login_email && <Form.Control.Feedback type="invalid" style={{display: 'block'}}>{errors.login_email.message}</Form.Control.Feedback>}

            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Controller
                name="login_password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => <Form.Control
                    type="password"
                    required
                    placeholder="Enter password"
                    isInvalid={errors.login_password}
                    {...field}
                />}
            />
            {errors.login_password && <Form.Control.Feedback type="invalid" style={{display: 'block'}}>{errors.login_password.message}</Form.Control.Feedback>}
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
}