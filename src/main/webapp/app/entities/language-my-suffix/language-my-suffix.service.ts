import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILanguageMySuffix } from 'app/shared/model/language-my-suffix.model';

type EntityResponseType = HttpResponse<ILanguageMySuffix>;
type EntityArrayResponseType = HttpResponse<ILanguageMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class LanguageMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/languages';

    constructor(private http: HttpClient) {}

    create(language: ILanguageMySuffix): Observable<EntityResponseType> {
        return this.http.post<ILanguageMySuffix>(this.resourceUrl, language, { observe: 'response' });
    }

    update(language: ILanguageMySuffix): Observable<EntityResponseType> {
        return this.http.put<ILanguageMySuffix>(this.resourceUrl, language, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ILanguageMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILanguageMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
