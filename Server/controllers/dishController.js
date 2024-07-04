// const Dish = require('../models/Dish');
// const Tiffin = require('../models/Tiffin');

// // Create a new dish
// const createDish = async (req, res) => {
//     try {
//         const { name, images } = req.body;
//         const { userId } = req;

//         if (!name || !images) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Name and tiffinId are required',
//             });
//         }

//         const tiffin = await Tiffin.findById(tiffinId);
//         if (!tiffin || tiffin.provider.toString() !== userId) {
//             return res.status(403).json({ success: false, message: 'Unauthorized' });
//         }

//         const newDish = new Dish({
//             name,
//             images,
//         });

//         await newDish.save();

//         tiffin.dishes.push(newDish._id);
//         await tiffin.save();

//         res.status(201).json({ success: true, message: 'Dish added to tiffin successfully', dish: newDish });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Delete a dish from a tiffin
// const deleteDish = async (req, res) => {
//     try {
//         const { dishId, tiffinId } = req.body;
//         const { userId } = req;

//         const tiffin = await Tiffin.findById(tiffinId).populate('dishes');
//         if (!tiffin || tiffin.provider.toString() !== userId) {
//             return res.status(403).json({ success: false, message: 'Unauthorized' });
//         }

//         if (!tiffin.dishes.includes(dishId)) {
//             return res.status(404).json({ success: false, message: 'Dish not found in this tiffin' });
//         }

//         await Tiffin.findByIdAndUpdate(tiffinId, {
//             $pull: { dishes: dishId }
//         });

//         await Dish.findByIdAndDelete(dishId);

//         res.status(200).json({ success: true, message: 'Dish removed from tiffin successfully' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Update a dish
// const updateDish = async (req, res) => {
//     try {
//         const { dishId, name, images } = req.body;
//         const { userId } = req;

//         if (!dishId) {
//             return res.status(400).json({ success: false, message: 'DishId is required' });
//         }

//         const dish = await Dish.findById(dishId);
//         if (!dish) {
//             return res.status(404).json({ success: false, message: 'Dish not found' });
//         }

//         const tiffin = await Tiffin.findOne({ dishes: dishId });
//         if (!tiffin || tiffin.provider.toString() !== userId) {
//             return res.status(403).json({ success: false, message: 'Unauthorized' });
//         }

//         dish.name = name || dish.name;
//         dish.images = images || dish.images;

//         await dish.save();

//         res.status(200).json({ success: true, message: 'Dish updated successfully', dish });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// module.exports = {
//     createDish,
//     deleteDish,
//     updateDish,
// };
