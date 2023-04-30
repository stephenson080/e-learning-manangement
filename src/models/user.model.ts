import {Types, Schema, model} from 'mongoose'
import { Role } from '../utils/types';

interface IUser {
    name: string;
    regNo: string;
    role: string;
    password: string
    level: Types.ObjectId
    department: Types.ObjectId
    courses: Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    password: { type: String, required: true },
    // And `Schema.Types.ObjectId` in the schema definition.
    role: { type: String, default: Role.USER  },
    level: { type: Schema.Types.ObjectId, ref: 'levels' },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    courses: {type: [Schema.Types.ObjectId], ref: 'courses'}
});

const User = model<IUser>('users', userSchema);

export default User