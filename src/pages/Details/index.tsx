import React, {useState, useMemo} from 'react';
import {useParams, Link, useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import api from '../../services/api'
import Event from '../../core/models/Event'
import EventFactory from '../../core/factories/EventFactory'
import {User} from '../../hooks/AuthContext'
import {Header, Container} from './styles'

export default function Details() {
    const {id} = useParams()
    const [event, setEvent] = useState<Event>({} as Event);
    const history = useHistory();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return `${date.getDay()}/${date.getDay()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }

    useMemo(async () => {
        try{
            const {data} = await api.get(`/events/${id}/`);
            setEvent(EventFactory(data))
        } catch (err) {
            history.push('/dashboard')
        }
    }, [history, id]);

    return (
        <>
            <Header>
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <img src={require('../../assets/img/logo_white.svg')} alt="logs logo" />
                    <div className="d-flex flex-row align-items-center">
                        <Link to={{pathname: '/dashboard'}}>
                            <Button variant="outline-light">Voltar</Button>
                        </Link>
                    </div>
                </div>
            </Header>

            <Container>
                {!event.id ? (
                    <div className="text-center">
                        <Spinner  animation="border" variant="success"/>
                    </div>
                ) : (
                <div>
                    <h2>{`Erro no ${event.agent.adress} em ${formatDate(event.date)}`}</h2>
                    <div className="d-flex justify-content-between mobile-wrap">
                        <div> 
                            <div className="my-4">
                                <h4>Título</h4>
                                <p className="ml-4 text-secondary">{event.title}</p>
                            </div>

                            <div>
                                <h4>Descrição</h4>
                                <p className="ml-4 text-secondary">{event.description}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h4>Eventos</h4>
                                <p className="ml-4 text-secondary">{event.number_of_occurrences}</p>
                            </div>

                            <div>
                                <h4>Coletado por</h4>
                                <p className="ml-4 text-secondary">{event.agent.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </Container>
        </>
    );
}
