import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPatentMySuffix } from 'app/shared/model/patent-my-suffix.model';

type EntityResponseType = HttpResponse<IPatentMySuffix>;
type EntityArrayResponseType = HttpResponse<IPatentMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PatentMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/patents';

    constructor(private http: HttpClient) {}

    create(patent: IPatentMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPatentMySuffix>(this.resourceUrl, patent, { observe: 'response' });
    }

    update(patent: IPatentMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPatentMySuffix>(this.resourceUrl, patent, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IPatentMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPatentMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
