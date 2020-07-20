import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import {Header, Container, ActionsContainer} from './styles'

export default function Dashboard() {
    return (
        <>
            <Header>
                <div>header img</div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Control as="select">
                                <option selected disabled >Ambiente</option>
                                <option>Todos</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Control as="select">
                                <option selected disabled >Ordenar por</option>
                                <option>Todos</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Control as="select">
                                <option selected disabled >Buscar por:</option>
                                <option>Todos</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} xs={6} controlId="formGridState">
                            <Form.Control placeholder="Buscar" />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Header>
            <ActionsContainer>
                <Form.Check 
                    type="checkbox" 
                    label="Selecionar tudo" 
                    className="mx-2" 
                    style={{display: 'inline'}}
                />
                <Button variant="success" className="mx-2">Arquivar</Button>
                <Button variant="success" className="mx-2">Apagar</Button>
            </ActionsContainer>
            <Container>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Log</th>
                        <th>Eventos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                </tbody>
                </Table>
            </Container>
        </>
    )
}
