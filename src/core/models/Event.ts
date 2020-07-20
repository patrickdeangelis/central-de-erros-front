import Agent from './Agent';

export default interface Event {
    id: number;
    title: string;
    description: string;
    date: Date;
    level: string;
    number_of_occurrences: number;
    shelved: boolean;
    agent: Agent;
}
