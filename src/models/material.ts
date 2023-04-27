import {Types, Schema, model} from 'mongoose'

interface IMaterial {
    url: string;
    course: Types.ObjectId
}

const materialSchema = new Schema<IMaterial>({
    url: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'courses' },
});

const Material = model<IMaterial>('materials', materialSchema);



export default Material