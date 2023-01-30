import {APIGatewayEvent, Context, Handler} from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import 'reflect-metadata';
import Container from 'typedi';
import {ProgrammingController, ProjectController, LibrariesController, FrameworksController} from './controller';
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
const programmingLanguage = Container.get(ProgrammingController);
const librariesController = Container.get(LibrariesController)
const framwworkController = Container.get(FrameworksController)


export const projectGetAll: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // await connectToProjectDatabase();
    await connectDatabase();
    return projectController.getAll(event);
};

export const projectCreate: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // await connectToProjectDatabase();
    await connectDatabase();
    return projectController.create(event);
};

export const programmingLanguageCreate: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('event: ', event)
    await connectDatabase();
    return programmingLanguage.create(event);
};

export const frameworkCreate: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('event: ', event)
    await connectDatabase();
    return framwworkController.create(event);
};

export const librariesCreate: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('event: ', event)
    await connectDatabase();
    return librariesController.create(event);
};