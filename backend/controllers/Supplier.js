import Supplier from '../models/Supplier.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc    Create/ a new Supplier
 * @route   POST /api/users
 * @access  Private
 */
 const createSupplier = asyncHandler(async (req, res) => {
    
    const {name} = req.body;
    Supplier.findOne({ name }, (err, supplier)=>{
        //Check User Existed
        if(supplier){
            return res.status(400).json({
                error: 'Name Already Existed'
            });
        }

        //Creat New User
        Supplier.create({name}, (err, supplier) =>{
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            res.status(201).json({
                _id: supplier._id,
                name: supplier.name,
            });
        });

    });
})

/**
 * @desc    Create/ a new Supplier
 * @route   POST /api/users
 * @access  Private
 */
const deleteSupplier = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const supplier = Supplier.findById(id);
    
    if(supplier){
        await supplier.remove();   
        return res.status(202).json({
            message: "Supplier Delete Successfully"
        })
    }
    return res.status(202).json({
        message: "Supplier not found"
    })
    
})

const getSuppliers = asyncHandler(async (req,res) => {
    if(req.query.option === "all"){
        const supplier = await Supplier.find({});
        res.json({supplier});
    }
    else{
        //mốt làm
    }
})

const getSupplierByID = asyncHandler(async (req,res) => {
    const {id} = req.params;
    const supplier = await Supplier.findById(id);
    if(supplier){
        res.json({supplier});
    }
    else{
        res.status(404).json({
            message: "Supplier not found"
        })
    }
})

const updateSupplier = asyncHandler(async (req,res) => {
    const {name} = req.body;
    const {id} = req.params;
    const supplier = await Supplier.findById(id);
    if(supplier){
        supplier.name = name || supplier.name;
        const updateSupplier = await supplier.save();
        res.json({supplier: updateSupplier});
    }
    else{
        res.status(404).json({
            message: "Supplier not found"
        })
    }
})

export {
    createSupplier,
    deleteSupplier,
    getSupplierByID,
    getSuppliers,
    updateSupplier
};
