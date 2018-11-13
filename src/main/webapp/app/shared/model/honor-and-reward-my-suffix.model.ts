import { Moment } from 'moment';

export interface IHonorAndRewardMySuffix {
    id?: string;
    title?: string;
    associatedWith?: string;
    issue?: string;
    date?: Moment;
    description?: string;
}

export class HonorAndRewardMySuffix implements IHonorAndRewardMySuffix {
    constructor(
        public id?: string,
        public title?: string,
        public associatedWith?: string,
        public issue?: string,
        public date?: Moment,
        public description?: string
    ) {}
}
