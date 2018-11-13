import { Moment } from 'moment';

export interface IIndividualMySuffix {
    id?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phoneNumber?: string;
    mobileNumber?: string;
    birthDate?: Moment;
    address?: string;
    jobTitle?: string;
    shortDescription?: string;
    webSite?: string;
    socialURLs?: string;
    skills?: string;
    educations?: string;
    workExpriences?: string;
    accomplishment?: string;
}

export class IndividualMySuffix implements IIndividualMySuffix {
    constructor(
        public id?: string,
        public firstName?: string,
        public lastName?: string,
        public middleName?: string,
        public phoneNumber?: string,
        public mobileNumber?: string,
        public birthDate?: Moment,
        public address?: string,
        public jobTitle?: string,
        public shortDescription?: string,
        public webSite?: string,
        public socialURLs?: string,
        public skills?: string,
        public educations?: string,
        public workExpriences?: string,
        public accomplishment?: string
    ) {}
}
