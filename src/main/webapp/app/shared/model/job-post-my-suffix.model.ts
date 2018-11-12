import { Moment } from 'moment';

export interface IJobPostMySuffix {
    id?: string;
    title?: string;
    company?: string;
    startDate?: Moment;
    endDate?: Moment;
    shortDescription?: string;
    applicationUrl?: string;
    location?: string;
    workinghours?: string;
    jobType?: string;
    requeredSkills?: string;
    coverImage?: string;
    description?: string;
}

export class JobPostMySuffix implements IJobPostMySuffix {
    constructor(
        public id?: string,
        public title?: string,
        public company?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public shortDescription?: string,
        public applicationUrl?: string,
        public location?: string,
        public workinghours?: string,
        public jobType?: string,
        public requeredSkills?: string,
        public coverImage?: string,
        public description?: string
    ) {}
}
