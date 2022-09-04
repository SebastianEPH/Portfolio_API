import {NextFunction, Request, Response} from 'express';
import check from '../middleware/CheckField';
import Project from "../models/Project.Model";
import ResponseDB from "../models/ResponseDB";

class ProjectController {
    private id:string = 'projects_id';
    public queryGetAll = [
        check.offset,
        check.limit
    ]

    public async getAll(req: Request, res: Response) {
        try {
            const {offset, limit} = req.query
            const data = await Project.find()
                .limit(Number(limit || 100))
                .skip(Number(offset || 1))
                .select("-__v");

            res.status(200).json( new ResponseDB({status: 200, data}).send())
        } catch (errors) {
            res.status(500).json(new ResponseDB({status: 500, errors, data: null}).send())
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            const data = await Project.findById(req.params[this.id]);
            if (!data) return res.status(404).json(new ResponseDB({status: 404, data}).send())

            res.status(200).json(new ResponseDB({status: 200, data}).send())
        } catch (errors) {
            res.status(500).json(new ResponseDB({status: 500, data: null}).send())
        }
    }

    public updatefrom = [
        check.name.optional(),
        check.lastname.optional(),
        check.username.optional()
    ]

    public async updateOne(req: Request, res: Response) {
        const url = req.hostname + req.originalUrl
        try {
            const user = await Project.findOneAndUpdate(
                {_id: req.params.users_id},
                req.body, {
                    new: true,
                });
            if (!user) return res.status(404).json(new ResponseDB({status: 404, data: user}).send())
            res.status(200).json(new ResponseDB({status: 200, data: user}).send())
        } catch (errors) {
            res.status(500).json(new ResponseDB({status: 500, errors, data: null}).send())
        }
    }

    public async remove(req: Request, res: Response) {
        try {
            const data = await Project.findByIdAndDelete(req.params.projects_id)
            if (!data) return res.status(404).json(new ResponseDB({status: 404, data}).send())
            res.status(200).json(new ResponseDB({status: 200, data}).send())
        } catch (errors) {
            res.status(500).json(new ResponseDB({status: 500, errors, data: null}).send())
        }
    }

    public fieldsNew = [
        check.name.optional(),
        check.url_deploy.optional(),
        check.url_repository.optional(),
        check.url_documentation.optional(),
        check.description.optional(),
        check.description_short.optional(),
        check.note.optional(),
        check.date_start.optional(),
        check.date_finish.optional(),
        check.url_img.optional(),
        check.current_version.optional(),
        check.architecture.optional(),
        check.current_state.optional(),
        check.size.optional(),
        check.platform.optional(),
        check.licence.optional(),
        check.software_editor.optional()
    ]

    public async addNew(req: Request, res: Response, next: NextFunction) {
        try {
            const user = new Project(req.body)
            await user.save();
            res.status(200).json(new ResponseDB({status: 200, data: user}).send())
        } catch (errors) {
            res.status(500).json(new ResponseDB({status: 500, errors, data: null}).send())
        }
    }
}

const projectController = new ProjectController();
export default projectController;