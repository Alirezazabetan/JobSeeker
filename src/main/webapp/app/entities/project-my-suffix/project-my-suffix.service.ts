import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProjectMySuffix } from 'app/shared/model/project-my-suffix.model';

type EntityResponseType = HttpResponse<IProjectMySuffix>;
type EntityArrayResponseType = HttpResponse<IProjectMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ProjectMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/projects';

    constructor(private http: HttpClient) {}

    create(project: IProjectMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(project);
        return this.http
            .post<IProjectMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(project: IProjectMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(project);
        return this.http
            .put<IProjectMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IProjectMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProjectMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(project: IProjectMySuffix): IProjectMySuffix {
        const copy: IProjectMySuffix = Object.assign({}, project, {
            startDate: project.startDate != null && project.startDate.isValid() ? project.startDate.toJSON() : null,
            endDate: project.endDate != null && project.endDate.isValid() ? project.endDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((project: IProjectMySuffix) => {
            project.startDate = project.startDate != null ? moment(project.startDate) : null;
            project.endDate = project.endDate != null ? moment(project.endDate) : null;
        });
        return res;
    }
}
