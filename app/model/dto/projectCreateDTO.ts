import {
    IsDate,
    IsOptional,
    IsString, MinLength,
} from 'class-validator';
import {Service} from 'typedi';
import {IProject} from '../../interfaces';

@Service()
export class ProjectCreateDTO implements IProject {
    @IsString()
    @MinLength(10)
    public name: string;

    @IsString()
    @MinLength(10)
    public type: string;

    @IsString()
    @MinLength(5)
    public description: string;

    @IsString()
    @MinLength(5)
    public note: string;

    @IsString()
    @MinLength(5)
    public current_version: string;

    @IsDate()
    @IsOptional()
    public create_at: Date;

    @IsDate()
    @IsOptional()
    public update_at: Date;

    constructor({
                    name,
                    type,
                    description,
                    note,
                    current_version,
                }: IProject) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.note = note;
        this.current_version = current_version;
        this.create_at = new Date();
        this.update_at = new Date();
    }
}
