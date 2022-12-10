import {APIGatewayEvent, Context, Handler} from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import 'reflect-metadata';
import Container from 'typedi';
import {ProjectController} from './controller/projectController';
import {connectToProjectDatabase} from './model';

const dotenvPath = path.join(
    __dirname,
    '../',
    `config/.env.${process.env.NODE_ENV}`
);
dotenv.config({
    path: dotenvPath
});

const projectController = Container.get(ProjectController);


export const getAll: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectToProjectDatabase();
    // return projectController.getAll(event);
    return event;
};

export const create: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectToProjectDatabase();
    return projectController.create(event);
};


