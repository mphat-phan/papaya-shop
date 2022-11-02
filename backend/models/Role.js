import mongoose from 'mongoose';

//Role Schema
const roleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            max: 32,
            required: true,
            unique: true,
            lowercase: true,
        }
    },
    {
        timestamps: true,
    }
)

const Role = mongoose.model('Role', roleSchema);

export default Role;