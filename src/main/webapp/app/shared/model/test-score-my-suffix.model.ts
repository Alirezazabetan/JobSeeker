import { Moment } from 'moment';

export interface ITestScoreMySuffix {
    id?: string;
    name?: string;
    associatedWith?: string;
    score?: number;
    date?: Moment;
    description?: string;
}

export class TestScoreMySuffix implements ITestScoreMySuffix {
    constructor(
        public id?: string,
        public name?: string,
        public associatedWith?: string,
        public score?: number,
        public date?: Moment,
        public description?: string
    ) {}
}
