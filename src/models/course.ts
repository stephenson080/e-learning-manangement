import {Types, Schema, model} from 'mongoose'

interface ICourse {
    name: string;
    code: string;
    department: Types.ObjectId
    level: Types.ObjectId
    semester: Types.ObjectId
}

const courseSchema = new Schema<ICourse>({
    name: { type: String, required: true },
    code: { type: String, required: true },
    level: { type: Schema.Types.ObjectId, ref: 'levels' },
    department: { type: Schema.Types.ObjectId, ref: 'departments' },
    semester: { type: Schema.Types.ObjectId, ref: 'semesters' }
});

const Course = model<ICourse>('courses', courseSchema);



export default Course