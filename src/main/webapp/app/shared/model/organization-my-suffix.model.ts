import { Moment } from 'moment';

export interface IOrganizationMySuffix {
    id?: string;
    name?: string;
    positionHeld?: string;
    associatedWith?: string;
    startDate?: Moment;
    endDate?: Moment;
    description?: string;
}

export class OrganizationMySuffix implements IOrganizationMySuffix {
    constructor(
        public id?: string,
        public name?: string,
        public positionHeld?: string,
        public associatedWith?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public description?: string
    ) {}
}
