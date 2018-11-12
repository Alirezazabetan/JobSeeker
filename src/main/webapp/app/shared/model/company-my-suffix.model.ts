import { Moment } from 'moment';

export interface ICompanyMySuffix {
    id?: string;
    name?: string;
    workTitle?: string;
    workDescription?: string;
    location?: string;
    startDate?: Moment;
    website?: string;
    tel?: number;
    employerRange?: string;
    email?: string;
    about?: string;
    socialNetworks?: string;
    vacancies?: string;
}

export class CompanyMySuffix implements ICompanyMySuffix {
    constructor(
        public id?: string,
        public name?: string,
        public workTitle?: string,
        public workDescription?: string,
        public location?: string,
        public startDate?: Moment,
        public website?: string,
        public tel?: number,
        public employerRange?: string,
        public email?: string,
        public about?: string,
        public socialNetworks?: string,
        public vacancies?: string
    ) {}
}
