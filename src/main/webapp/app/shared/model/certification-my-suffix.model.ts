import { Moment } from 'moment';

export interface ICertificationMySuffix {
    id?: string;
    name?: string;
    certificationAuthority?: string;
    licenseNumber?: string;
    startDate?: Moment;
    endDate?: Moment;
}

export class CertificationMySuffix implements ICertificationMySuffix {
    constructor(
        public id?: string,
        public name?: string,
        public certificationAuthority?: string,
        public licenseNumber?: string,
        public startDate?: Moment,
        public endDate?: Moment
    ) {}
}
