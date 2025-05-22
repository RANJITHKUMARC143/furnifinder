// Mock data for orders
export const orderDetails = {
  id: 'order-123456',
  orderNumber: '123456',
  date: 'May 23, 2025',
  status: 'In Transit',
  shippingAddress: {
    name: 'John Doe',
    line1: '123 Main St',
    line2: 'Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105'
  },
  shippingMethod: 'Standard Shipping (3-5 business days)',
  trackingNumber: 'TRK4567890123',
  paymentMethod: {
    type: 'Visa',
    last4: '4242',
    expiryDate: '12/25'
  },
  items: [
    {
      id: '1',
      productId: '1',
      name: 'Modern Lounge Chair',
      price: 249.99,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg'
    },
    {
      id: '2',
      productId: '2',
      name: 'Minimalist Coffee Table',
      price: 199.99,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'
    }
  ],
  subtotal: 449.98,
  shipping: 15.00,
  tax: 36.00,
  discount: 0,
  total: 500.98,
  timeline: [
    {
      title: 'Order Placed',
      date: 'May 23, 2025, 10:30 AM',
      description: 'Your order has been received and is being processed.',
      completed: true
    },
    {
      title: 'Order Processed',
      date: 'May 23, 2025, 2:45 PM',
      description: 'Your payment has been confirmed and your order is being prepared for shipping.',
      completed: true
    },
    {
      title: 'Order Shipped',
      date: 'May 24, 2025, 11:15 AM',
      description: 'Your order has been shipped. You can track your package with the tracking number provided.',
      completed: true
    },
    {
      title: 'Out for Delivery',
      date: 'May 26, 2025',
      description: 'Your order is out for delivery and should arrive today.',
      completed: false
    },
    {
      title: 'Delivered',
      date: 'Expected May 26, 2025',
      description: null,
      completed: false
    }
  ]
};

export const orderList = [
  {
    id: 'order-123456',
    orderNumber: '123456',
    date: 'May 23, 2025',
    status: 'In Transit',
    total: 500.98,
    items: 2
  },
  {
    id: 'order-123455',
    orderNumber: '123455',
    date: 'April 15, 2025',
    status: 'Delivered',
    total: 699.99,
    items: 1
  },
  {
    id: 'order-123454',
    orderNumber: '123454',
    date: 'March 30, 2025',
    status: 'Delivered',
    total: 348.98,
    items: 3
  }
];