export interface ILanguageMySuffix {
    id?: string;
    language?: string;
    proficiency?: string;
}

export class LanguageMySuffix implements ILanguageMySuffix {
    constructor(public id?: string, public language?: string, public proficiency?: string) {}
}
