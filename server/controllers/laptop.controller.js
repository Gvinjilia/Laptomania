const Laptop = require("../models/laptop.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { imageUpload, deleteImage } = require("../utils/image");

const addLaptop = catchAsync(async (req, res) => {
    const body = req.body;
    // Handle image uploads, create array of image paths of locals
    const images = req.files.map(file => file.path);

    // Sending request to upload images on cloudinary
    const result = await imageUpload('images', images);

    // Creating array of uploaded image public/secure URLS
    const imageUrls = result.map(img => ({url: img.secure_url, public_id: img.public_id}));

    // Assigning image URLs to body before saving to DB
    body.images = imageUrls;

    const newLaptop = await Laptop.create(body);

    res.status(201).json(newLaptop);
});

const getLaptops = catchAsync(async (req, res) => {
    const laptops = await Laptop.find();

    res.status(200).json(laptops);
});

const getLaptop = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const laptop = await Laptop.findById(id);

    if(!laptop){
        return next(new AppError('laptop not found', 404))
    }


    res.status(200).json(laptop)
});

const deleteLaptop = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const laptop = await Laptop.findByIdAndDelete(id);

    const promises = laptop.images.map(img => deleteImage(img.public_id));
    const result = await Promise.all(promises);

    console.log(result);

    if (!laptop) {
        return next(new AppError('Laptop not found to delete', 404));
    }

    res.status(204).json();
});

const updateLaptop = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const updated = await Laptop.findByIdAndUpdate(id, req.body, {
        new: true
    });

    if(!updated){
        return next(new AppError('laptop not found', 404));
    };

    res.status(200).json(updated);
});

module.exports = { getLaptop, getLaptops, deleteLaptop, addLaptop, updateLaptop };