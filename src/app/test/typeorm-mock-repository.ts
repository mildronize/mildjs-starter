import { Repository } from 'typeorm';

export class MockRepository<T> extends Repository<T>{

    constructor(private store: T[]) { super(); }

    public find(): Promise<T[]> {
        return new Promise(resolve => resolve(this.store));
    }
}