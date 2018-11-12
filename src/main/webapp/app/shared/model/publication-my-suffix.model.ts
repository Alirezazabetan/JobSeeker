import { Moment } from 'moment';

export interface IPublicationMySuffix {
    id?: string;
    title?: string;
    publication?: string;
    date?: Moment;
    author?: string;
}

export class PublicationMySuffix implements IPublicationMySuffix {
    constructor(public id?: string, public title?: string, public publication?: string, public date?: Moment, public author?: string) {}
}
