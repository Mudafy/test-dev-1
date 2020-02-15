import * as Faker from 'faker';
import { brokers } from './brokers';
import { Question } from '../models/question';

function fakeQuestion(id: number): Question {
    return {
        id,
        name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
        phone: Faker.phone.phoneNumber(),
        email: Faker.internet.email(),
        broker: Faker.helpers.randomize(brokers.map(x => x.id)),
        message: Faker.lorem.paragraph()
    };
}

// export const brokers = [1, 2, 3, 40, 6];
export const questions: Array<Question> = [...Array(100).keys()]
    .map(fakeQuestion);
