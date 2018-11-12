import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanyMySuffix } from 'app/shared/model/company-my-suffix.model';

type EntityResponseType = HttpResponse<ICompanyMySuffix>;
type EntityArrayResponseType = HttpResponse<ICompanyMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CompanyMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/companies';

    constructor(private http: HttpClient) {}

    create(company: ICompanyMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(company);
        return this.http
            .post<ICompanyMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(company: ICompanyMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(company);
        return this.http
            .put<ICompanyMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ICompanyMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICompanyMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(company: ICompanyMySuffix): ICompanyMySuffix {
        const copy: ICompanyMySuffix = Object.assign({}, company, {
            startDate: company.startDate != null && company.startDate.isValid() ? company.startDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((company: ICompanyMySuffix) => {
            company.startDate = company.startDate != null ? moment(company.startDate) : null;
        });
        return res;
    }
}
