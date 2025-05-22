import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, MapPin, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import Button from '@/components/Button';

type AddressType = {
  id: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
};

type PaymentMethodType = {
  id: string;
  type: string;
  name: string;
  last4: string;
  expiryDate: string;
  isDefault: boolean;
};

const addresses: AddressType[] = [
  {
    id: '1',
    name: 'Home',
    line1: '123 Main St',
    line2: 'Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Work',
    line1: '456 Market St',
    line2: 'Floor 10',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    isDefault: false,
  }
];

const paymentMethods: PaymentMethodType[] = [
  {
    id: '1',
    type: 'visa',
    name: 'Visa ending in',
    last4: '4242',
    expiryDate: '12/25',
    isDefault: true,
  },
  {
    id: '2',
    type: 'mastercard',
    name: 'Mastercard ending in',
    last4: '8888',
    expiryDate: '06/24',
    isDefault: false,
  }
];

export default function CheckoutScreen() {
  const [selectedAddress, setSelectedAddress] = useState(addresses.find(a => a.isDefault)?.id || '');
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods.find(p => p.isDefault)?.id || '');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  // Dummy order details
  const subtotal = 249.98;
  const tax = subtotal * 0.08; // 8% tax
  const shipping = 15;
  const total = subtotal + tax + shipping - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'WELCOME20') {
      const newDiscount = subtotal * 0.2; // 20% discount
      setDiscount(newDiscount);
      Alert.alert("Success", "Coupon applied successfully!");
    } else {
      Alert.alert("Invalid Coupon", "The coupon code you entered is invalid or expired.");
      setDiscount(0);
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      Alert.alert("Missing Address", "Please select a shipping address");
      return;
    }
    
    if (!selectedPayment) {
      Alert.alert("Missing Payment Method", "Please select a payment method");
      return;
    }
    
    // In a real app, this would call an API to place the order
    Alert.alert(
      "Order Placed",
      "Your order has been successfully placed!",
      [
        {
          text: "View Order",
          onPress: () => router.replace('/orders/new-order-id')
        },
        {
          text: "Continue Shopping",
          onPress: () => router.replace('/')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2A2A2A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Shipping Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <MapPin size={20} color="#2A2A2A" />
              <Text style={styles.sectionTitle}>Shipping Address</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.addLink}>+ Add</Text>
            </TouchableOpacity>
          </View>
          
          {addresses.map((address) => (
            <TouchableOpacity 
              key={address.id}
              style={[
                styles.optionCard,
                selectedAddress === address.id && styles.selectedOption
              ]}
              onPress={() => setSelectedAddress(address.id)}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionHeader}>
                  <Text style={styles.optionTitle}>{address.name}</Text>
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>Default</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.optionDetail}>
                  {address.line1}{address.line2 ? `, ${address.line2}` : ''}
                </Text>
                <Text style={styles.optionDetail}>
                  {address.city}, {address.state} {address.zip}
                </Text>
              </View>
              
              {selectedAddress === address.id && (
                <View style={styles.checkCircle}>
                  <CheckCircle2 size={20} color="#2A2A2A" fill="#2A2A2A" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <CreditCard size={20} color="#2A2A2A" />
              <Text style={styles.sectionTitle}>Payment Method</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.addLink}>+ Add</Text>
            </TouchableOpacity>
          </View>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity 
              key={method.id}
              style={[
                styles.optionCard,
                selectedPayment === method.id && styles.selectedOption
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionHeader}>
                  <Text style={styles.optionTitle}>
                    {method.name} {method.last4}
                  </Text>
                  {method.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>Default</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.optionDetail}>
                  Expires {method.expiryDate}
                </Text>
              </View>
              
              {selectedPayment === method.id && (
                <View style={styles.checkCircle}>
                  <CheckCircle2 size={20} color="#2A2A2A" fill="#2A2A2A" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Coupon Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.couponContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Enter promo code"
              placeholderTextColor="#9E9E9E"
              value={couponCode}
              onChangeText={setCouponCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleApplyCoupon}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemLabel}>Subtotal</Text>
            <Text style={styles.summaryItemValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemLabel}>Shipping</Text>
            <Text style={styles.summaryItemValue}>${shipping.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemLabel}>Tax</Text>
            <Text style={styles.summaryItemValue}>${tax.toFixed(2)}</Text>
          </View>
          
          {discount > 0 && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Discount</Text>
              <Text style={[styles.summaryItemValue, styles.discountText]}>
                -${discount.toFixed(2)}
              </Text>
            </View>
          )}
          
          <View style={[styles.summaryItem, styles.totalItem]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.placeOrderContainer}>
        <Button 
          title="Place Order" 
          onPress={handlePlaceOrder}
          style={styles.placeOrderButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2A2A2A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2A2A2A',
    marginLeft: 8,
  },
  addLink: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedOption: {
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  optionContent: {
    flex: 1,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  optionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2A2A2A',
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#2A2A2A',
  },
  optionDetail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#696969',
  },
  checkCircle: {
    marginLeft: 16,
  },
  couponContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  couponInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#2A2A2A',
    marginRight: 12,
  },
  applyButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  summarySection: {
    marginBottom: 32,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  summaryItemLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#696969',
  },
  summaryItemValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
  },
  discountText: {
    color: '#4CAF50',
  },
  totalItem: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2A2A2A',
  },
  totalValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2A2A2A',
  },
  placeOrderContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  placeOrderButton: {
    width: '100%',
  },
});