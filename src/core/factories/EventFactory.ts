import Event from '../models/Event'
import AgentFactory from './AgentFactory'

export default function eventFactory(rawData: any): Event {
    
    
    return ({
        id: rawData.id,
        date: (rawData.date),
        title: rawData.title,
        description: rawData.description,
        level: rawData.level,
        shelved: rawData.shelved,
        number_of_occurrences: rawData.number_of_occurrences,
        agent: AgentFactory(rawData.agent)
    });
}