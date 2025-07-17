'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.5,
      deliveryTime: "25-30 mins",
      image: "🍕",
      offer: "50% OFF up to ₹100",
      dishes: ["Margherita Pizza", "Pepperoni Pizza", "Garlic Bread"]
    },
    {
      id: 2,
      name: "Burger Junction",
      cuisine: "American",
      rating: 4.3,
      deliveryTime: "20-25 mins",
      image: "🍔",
      offer: "Buy 1 Get 1 Free",
      dishes: ["Classic Burger", "Cheese Burger", "Chicken Wings"]
    },
    {
      id: 3,
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.6,
      deliveryTime: "30-35 mins",
      image: "🍛",
      offer: "₹125 OFF above ₹249",
      dishes: ["Butter Chicken", "Biryani", "Naan"]
    },
    {
      id: 4,
      name: "Sushi Express",
      cuisine: "Japanese",
      rating: 4.4,
      deliveryTime: "35-40 mins",
      image: "🍣",
      offer: "Free Delivery",
      dishes: ["California Roll", "Salmon Sashimi", "Miso Soup"]
    },
    {
      id: 5,
      name: "Taco Fiesta",
      cuisine: "Mexican",
      rating: 4.2,
      deliveryTime: "25-30 mins",
      image: "🌮",
      offer: "30% OFF",
      dishes: ["Chicken Tacos", "Beef Burrito", "Nachos"]
    },
    {
      id: 6,
      name: "Noodle House",
      cuisine: "Chinese",
      rating: 4.1,
      deliveryTime: "20-25 mins",
      image: "🍜",
      offer: "₹100 OFF above ₹299",
      dishes: ["Hakka Noodles", "Fried Rice", "Manchurian"]
    }
  ];

  const foodCategories = [
    { name: "Pizza", icon: "🍕", color: "bg-red-100" },
    { name: "Burgers", icon: "🍔", color: "bg-yellow-100" },
    { name: "Indian", icon: "🍛", color: "bg-orange-100" },
    { name: "Chinese", icon: "🍜", color: "bg-green-100" },
    { name: "Desserts", icon: "🍰", color: "bg-pink-100" },
    { name: "Beverages", icon: "🥤", color: "bg-blue-100" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">FoodieExpress</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Restaurants</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Orders</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Help</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Delicious Food, Delivered Fast
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Order from your favorite restaurants and get it delivered in minutes
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-gray-800 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
            />
            <button className="absolute right-2 top-2 bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Food Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">What's on your mind?</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {foodCategories.map((category, index) => (
              <div key={index} className={`${category.color} p-6 rounded-xl text-center cursor-pointer hover:scale-105 transition-transform`}>
                <div className="text-4xl mb-2">{category.icon}</div>
                <p className="font-medium text-gray-700">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Top restaurants near you</h3>
            <button className="text-orange-600 font-medium hover:text-orange-700">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div 
                key={restaurant.id} 
                onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-6xl">{restaurant.image}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {restaurant.offer}
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h4>
                  <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-green-600 font-bold">★ {restaurant.rating}</span>
                    </div>
                    <span className="text-gray-600">{restaurant.deliveryTime}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">Popular dishes:</p>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.dishes.map((dish, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why choose FoodieExpress?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Lightning Fast Delivery</h4>
              <p className="text-gray-600">Get your food delivered in 30 minutes or less</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Wide Selection</h4>
              <p className="text-gray-600">Choose from thousands of restaurants and cuisines</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Easy Payment</h4>
              <p className="text-gray-600">Multiple payment options for your convenience</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">How long does delivery take?</h4>
              <p className="text-gray-600">Most orders are delivered within 30-45 minutes, depending on your location and restaurant preparation time.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">What are the delivery charges?</h4>
              <p className="text-gray-600">Delivery charges vary by distance and restaurant. Many restaurants offer free delivery on orders above a certain amount.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Can I track my order?</h4>
              <p className="text-gray-600">Yes! You can track your order in real-time from preparation to delivery through our app.</p>
            </div>
          </div>
        </div>
      </section>

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
