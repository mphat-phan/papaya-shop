import mongoose from 'mongoose';


const supplierSchema = mongoose.Schema(
    {
        name:
        {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        timestamps: true,
    }
);
const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;