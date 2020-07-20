import React, { useState, useMemo, useCallback} from 'react'
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

interface ListItem {
    event: Event;
    checked: boolean;
}

export default function Dashboard() {
    const {user, signOut} = useAuth();
    const [search, setSearch] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const [events, setEvents] = useState<Array<ListItem>>();
    const [env, setEnv] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [searchBy, setSearchBy] = useState('');

    const history = useHistory();
    
    useMemo(async () => {
        try{
            const {data} = await api.get('/events/')
            setEvents(data.results.map((item: any) => {
                return {
                    event: EventFactory(item),
                    checked: false
                } as ListItem;
            }));
        } catch (err) {
            console.log(err.message)   
        }
        
    }, []);

    const find = useCallback(async () => {
        try{
            const {data} = await api.get(
                `/events/?search=${search}&searchBy=${searchBy}&orderBy=${orderBy}&env=${env}`
            )
            const newEvents = events?.map(item => {
                if (item.checked) {
                    item.checked = !item.checked;
                    if(selectAll && !item.checked) {
                        setSelectAll(false)
                    }
                }
                return item;
            })
            setEvents(newEvents);
        } catch (err) {
            console.log(err.message)   
        }
        
    }, [env, events, orderBy, search, searchBy, selectAll]);

    const getSelected = useCallback(() => {
        return events?.filter(item => item.checked).map(item => item.event.id);
    }, [events]);

    const deleteSelected = useCallback(async () => {
        const selected = getSelected()
        if(selected && events) {
            selected.forEach(async value => {
                try{
                    await api.delete(`/events/${value}/`)
                } catch(err){
                    console.error(err.message)
                }
            })

            const newEvents = events.filter(item => !selected.includes(item.event.id));

            setEvents(newEvents ||  [] as Array<ListItem>);
        }        
    }, [getSelected, events]);

    const shelveSelected = useCallback(async () => {
        const selected = getSelected()
        if(selected && events) {
            selected.forEach(async value => {
                try{
                    await api.patch(`/events/${value}/`, {
                        shelved: true
                    })
                } catch(err){
                    console.error(err.message)
                }
            })

            const newEvents = events.map(item => {
                if(selected.includes(item.event.id)){
                    item.event.shelved = true
                }
                return item;
            });

            setEvents(newEvents ||  [] as Array<ListItem>);
        }        
    }, [getSelected, events]);

    const changeSelect = (id: number) => {
        const newEvents = events?.map(item => {
            if (item.event.id === id) {
                item.checked = !item.checked;
                if(selectAll && !item.checked) {
                    setSelectAll(false)
                }
            }
            return item;
        })
        setEvents(newEvents);
    }

    const handleSelectAll = () => {
        const newEvents = events?.map(item => {
            item.checked = !selectAll;
            return item;
        })
        setEvents(newEvents);
        setSelectAll(!selectAll)
    }

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
                            <Form.Control as="select" value={env} onChange={(e) => setEnv(e.target.value)}>
                                <option selected disabled >Ambiente</option>
                                <option value="">Todos</option>
                                <option value="PRODUCTION">Produção</option>
                                <option value="HOMOLOGATION">Homologação</option>
                                <option value="DEV">Dev</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} md={2} controlId="formGridState" className="mobile-wrap">
                            <Form.Control as="select" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                                <option selected disabled >Ordenar por</option>
                                <option>Todos</option>
                                <option value="level">Level</option>
                                <option value="frequencia">Frequência</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} md={2} controlId="formGridState">
                            <Form.Control as="select" value={searchBy} onChange={(e) => setSearchBy(e.target.value)} >
                                <option selected disabled >Buscar por</option>
                                <option value="level">Level</option>
                                <option value="description">Descrição</option>
                                <option value="origin">Origem</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} md={5} controlId="formGridState">
                            <Form.Control 
                                placeholder="Buscar" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Form.Group as={Col} xs={1} controlId="formGridState">
                            <Button variant="light" onClick={(e)=> {
                                e.preventDefault()
                                find()
                            }}>Buscar</Button>
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
                    onChange={handleSelectAll}
                />
                <div style={{display: 'inline'}}>
                    <Button variant="success" className="mx-2" onClick={shelveSelected}>Arquivar</Button>
                    <Button variant="success" className="mx-2" onClick={deleteSelected}>Apagar</Button>
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
                            <th></th>
                            <th>Level</th>
                            <th>Log</th>
                            <th>Data</th>
                            <th>Eventos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events && events.map(item => (
                        <tr 
                            key={`${item.event.id}`} 
                            style={{cursor: 'pointer'}}
                            className={item.event.shelved ? "text-line text-secondary" : ""}
                        >
                            <td>
                            <Form.Check 
                                id={`check-${item.event.id}`} 
                                type="checkbox" 
                                checked={item.checked} 
                                onChange={() => changeSelect(item.event.id)}
                            />
                            </td>
                            <td onClick={() => history.push(`/details/${item.event.id}`)} >{item.event.level}</td>
                            <td onClick={() => history.push(`/details/${item.event.id}`)}>{item.event.title}</td>
                            <td onClick={() => history.push(`/details/${item.event.id}`)}>{item.event.date}</td>
                            <td onClick={() => history.push(`/details/${item.event.id}`)}>{item.event.number_of_occurrences}</td>
                        </tr>
                        ))}
                        
                    </tbody>
                </Table> )}
            </Container>
        </>
    )
}
