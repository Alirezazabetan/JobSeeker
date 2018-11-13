import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestScoreMySuffix } from 'app/shared/model/test-score-my-suffix.model';

type EntityResponseType = HttpResponse<ITestScoreMySuffix>;
type EntityArrayResponseType = HttpResponse<ITestScoreMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TestScoreMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/test-scores';

    constructor(private http: HttpClient) {}

    create(testScore: ITestScoreMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(testScore);
        return this.http
            .post<ITestScoreMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(testScore: ITestScoreMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(testScore);
        return this.http
            .put<ITestScoreMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ITestScoreMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITestScoreMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(testScore: ITestScoreMySuffix): ITestScoreMySuffix {
        const copy: ITestScoreMySuffix = Object.assign({}, testScore, {
            date: testScore.date != null && testScore.date.isValid() ? testScore.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((testScore: ITestScoreMySuffix) => {
            testScore.date = testScore.date != null ? moment(testScore.date) : null;
        });
        return res;
    }
}
