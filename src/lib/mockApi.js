// Mock API functions to simulate backend responses

export const mockAISearch = async (query) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock response based on query
  if (query.toLowerCase().includes('restaurant')) {
    return [
      { type: 'restaurant', name: 'Delicious Diner', description: 'Affordable American cuisine', price: '$$' },
      { type: 'restaurant', name: 'Sushi Sensation', description: 'Fresh Japanese delicacies', price: '$$$' },
    ];
  } else if (query.toLowerCase().includes('event')) {
    return [
      { type: 'event', name: 'San Francisco Street Fair', description: 'Annual cultural celebration', date: '2023-07-15' },
      { type: 'event', name: 'Tech Meetup', description: 'Networking event for tech professionals', date: '2023-06-30' },
    ];
  } else {
    return [
      { type: 'info', description: "I'm sorry, I couldn't find specific information about that. Can you try rephrasing your question?" },
    ];
  }
};

export const mockSafetyInfo = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { lat: 37.7749, lng: -122.4194, level: 'Low' },
    { lat: 37.7694, lng: -122.4862, level: 'Medium' },
    { lat: 37.7831, lng: -122.4039, level: 'High' },
  ];
};

export const mockRestaurants = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { lat: 37.7749, lng: -122.4194, name: 'Gourmet Burgers', price: '$$' },
    { lat: 37.7694, lng: -122.4862, name: 'Pasta Paradise', price: '$$$' },
    { lat: 37.7831, lng: -122.4039, name: 'Taco Town', price: '$' },
  ];
};

export const mockEvents = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { lat: 37.7749, lng: -122.4194, name: 'Summer Music Festival', date: '2023-07-20' },
    { lat: 37.7694, lng: -122.4862, name: 'Art Gallery Opening', date: '2023-06-25' },
    { lat: 37.7831, lng: -122.4039, name: 'Food Truck Rally', date: '2023-08-05' },
  ];
};