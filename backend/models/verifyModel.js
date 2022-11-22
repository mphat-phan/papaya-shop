import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const verifySchema = mongoose.Schema(
    {
        email: {
            type: String
        },
        otp: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);

verifySchema.methods.matchOTP = async function (enteredOTP) {
    return await bcrypt.compare(enteredOTP, this.otp);
};
  
  // Encrypt password before save it to database
verifySchema.pre('save', async function (next) {
    // Neu edit profile ma khong phai la password thi khong hash lai password
    // if (!this.isModified('password')) {
    //   next();
    // }
    // Generate number of rounds
    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(this.otp, salt);
});

const Verify = mongoose.model('Verify', verifySchema);

export default Verify;