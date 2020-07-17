import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Container, FormContainer, Input, ForgotPasswordLink } from "./styles";

export default function SignIn() {
  return (
    <Container>
      <FormContainer>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Input type="email" placeholder="Digite seu email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Input type="password" placeholder="Digite sua senha" />
          </Form.Group>

          <Button variant="success" type="submit" block>
            Entrar
          </Button>
        </Form>
        <ForgotPasswordLink to={{pathname: '/forgotpassword'}}>Esqueci minha senha</ForgotPasswordLink>
        <ForgotPasswordLink to={{pathname: '/register'}}>Cadastro</ForgotPasswordLink>
      </FormContainer>
    </Container>
  );
}
