import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
    products: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    total_amount: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    address: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "Payment Done"
    },
}, {timestamps: true}); 

export default mongoose.model("Orders", OrdersSchema);