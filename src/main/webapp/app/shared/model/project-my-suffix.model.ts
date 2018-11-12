import { Moment } from 'moment';

export interface IProjectMySuffix {
    id?: string;
    name?: string;
    startDate?: Moment;
    endDate?: Moment;
    associatedWith?: string;
    projectUrl?: string;
    description?: string;
}

export class ProjectMySuffix implements IProjectMySuffix {
    constructor(
        public id?: string,
        public name?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public associatedWith?: string,
        public projectUrl?: string,
        public description?: string
    ) {}
}
