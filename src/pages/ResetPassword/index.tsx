import React, { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import BAlert from "react-bootstrap/Alert";
import { Redirect, Link, useParams } from "react-router-dom";

import { Container, FormContainer, Input, ForgotPasswordLink } from "../../global/AuthStyles";
import { useAuth } from "../../hooks/AuthContext";
import api from "../../services/api";

interface Alert {
  type: string;
  message: string;
}

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({} as Alert);
  const {uid, token} = useParams();
  const { isAuthenticated } = useAuth();

  const resetPassword = useCallback(async () => {
    try {
      await api.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: password
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
  }, [uid, token, password]);

  const renderForm = () => (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        resetPassword();
      }}
    >
      <h5 className="text-center mb-4">Cadastrar nova senha</h5>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Input
          type="password"
          placeholder="Digite sua nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
