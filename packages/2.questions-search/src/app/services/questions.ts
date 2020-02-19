import * as Faker from 'faker';
import { fakeBrokers } from './brokers';
import { Question } from '../models/question';

function fakeQuestion(id: string): Question {
    return {
        name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
        phone: Faker.phone.phoneNumber(),
        email: Faker.internet.email(),
        broker: Faker.helpers.randomize(fakeBrokers.map(x => x.id)),
        message: Faker.lorem.paragraph()
    };
}

// export const brokers = [1, 2, 3, 40, 6];
export const fakeQuestions: Array<Question> = [...Array(20).keys()]
    .map(x => fakeQuestion(String(x)));
