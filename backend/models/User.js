import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//User Schema
const userSchema = mongoose.Schema(
    {
        name: {
          type: String,
          trim: true,
          required: true,
          max: 32
        },
        email: {
          type: String,
          trim: true,
          required: true,
          unique: true,
          lowercase: true,
        },
        password: {
          type: String,
          required: true,
        },
        isStatus: {
          type: Boolean,
          required: true,
          default: true,
        },
        avatar: {
          type: String,
          default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        address: [
            {
                addressCode: {
                  type: String,
                  default: '',
                },
                street: {
                  type: String,
                  default: '',
                },
                district: {
                  type: String,
                  default: '',
                },
                city: {
                  type: String,
                  default: '',
                },
                country: {
                  type: String,
                  default: '',
                }
            }
        ]
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

