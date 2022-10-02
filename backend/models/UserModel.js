import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//User Schema
const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

//Encrypt password before save to database
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

const User = mongoose.model('User', userSchema);

export default User;

