import {Types, Schema, model} from 'mongoose'

interface ISemester {
    name: string;
}

const semesterSchema = new Schema<ISemester>({
    name: { type: String, required: true },
});

const Semester = model<ISemester>('semesters', semesterSchema);



export default Semester