import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJobPostMySuffix } from 'app/shared/model/job-post-my-suffix.model';

type EntityResponseType = HttpResponse<IJobPostMySuffix>;
type EntityArrayResponseType = HttpResponse<IJobPostMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class JobPostMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/job-posts';

    constructor(private http: HttpClient) {}

    create(jobPost: IJobPostMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(jobPost);
        return this.http
            .post<IJobPostMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(jobPost: IJobPostMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(jobPost);
        return this.http
            .put<IJobPostMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IJobPostMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IJobPostMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(jobPost: IJobPostMySuffix): IJobPostMySuffix {
        const copy: IJobPostMySuffix = Object.assign({}, jobPost, {
            startDate: jobPost.startDate != null && jobPost.startDate.isValid() ? jobPost.startDate.toJSON() : null,
            endDate: jobPost.endDate != null && jobPost.endDate.isValid() ? jobPost.endDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((jobPost: IJobPostMySuffix) => {
            jobPost.startDate = jobPost.startDate != null ? moment(jobPost.startDate) : null;
            jobPost.endDate = jobPost.endDate != null ? moment(jobPost.endDate) : null;
        });
        return res;
    }
}
