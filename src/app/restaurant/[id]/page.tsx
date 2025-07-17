'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating: number;
  reviews: number;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  offer: string;
  address: string;
  phone: string;
  description: string;
  menu: MenuItem[];
  reviews: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export default function RestaurantDetail() {
  const params = useParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<{[key: number]: number}>({});

  const restaurants: {[key: string]: Restaurant} = {
    '1': {
      id: 1,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.5,
      deliveryTime: "25-30 mins",
      image: "🍕",
      offer: "50% OFF up to ₹100",
      address: "123 Main Street, Downtown",
      phone: "+1 234-567-8900",
      description: "Authentic Italian pizzas made with fresh ingredients and traditional recipes. Experience the taste of Italy right at your doorstep.",
      menu: [
        {
          id: 1,
          name: "Margherita Pizza",
          description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
          price: 299,
          image: "🍕",
          category: "Pizza",
          isVeg: true,
          rating: 4.6,
          reviews: 245
        },
        {
          id: 2,
          name: "Pepperoni Pizza",
          description: "Spicy pepperoni with mozzarella cheese and tomato sauce",
          price: 399,
          image: "🍕",
          category: "Pizza",
          isVeg: false,
          rating: 4.4,
          reviews: 189
        },
        {
          id: 3,
          name: "Garlic Bread",
          description: "Crispy bread with garlic butter and herbs",
          price: 149,
          image: "🥖",
          category: "Sides",
          isVeg: true,
          rating: 4.3,
          reviews: 156
        },
        {
          id: 4,
          name: "Caesar Salad",
          description: "Fresh romaine lettuce with caesar dressing and croutons",
          price: 199,
          image: "🥗",
          category: "Salads",
          isVeg: true,
          rating: 4.2,
          reviews: 98
        },
        {
          id: 5,
          name: "Tiramisu",
          description: "Classic Italian dessert with coffee and mascarpone",
          price: 179,
          image: "🍰",
          category: "Desserts",
          isVeg: true,
          rating: 4.7,
          reviews: 134
        }
      ],
      reviews: [
        {
          id: 1,
          user: "John D.",
          rating: 5,
          comment: "Amazing pizza! The crust was perfect and ingredients were fresh.",
          date: "2 days ago"
        },
        {
          id: 2,
          user: "Sarah M.",
          rating: 4,
          comment: "Good food and quick delivery. Will order again.",
          date: "1 week ago"
        },
        {
          id: 3,
          user: "Mike R.",
          rating: 5,
          comment: "Best Italian food in the city! Highly recommended.",
          date: "2 weeks ago"
        }
      ]
    },
    '2': {
      id: 2,
      name: "Burger Junction",
      cuisine: "American",
      rating: 4.3,
      deliveryTime: "20-25 mins",
      image: "🍔",
      offer: "Buy 1 Get 1 Free",
      address: "456 Oak Avenue, City Center",
      phone: "+1 234-567-8901",
      description: "Juicy burgers and crispy fries made with premium ingredients. Your go-to place for American comfort food.",
      menu: [
        {
          id: 6,
          name: "Classic Burger",
          description: "Beef patty with lettuce, tomato, onion, and special sauce",
          price: 249,
          image: "🍔",
          category: "Burgers",
          isVeg: false,
          rating: 4.4,
          reviews: 312
        },
        {
          id: 7,
          name: "Cheese Burger",
          description: "Classic burger with melted cheese",
          price: 279,
          image: "🍔",
          category: "Burgers",
          isVeg: false,
          rating: 4.5,
          reviews: 278
        },
        {
          id: 8,
          name: "Chicken Wings",
          description: "Spicy buffalo wings with ranch dip",
          price: 329,
          image: "🍗",
          category: "Sides",
          isVeg: false,
          rating: 4.3,
          reviews: 156
        }
      ],
      reviews: [
        {
          id: 4,
          user: "Alex K.",
          rating: 4,
          comment: "Great burgers! The fries were crispy and delicious.",
          date: "3 days ago"
        }
      ]
    }
  };

  const restaurant = restaurants[params.id as string];

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Restaurant not found</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const categories = ['All', ...Array.from(new Set(restaurant.menu.map(item => item.category)))];
  const filteredMenu = activeCategory === 'All' 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === activeCategory);

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, count]) => {
      const item = restaurant.menu.find(m => m.id === parseInt(itemId));
      return total + (item ? item.price * count : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="text-orange-600 hover:text-orange-700 mr-4"
              >
                ← Back
              </button>
              <h1 className="text-2xl font-bold text-orange-600">FoodieExpress</h1>
            </div>
            <div className="flex items-center space-x-4">
              {getTotalItems() > 0 && (
                <div className="bg-orange-600 text-white px-4 py-2 rounded-lg">
                  Cart ({getTotalItems()}) - ₹{getTotalPrice()}
                </div>
              )}
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Restaurant Info */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-6xl">{restaurant.image}</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
                  <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                  <p className="text-gray-600 mb-4">{restaurant.description}</p>
                </div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {restaurant.offer}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center">
                  <span className="text-green-600 font-bold text-lg">★ {restaurant.rating}</span>
                  <span className="text-gray-600 ml-2">Rating</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-800 font-bold text-lg">{restaurant.deliveryTime}</span>
                  <span className="text-gray-600 ml-2">Delivery</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-800 font-bold text-lg">₹50</span>
                  <span className="text-gray-600 ml-2">Delivery Fee</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-gray-600 mb-2">📍 {restaurant.address}</p>
                <p className="text-gray-600">📞 {restaurant.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
          <div className="space-y-6">
            {filteredMenu.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                        item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.isVeg ? '🟢 VEG' : '🔴 NON-VEG'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center mb-3">
                      <span className="text-green-600 font-bold">★ {item.rating}</span>
                      <span className="text-gray-600 ml-2">({item.reviews} reviews)</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">₹{item.price}</p>
                  </div>
                  
                  <div className="flex flex-col items-center ml-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-3xl">{item.image}</span>
                    </div>
                    
                    {cart[item.id] ? (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700"
                        >
                          -
                        </button>
                        <span className="font-bold text-lg">{cart[item.id]}</span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item.id)}
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {restaurant.reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-orange-600">{review.user.charAt(0)}</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-800">{review.user}</p>
                      <p className="text-sm text-gray-600">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 font-bold">★ {review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 right-6">
          <button className="bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-700 transition-colors">
            View Cart ({getTotalItems()}) - ₹{getTotalPrice()}
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">FoodieExpress</h4>
              <p className="text-gray-400">Delivering happiness, one meal at a time.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FoodieExpress. All rights reserved. Designed by VibeStud.io</p>
          </div>
        </div>
      </footer>
    </div>
  );
}