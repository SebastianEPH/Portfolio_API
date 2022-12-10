export interface IProject {
    name: string,
    type: string,
    description: string,
    note: string,
    current_version: string,

    create_at?: Date | null,
    update_at?: Date | null
}
