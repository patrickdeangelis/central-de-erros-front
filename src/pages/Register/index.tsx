import React, { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import BAlert from "react-bootstrap/Alert";
import { Redirect, Link } from "react-router-dom";

import { Container, FormContainer, Input, ForgotPasswordLink } from "../../global/AuthStyles";
import { useAuth } from "../../hooks/AuthContext";
import api from "../../services/api";

interface Alert {
  type: string;
  message: string;
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({} as Alert);

  const { isAuthenticated } = useAuth();

  const register = useCallback(async () => {
    try {
      await api.post("/auth/users/", {
        name,
        email,
        password,
      });
      setAlert({
        type: "success",
        message: "Cadastro realizado com sucesso",
      });
    } catch (err) {
      setAlert({
        type: "danger",
        message: "Não foi possível realizar o cadastro",
      });
    }
  }, [name, email, password]);

  const renderForm = () => (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        register();
      }}
    >
      <h5 className="text-center mb-4">Registre-se</h5>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Nome</Form.Label>
        <Input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="success" type="submit" block>
        Registrar
      </Button>
    </Form>
  );

  const renderAlert = () => (
    <>
      <BAlert variant={alert.type}>{alert.message}</BAlert>
      <Link to={{ pathname: "/" }}>
        <Button variant="success" block>
          Voltar ao início
        </Button>
      </Link>
    </>
  );

  return isAuthenticated() ? (
    <Redirect to={{ pathname: "/dashboard" }} />
  ) : (
    <Container>
      <FormContainer>
        <div className="d-flex justify-content-center mb-5">
          <img
            alt="logs logo"
            src={require("../../assets/img/logo_green.svg")}
          />
        </div>
        {alert.type ? renderAlert() : renderForm()}
        <div className="mt-4" style={{ textAlign: "right" }}>
          <ForgotPasswordLink to={{ pathname: "/" }}>
            Já possui conta? entre aqui
          </ForgotPasswordLink>
          <ForgotPasswordLink to={{ pathname: "/forgotpassword" }}>
            Esqueci minha senha
          </ForgotPasswordLink>
        </div>
      </FormContainer>
    </Container>
  );
}
