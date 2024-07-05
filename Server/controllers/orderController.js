const Order = require('../models/Order');

// Get all orders for a user (both ongoing and delivered)
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ customer: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get past orders (delivered) for a user
exports.getUserPastOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ customer: userId, status: 'Delivered' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all ongoing and past orders for a provider
exports.getProviderOrders = async (req, res) => {
    try {
        const providerId = req.user.id;
        const orders = await Order.find({ provider: providerId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get past orders (delivered) for a provider
exports.getProviderPastOrders = async (req, res) => {
    try {
        const providerId = req.user.id;
        const orders = await Order.find({ provider: providerId, status: 'Delivered' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update the status of an order
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const validStatuses = ['Pending', 'Accepted', 'Rejected', 'Delivered'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const order = await Order.findOne({ _id: id, provider: req.user.id });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found or not authorized' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
