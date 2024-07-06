import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LazyImage from './LazyImage';

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Travel Blogger",
    content: "pantheon.so has revolutionized the way I plan my trips. The AI-powered search is incredibly intuitive and saves me hours of research.",
    avatar: "https://via.placeholder.com/100x100?text=AJ"
  },
  {
    name: "Sarah Lee",
    role: "Urban Planner",
    content: "As an urban planner, I rely heavily on accurate map data. pantheon.so's AI capabilities have made my job significantly easier and more efficient.",
    avatar: "https://via.placeholder.com/100x100?text=SL"
  },
  {
    name: "Mike Chen",
    role: "Small Business Owner",
    content: "Finding the perfect location for my new store was a breeze with pantheon.so. The AI understood my specific needs and provided spot-on recommendations.",
    avatar: "https://via.placeholder.com/100x100?text=MC"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-4">{testimonial.content}</p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;