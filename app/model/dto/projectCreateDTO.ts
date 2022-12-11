import {
    IsArray,
    IsDate, IsDateString, IsIn,
    IsOptional,
    IsString, IsUrl, MinLength,
} from 'class-validator';
import {Service} from 'typedi';
import {IProject} from '../../interfaces';

@Service()
export class ProjectCreateDTO implements IProject {
    @IsString()
    @MinLength(5)
    public readonly name: string;

    @IsString()
    @IsOptional()
    public readonly type: string;

    @IsString()
    @IsIn(['practica', 'básico', 'intermedio', 'avanzado'])
    @IsOptional()
    public readonly difficulty_level: string;

    @IsString()
    @IsOptional()
    public readonly short_description: string;

    @IsString()
    @IsOptional()
    public readonly description: string;

    @IsString()
    @IsOptional()
    public readonly note: string;

    @IsUrl()
    @IsOptional()
    public readonly url_repository: string;

    @IsUrl()
    @IsOptional()
    public readonly url_documentation: string;

    @IsUrl()
    @IsOptional()
    public readonly url_img: string;

    @IsUrl()
    @IsOptional()
    public readonly url_web_deploy: string;

    @IsDateString()
    @IsOptional()
    public readonly date_init: Date;

    @IsDateString()
    @IsOptional()
    public readonly date_finish: Date;

    @IsString()
    @IsOptional()
    public readonly current_version: string;

    @IsString({each: true})
    @IsArray()
    @IsOptional()
    public readonly architecture_support: [string];

    @IsString()
    @IsOptional()
    public readonly state: string;

    @IsString()
    @IsOptional()
    public readonly size: string;

    @IsString()
    @IsOptional()
    public readonly licence: string;

    @IsDate()
    @IsOptional()
    public readonly create_at: Date;

    @IsDate()
    @IsOptional()
    public readonly update_at: Date;

    constructor({
                    name,
                    type,
                    difficulty_level,
                    short_description,
                    description,
                    note,
                    url_repository,
                    url_documentation,
                    url_img,
                    url_web_deploy,
                    date_init,
                    date_finish,
                    current_version,
                    architecture_support,
                    state,
                    size,
                    licence,
                }: IProject) {
        this.name = name
        this.type = type;
        this.difficulty_level = difficulty_level;
        this.short_description = short_description;
        this.description = description;
        this.note = note;
        this.url_repository = url_repository;
        this.url_documentation = url_documentation;
        this.url_img = url_img;
        this.url_web_deploy = url_web_deploy;
        this.date_init = date_init;
        this.date_finish = date_finish;
        this.current_version = current_version;
        this.architecture_support = architecture_support;
        this.state = state;
        this.size = size;
        this.licence = licence;
        this.create_at = new Date();
        this.update_at = new Date();
    }
}