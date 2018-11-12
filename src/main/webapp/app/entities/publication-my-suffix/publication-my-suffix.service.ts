import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPublicationMySuffix } from 'app/shared/model/publication-my-suffix.model';

type EntityResponseType = HttpResponse<IPublicationMySuffix>;
type EntityArrayResponseType = HttpResponse<IPublicationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PublicationMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/publications';

    constructor(private http: HttpClient) {}

    create(publication: IPublicationMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(publication);
        return this.http
            .post<IPublicationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(publication: IPublicationMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(publication);
        return this.http
            .put<IPublicationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IPublicationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPublicationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(publication: IPublicationMySuffix): IPublicationMySuffix {
        const copy: IPublicationMySuffix = Object.assign({}, publication, {
            date: publication.date != null && publication.date.isValid() ? publication.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((publication: IPublicationMySuffix) => {
            publication.date = publication.date != null ? moment(publication.date) : null;
        });
        return res;
    }
}
