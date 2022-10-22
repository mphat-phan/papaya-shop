import Brand from '../models/Brand.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc    Create/ a new Brand
 * @route   POST /api/users
 * @access  Private
 */
 const createBrand = asyncHandler(async (req, res) => {
    
    const {name} = req.body;
    Brand.findOne({ name }, (err, brand)=>{
        //Check User Existed
        if(brand){
            return res.status(400).json({
                error: 'Name Already Existed'
            });
        }

        //Creat New User
        Brand.create({name}, (err, brand) =>{
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            res.status(201).json({
                _id: brand._id,
                name: brand.name,
            });
        });

    });
})

/**
 * @desc    Create/ a new Brand
 * @route   POST /api/users
 * @access  Private
 */
const deleteBrand = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const brand = Brand.findById(id);
    
    if(brand){
        await brand.remove();   
        return res.status(202).json({
            message: "Brand Delete Successfully"
        })
    }
    return res.status(202).json({
        message: "Brand not founded"
    })
    
})

const getBrands = asyncHandler(async (req,res) => {
    if(req.query.option === "all"){
        const brands = await Brand.find({});
        res.json({brands});
    }
    else{
        //mốt làm
    }
})

const getBrandByID = asyncHandler(async (req,res) => {
    const {id} = req.params;
    const brand = await Brand.findById(id);
    if(brand){
        res.json({brand});
    }
    else{
        res.status(404).json({
            message: "Brand not found"
        })
    }
})

const updateBrand = asyncHandler(async (req,res) => {
    const {name} = req.body;
    const {id} = req.params;
    const brand = await Brand.findById(id);
    if(brand){
        brand.name = name || brand.name;
        console.log('hello')
        const updateBrand = await brand.save();
        res.json({brand: updateBrand});
    }
    else{
        res.status(404).json({
            message: "Brand not found"
        })
    }
})

export {
    createBrand,
    deleteBrand,
    getBrandByID,
    getBrands,
    updateBrand
};
