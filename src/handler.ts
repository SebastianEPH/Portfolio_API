import {APIGatewayEvent, Context, Handler} from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import 'reflect-metadata';
import Container from 'typedi';
import {ProgrammingLanguageController, ProjectController, LibrariesController, FrameworksController} from './controller';
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
const programmingLanguage = Container.get(ProgrammingLanguageController);
const librariesController = Container.get(LibrariesController)
const framwworkController = Container.get(FrameworksController)


export const getAllProject: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectDatabase();
    return projectController.getAll(event);
};

export const addProject: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectDatabase();
    return projectController.create(event);
};

export const addProgrammingLanguages: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectDatabase();
    return programmingLanguage.create(event);
};
export const getAllProgrammingLanguages: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectDatabase();
    return programmingLanguage.getAllFilters(event);
};
export const getProgrammingLanguages: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectDatabase();
    return programmingLanguage.getById(event);
};

export const frameworkCreate: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectDatabase();
    return framwworkController.create(event);
};

export const librariesCreate: Handler = async (event: APIGatewayEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    await connectDatabase();
    return librariesController.create(event);
};