import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

import { Container, FormContainer, Input, ForgotPasswordLink } from "./styles";
import { useAuth } from "../../hooks/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, isAuthenticated } = useAuth();

  return isAuthenticated() ? <Redirect to={{pathname: '/dashboard'}} /> : (
    <Container>
      <FormContainer>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            signIn(email, password);
          }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" type="submit" block>
            Entrar
          </Button>
        </Form>
        <div className="mt-4">
          <ForgotPasswordLink to={{ pathname: "/forgotpassword" }}>
            Esqueci minha senha
          </ForgotPasswordLink>
          <ForgotPasswordLink to={{ pathname: "/register" }}>
            Realizar cadastro
          </ForgotPasswordLink>
        </div>
      </FormContainer>
    </Container>
  );
}
