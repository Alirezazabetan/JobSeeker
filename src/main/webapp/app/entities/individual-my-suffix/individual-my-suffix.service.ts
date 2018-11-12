import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIndividualMySuffix } from 'app/shared/model/individual-my-suffix.model';

type EntityResponseType = HttpResponse<IIndividualMySuffix>;
type EntityArrayResponseType = HttpResponse<IIndividualMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class IndividualMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/individuals';

    constructor(private http: HttpClient) {}

    create(individual: IIndividualMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(individual);
        return this.http
            .post<IIndividualMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(individual: IIndividualMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(individual);
        return this.http
            .put<IIndividualMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IIndividualMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IIndividualMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(individual: IIndividualMySuffix): IIndividualMySuffix {
        const copy: IIndividualMySuffix = Object.assign({}, individual, {
            birthDate: individual.birthDate != null && individual.birthDate.isValid() ? individual.birthDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.birthDate = res.body.birthDate != null ? moment(res.body.birthDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((individual: IIndividualMySuffix) => {
            individual.birthDate = individual.birthDate != null ? moment(individual.birthDate) : null;
        });
        return res;
    }
}
