import { useNavigate } from 'react-router-dom';
import React from 'react';
import CartIcon from './cart_icon';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../cartSlice';

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const navigate = useNavigate();
    const handleIncrement = (item) => {
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
        }else{
            dispatch(removeFromCart(item.id));
        }
    };

    const handleDelete = (id) => {
        dispatch(removeFromCart(id));
    };

    let cartValue = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);


    return (
        <div className="h-screen bg-gray-50 w-screen">
            <div className="relative flex h-2/12 bg-green-700 w-full p-3 items-center ">
                <div className='flex items-center hover:cursor-pointer' onClick={() => navigate('/')}>
                    <img src='/logo.jpg' className='h-12 w-12 rounded-full' alt="logo" />
                    <div className='w-2'></div>
                    <div className="flex-col text-white md:text-xl">
                        <h1>Green Gardens</h1>
                        <h1>Nursery</h1>
                    </div>
                </div>

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-3xl md:text-5xl">
                    Cart
                </h1>

                <div className="ml-auto hover:cursor-pointer" onClick={() => navigate('/cart')}>
                    <CartIcon count={totalQuantity} />
                </div>
            </div>

            <div className='flex flex-col justify-center w-full h-10/12 gap-6 text-center items-center'>
                <div className='text-2xl'>Total Cart Value: ${cartValue}</div>
                <div className='flex items-center justify-center w-full'> {cartItems.length > 0 &&
                    <div className="w-3/4 max-h-[70vh] overflow-y-scroll border-green-700 border-2 p-4 space-y-4">
                        {cartItems.map((item, index) => {
                            const { id, name, price, imageUrl, quantity } = item;

                            return (
                                <div key={index} className='flex w-full gap-4 border-b pb-4'>
                                    <img src={imageUrl} className='w-2/5 h-1/5 object-cover' alt={name} />

                                    <div className='flex flex-col justify-between w-3/5 items-center text-center'>
                                        <p className='text-2xl'>{name}</p>
                                        <p className='text-lg'>Price: ${price}</p>

                                        <div className='flex items-center justify-center gap-4 mt-2'>
                                            <button
                                                onClick={() => handleDecrement(item)}
                                                className='rounded bg-gray-300 px-3 py-1 text-lg'>
                                                -
                                            </button>

                                            <p className='text-lg'>{quantity}</p>

                                            <button
                                                onClick={() => handleIncrement(item)}
                                                className='rounded bg-gray-300 px-3 py-1 text-lg'>
                                                +
                                            </button>
                                        </div>

                                        <p className='text-xl mt-2'>Total: ${(price * quantity).toFixed(2)}</p>

                                        <button
                                            onClick={() => handleDelete(id)}
                                            className='rounded bg-red-400 px-4 py-1 text-white w-1/3 mt-2'>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }
                </div>
                <button
                    className="bg-green-600 text-white w-1/4 py-2 rounded hover:bg-green-700 transition"
                    onClick={() => navigate('/product')}>
                    Continue shopping
                </button>

                <button className="bg-green-600 text-white w-1/4 py-2 rounded hover:bg-green-700 transition">
                    Checkout
                </button>
            </div>
        </div>
    );
}
export default Cart;