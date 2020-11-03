import { Test } from 'route-controller';
// import express from "express";
import { Container, Service } from 'typedi';
import { UsersService } from './users.service';

describe('Test Module: Providers', () => {
    let usersService: UsersService;

    beforeEach(async () => {
        const module = await new Test(Container).createTestingModule({
            providers: [UsersService],
        });

        usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(usersService).toBeDefined();
    });

});