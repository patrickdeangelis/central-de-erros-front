import Agent from '../models/Agent'


export default function eventFactory(rawData: any): Agent {
    return ({
        id: rawData.id,
        adress: rawData.adress,
        env: rawData.env,
        user: rawData.user,
        version: rawData.version,
        name: rawData.name
    });
}