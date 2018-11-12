export interface ICourseMySuffix {
    id?: string;
    name?: string;
    number?: number;
    associateWith?: string;
}

export class CourseMySuffix implements ICourseMySuffix {
    constructor(public id?: string, public name?: string, public number?: number, public associateWith?: string) {}
}
