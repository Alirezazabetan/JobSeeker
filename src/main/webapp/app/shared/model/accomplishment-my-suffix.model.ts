export interface IAccomplishmentMySuffix {
    id?: string;
    publication?: string;
    certification?: string;
    patent?: string;
    course?: string;
    project?: string;
    honorAndReward?: string;
    testScore?: string;
    language?: string;
    organization?: string;
}

export class AccomplishmentMySuffix implements IAccomplishmentMySuffix {
    constructor(
        public id?: string,
        public publication?: string,
        public certification?: string,
        public patent?: string,
        public course?: string,
        public project?: string,
        public honorAndReward?: string,
        public testScore?: string,
        public language?: string,
        public organization?: string
    ) {}
}
