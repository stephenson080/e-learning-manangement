import {Types, Schema, model} from 'mongoose'

interface ILevel {
    name: string;
}

const levelSchema = new Schema<ILevel>({
    name: { type: String, required: true },
});

const Level = model<ILevel>('levels', levelSchema);



export default Level