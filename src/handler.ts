import {APIGatewayEvent, Context, Handler} from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import 'reflect-metadata';
import Container from 'typedi';
import {ProjectController} from './controller/projectController';
import {connectDatabase} from './database/conecction_';
// import {connectToProjectDatabase} from './model';

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
    // await connectToProjectDatabase();
    await connectDatabase();
    return projectController.getAll(event);
};

export const create: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // await connectToProjectDatabase();
    await connectDatabase();
    return projectController.create(event);
};


