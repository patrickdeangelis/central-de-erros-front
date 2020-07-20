import React, { useState, useMemo} from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import { useHistory } from 'react-router-dom'

import {useAuth} from '../../hooks/AuthContext'
import {Header, Container, ActionsContainer} from './styles'
import api from '../../services/api'
import Event from '../../core/models/Event'
import EventFactory from '../../core/factories/EventFactory'

export default function Dashboard() {
    const {user, signOut} = useAuth();
    const [search, setSearch] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const [events, setEvents] = useState<Array<Event>>();

    const history = useHistory();
    
    useMemo(async () => {
        try{
            const {data} = await api.get('/events/')
            setEvents(data.results.map((item: any) => {
                return EventFactory(item)
            }));
        } catch (err) {
            console.log(err.message)   
        }
        
    }, []);

    return (
        <>
            <Header>
                <div className="mb-5 d-flex justify-content-between align-items-center">
                    <img src={require('../../assets/img/logo_white.svg')} alt="logs logo" />
                    <div className="d-flex flex-row align-items-center">
                        <h5 className="text-light mt-2 mx-4">{user.name}</h5>
                        <Button 
                            variant="outline-light"
                            onClick={() => signOut()}
                        >Sair</Button>
                    </div>
                </div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} sm={12} md={2} controlId="formGridState" className="mobile-wrap">
                            <Form.Control as="select">
                                <option selected disabled >Ambiente</option>
                                <option value="">Todos</option>
                                <option value="PRODUCTION">Produção</option>
                                <option value="HOMOLOGATION">Homologação</option>
                                <option value="DEV">Dev</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} md={2} controlId="formGridState" className="mobile-wrap">
                            <Form.Control as="select">
                                <option selected disabled >Ordenar por</option>
                                <option>Todos</option>
                                <option value="level">Level</option>
                                <option value="frequencia">Frequência</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} md={2} controlId="formGridState">
                            <Form.Control as="select">
                                <option selected disabled >Buscar por</option>
                                <option value="level">Level</option>
                                <option value="description">Descrição</option>
                                <option value="origin">Origem</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} md={6} controlId="formGridState">
                            <Form.Control 
                                placeholder="Buscar" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Header>
            <ActionsContainer>
                <Form.Check 
                    id="select-all-switcher"
                    type="switch" 
                    inline
                    label="Selecionar tudo" 
                    className="mx-2" 
                    checked={selectAll}
                    onChange={() => setSelectAll(!selectAll)}
                />
                <div style={{display: 'inline'}}>
                    <Button variant="success" className="mx-2">Arquivar</Button>
                    <Button variant="success" className="mx-2">Apagar</Button>
                </div>
            </ActionsContainer>
            <Container>
                { !events 
                    ? (
                        <div className="text-center">
                            <Spinner  animation="border" variant="success"/>
                        </div>
                    ) 
                    : (
                    <Table responsive>
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Log</th>
                            <th>Data</th>
                            <th>Eventos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events && events.map(item => (
                        <tr 
                            key={`${item.id}`} 
                            onClick={() => history.push(`/details/${item.id}`)}
                            style={{cursor: 'pointer'}}
                        >
                            <td>{item.level}</td>
                            <td>{item.title}</td>
                            <td>{item.date}</td>
                            <td>{item.number_of_occurrences}</td>
                        </tr>
                        ))}
                        
                    </tbody>
                </Table> )}
            </Container>
        </>
    )
}
