import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHonorAndRewardMySuffix } from 'app/shared/model/honor-and-reward-my-suffix.model';

type EntityResponseType = HttpResponse<IHonorAndRewardMySuffix>;
type EntityArrayResponseType = HttpResponse<IHonorAndRewardMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class HonorAndRewardMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/honor-and-rewards';

    constructor(private http: HttpClient) {}

    create(honorAndReward: IHonorAndRewardMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(honorAndReward);
        return this.http
            .post<IHonorAndRewardMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(honorAndReward: IHonorAndRewardMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(honorAndReward);
        return this.http
            .put<IHonorAndRewardMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IHonorAndRewardMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHonorAndRewardMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(honorAndReward: IHonorAndRewardMySuffix): IHonorAndRewardMySuffix {
        const copy: IHonorAndRewardMySuffix = Object.assign({}, honorAndReward, {
            date: honorAndReward.date != null && honorAndReward.date.isValid() ? honorAndReward.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((honorAndReward: IHonorAndRewardMySuffix) => {
            honorAndReward.date = honorAndReward.date != null ? moment(honorAndReward.date) : null;
        });
        return res;
    }
}
