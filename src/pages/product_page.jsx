import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartIcon from './cart_icon';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync } from '../cartSlice';

const categories = [
    {
        name: 'Air Purifying Plants',
        items: [
            ["ZZ Plant", 14, "/zzplant.jpg", "Absorbs CO2 at night, perfect for bedrooms."],
            ["Areca Palm", 22, "/areca.jpg", "Filters benzene and toluene from the air."],
            ["English Ivy", 10, "/ivy.jpg", "Removes airborne mold and allergens."],
        ],
    },
    {
        name: 'Indoor Plants',
        items: [
            ["Pothos", 9, "/pothos.jpg", "Thrives in low light and needs little care."],
            ["Philodendron", 16, "/philo.jpg", "Great for decorating shelves and corners."],
            ["Chinese Evergreen", 18, "/evergreen.jpg", "Tolerates dry air and low light."],
        ],
    },
    {
        name: 'Medicinal Plants',
        items: [
            ["Aloe Vera", 11, "/aloe.jpg", "Soothes burns and improves skin health."],
            ["Tulsi (Holy Basil)", 8, "/tulsi.jpg", "Used in Ayurveda for stress and immunity."],
            ["Mint", 7, "/mint.jpg", "Great for digestion and fresh breath."],
        ],
    },
];

function CartAddButton({ name, price, image }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const id = name;

    const alreadyInCart = cartItems.some(item => item.id === id);

    const handleAddToCart = () => {
        const product = {
            id,
            name,
            price,
            imageUrl: image,
            quantity: 1
        };
        dispatch(addToCartAsync(product));
    };

    return alreadyInCart ? (
        <button className="bg-gray-300 text-white w-full py-2 rounded">
            Item added to cart
        </button>
    ) : (
        <button
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition"
            onClick={handleAddToCart}
        >
            Add to Cart
        </button>
    );
}



function ProductPage() {
    const { items: cartItems } = useSelector(state => state.cart);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const navigate = useNavigate();
    return (
        <div className="h-screen bg-gray-50  w-screen">
            <div className="relative flex h-2/12 bg-green-700 w-full py-3 px-10 items-center ">
                <div className='flex items-center hover:cursor-pointer' onClick={() => navigate('/')}>
                    <img
                        src={`${import.meta.env.BASE_URL}logo.jpg`}
                        className="h-12 w-12 rounded-full"
                        alt="Logo"
                    />

                    <div className='w-2'>
                    </div>
                    <div className="flex-col text-white md:text-xl">
                        <h1>Green Gardens</h1>
                        <h1>Nursery</h1>
                    </div>
                </div>

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white md:text-3xl">
                    Plants For Sale
                </h1>

                <div className="ml-auto hover:cursor-pointer" onClick={() => navigate('/cart')}>
                    <CartIcon count={totalQuantity} />
                </div>
            </div>

            <br />
            <div className='flex-col h-10/12 px-4'>
                {categories.map((category, index) => (
                    <section key={index} className="mb-10">
                        <h2 className="text-2xl font-bold text-center mb-6 border-b pb-2">
                            {category.name}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {category.items.map(([name, price, image, description], idx) => (
                                <div
                                    key={idx}
                                    className="bg-white border-4 border-green-300 p-4 rounded shadow relative"
                                >
                                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                        SALE
                                    </span>
                                    <h3 className="text-lg font-semibold text-center">{name}</h3>
                                    <img
                                        src={`${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`}
                                        alt={name}
                                        className="w-full h-48 object-contain my-4"
                                    />

                                    <p className="text-green-600 text-center font-semibold">${price}</p>
                                    <p className="text-center text-sm mb-4">{description}</p>
                                    <CartAddButton name={name} price={price} image={image} />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

            </div>
        </div>
    );
}

export default ProductPage;
