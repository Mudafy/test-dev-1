import * as Faker from 'faker';
import { Broker } from '../models/broker';

function fakeBroker(id: string): Broker {
    return {
        id,
        name: `${Faker.company.companyName()}`
    };
}

export const fakeBrokers: Array<Broker> = [...Array(10).keys()]
    .map(x => fakeBroker(String(x)));
