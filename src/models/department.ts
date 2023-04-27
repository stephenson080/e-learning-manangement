import {Types, Schema, model} from 'mongoose'

interface IDepartment {
    name: string;
    code: string;
}

const departmentSchema = new Schema<IDepartment>({
    name: { type: String, required: true },
    code: { type: String, required: true },
});

const Department = model<IDepartment>('department', departmentSchema);



export default Department