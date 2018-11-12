import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrganizationMySuffix } from 'app/shared/model/organization-my-suffix.model';

type EntityResponseType = HttpResponse<IOrganizationMySuffix>;
type EntityArrayResponseType = HttpResponse<IOrganizationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class OrganizationMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/organizations';

    constructor(private http: HttpClient) {}

    create(organization: IOrganizationMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(organization);
        return this.http
            .post<IOrganizationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(organization: IOrganizationMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(organization);
        return this.http
            .put<IOrganizationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IOrganizationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrganizationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(organization: IOrganizationMySuffix): IOrganizationMySuffix {
        const copy: IOrganizationMySuffix = Object.assign({}, organization, {
            startDate: organization.startDate != null && organization.startDate.isValid() ? organization.startDate.toJSON() : null,
            endDate: organization.endDate != null && organization.endDate.isValid() ? organization.endDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((organization: IOrganizationMySuffix) => {
            organization.startDate = organization.startDate != null ? moment(organization.startDate) : null;
            organization.endDate = organization.endDate != null ? moment(organization.endDate) : null;
        });
        return res;
    }
}
