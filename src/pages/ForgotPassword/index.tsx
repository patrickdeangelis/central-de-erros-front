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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({} as Alert);

  const { isAuthenticated } = useAuth();

  const resetPassword = useCallback(async () => {
    try {
      await api.post("/auth/users/reset_password/", {
        email,
      });
      setAlert({
        type: "success",
        message: "Link para redefinição enviado para seu email",
      });
    } catch (err) {
      setAlert({
        type: "danger",
        message: "Não foi possível resetar sua senha",
      });
    }
  }, [email]);

  const renderForm = () => (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        resetPassword();
      }}
    >
      <h5 className="text-center mb-4">Enviar nova senha</h5>
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

      <Button variant="success" type="submit" block>
        Enviar
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
          <ForgotPasswordLink to={{ pathname: "/register" }}>
            Criar conta
          </ForgotPasswordLink>
        </div>
      </FormContainer>
    </Container>
  );
}
