import * as Faker from 'faker';
import { Broker } from '../models/broker';

function fakeQuestion(id: number): Broker {
    return {
        id,
        name: `${Faker.company.companyName()}`
    };
}

export const brokers: Array<Broker> = [...Array(10).keys()]
    .map(fakeQuestion);