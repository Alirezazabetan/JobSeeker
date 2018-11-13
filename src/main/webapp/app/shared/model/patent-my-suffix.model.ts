export interface IPatentMySuffix {
    id?: string;
    title?: string;
    office?: string;
    number?: number;
    inventory?: string;
}

export class PatentMySuffix implements IPatentMySuffix {
    constructor(public id?: string, public title?: string, public office?: string, public number?: number, public inventory?: string) {}
}
