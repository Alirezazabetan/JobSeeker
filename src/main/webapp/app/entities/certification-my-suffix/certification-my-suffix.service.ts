import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICertificationMySuffix } from 'app/shared/model/certification-my-suffix.model';

type EntityResponseType = HttpResponse<ICertificationMySuffix>;
type EntityArrayResponseType = HttpResponse<ICertificationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CertificationMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/certifications';

    constructor(private http: HttpClient) {}

    create(certification: ICertificationMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(certification);
        return this.http
            .post<ICertificationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(certification: ICertificationMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(certification);
        return this.http
            .put<ICertificationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ICertificationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICertificationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(certification: ICertificationMySuffix): ICertificationMySuffix {
        const copy: ICertificationMySuffix = Object.assign({}, certification, {
            startDate: certification.startDate != null && certification.startDate.isValid() ? certification.startDate.toJSON() : null,
            endDate: certification.endDate != null && certification.endDate.isValid() ? certification.endDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((certification: ICertificationMySuffix) => {
            certification.startDate = certification.startDate != null ? moment(certification.startDate) : null;
            certification.endDate = certification.endDate != null ? moment(certification.endDate) : null;
        });
        return res;
    }
}
