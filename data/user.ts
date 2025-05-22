// Mock data for user profile
export const userProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  addresses: [
    {
      id: '1',
      name: 'Home',
      line1: '123 Main St',
      line2: 'Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      isDefault: true
    },
    {
      id: '2',
      name: 'Work',
      line1: '456 Market St',
      line2: 'Floor 10',
      city: 'San Francisco',
      state: 'CA',
      zip: '94103',
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '8888',
      expiryDate: '06/24',
      isDefault: false
    }
  ],
  orders: 5,
  wishlistItems: 3,
  reviews: 2
};