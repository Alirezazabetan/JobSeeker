import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'jobFilter',
    pure: false
})
export class JobFilterPipe implements PipeTransform {
    transform(jobs: any, term?: any[]): any[] {
        if (jobs) {
            return (jobs = jobs.filter(job => {
                return term && term.length ? term.indexOf(job.jobType) != -1 : jobs;
            }));
        } else {
            return jobs;
        }
    }
}
