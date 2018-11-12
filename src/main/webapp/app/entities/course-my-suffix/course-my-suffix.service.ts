import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';

type EntityResponseType = HttpResponse<ICourseMySuffix>;
type EntityArrayResponseType = HttpResponse<ICourseMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CourseMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/courses';

    constructor(private http: HttpClient) {}

    create(course: ICourseMySuffix): Observable<EntityResponseType> {
        return this.http.post<ICourseMySuffix>(this.resourceUrl, course, { observe: 'response' });
    }

    update(course: ICourseMySuffix): Observable<EntityResponseType> {
        return this.http.put<ICourseMySuffix>(this.resourceUrl, course, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ICourseMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICourseMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
