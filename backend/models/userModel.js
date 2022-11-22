import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
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
    address: {
      type: String,
      default: '',
      
    }, 
    city: {
      type: String,
      default: '',
    },
    postalCode: {
      type: Number,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Check password when login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before save it to database
userSchema.pre('save', async function (next) {
  // Neu edit profile ma khong phai la password thi khong hash lai password
  if (!this.isModified('password')) {
    next();
  }

  // Generate number of rounds
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
