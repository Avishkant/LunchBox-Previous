const Cart = require('../models/Cart');
const User = require('../models/User');

// Add dish to the cart
const addDishToCart = async (req, res) => {
  try {
      const { userId, dishName, price, quantity } = req.body;
      let cart = await Cart.findOne({ userId });

      if (cart) {
          // Check if dish already exists
          const dishIndex = cart.items.findIndex(item => item.dishName === dishName);
          if (dishIndex > -1) {
              cart.items[dishIndex].quantity += quantity;  // Increment quantity
              if (cart.items[dishIndex].quantity <= 0) {
                  cart.items.splice(dishIndex, 1);  // Remove dish if quantity is zero or less
              }
          } else {
              cart.items.push({ dishName, price, quantity });
          }
          await cart.save();
      } else {
          // Create a new cart if it doesn't exist
          cart = new Cart({
              userId,
              items: [{ dishName, price, quantity }]
          });
          await cart.save();
      }

      res.status(200).json({ success: true, message: 'Dish added to cart', cart });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};


// Get user's cart
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove dish from the cart
const removeDishFromCart = async (req, res) => {
    try {
        const { userId, dishName } = req.body;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        // Filter out the dish to be removed
        cart.items = cart.items.filter(item => item.dishName !== dishName);
        await cart.save();

        res.status(200).json({ success: true, message: 'Dish removed from cart', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Increment dish quantity
const incrementDishQuantity = async (req, res) => {
    try {
        const { userId, dishName } = req.body;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const dish = cart.items.find(item => item.dishName === dishName);
        if (!dish) {
            return res.status(404).json({ success: false, message: 'Dish not found in cart' });
        }

        dish.quantity += 1;  // Increment quantity
        await cart.save();

        res.status(200).json({ success: true, message: 'Dish quantity incremented', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Decrement dish quantity
const decrementDishQuantity = async (req, res) => {
    try {
        const { userId, dishName } = req.body;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const dish = cart.items.find(item => item.dishName === dishName);
        if (!dish) {
            return res.status(404).json({ success: false, message: 'Dish not found in cart' });
        }

        dish.quantity -= 1;  // Decrement quantity
        if (dish.quantity <= 0) {
            cart.items = cart.items.filter(item => item.dishName !== dishName);  // Remove dish if quantity is zero
        }
        await cart.save();

        res.status(200).json({ success: true, message: 'Dish quantity decremented', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    addDishToCart,
    getCart,
    removeDishFromCart,
    incrementDishQuantity,
    decrementDishQuantity
};
