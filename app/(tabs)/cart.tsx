import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import Button from '@/components/Button';
import { cartItems as initialCartItems } from '@/data/cart';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const increaseQuantity = (itemId: string) => {
    setCartItems(
      cartItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  
  const decreaseQuantity = (itemId: string) => {
    setCartItems(
      cartItems.map(item => 
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };
  
  const removeItem = (itemId: string) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => {
            setCartItems(cartItems.filter(item => item.id !== itemId));
          },
          style: "destructive"
        }
      ]
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );

  const shipping = 15;
  const total = subtotal + shipping;

  const navigateToCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Add some products to your cart before checkout.");
      return;
    }
    router.push('/checkout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      {cartItems.length > 0 ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.cartList}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                
                <View style={styles.itemDetails}>
                  <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                  </View>
                  
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => decreaseQuantity(item.id)}
                    >
                      <Minus size={16} color="#2A2A2A" />
                    </TouchableOpacity>
                    
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => increaseQuantity(item.id)}
                    >
                      <Plus size={16} color="#2A2A2A" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Trash2 size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            
            <Button 
              title="Proceed to Checkout" 
              onPress={navigateToCheckout}
              style={styles.checkoutButton}
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/6214472/pexels-photo-6214472.jpeg' }} 
            style={styles.emptyStateImage}
          />
          <Text style={styles.emptyStateTitle}>Your cart is empty</Text>
          <Text style={styles.emptyStateDescription}>
            Looks like you haven't added anything to your cart yet
          </Text>
          <Button 
            title="Start Shopping" 
            onPress={() => router.push('/')}
            style={styles.startShoppingButton}
          />
        </View>
      )}
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
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#2A2A2A',
  },
  itemCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
  cartList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2A2A2A',
    flexShrink: 1,
  },
  itemPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2A2A2A',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  quantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
    width: 36,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  summaryContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
  summaryValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
  },
  totalRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    marginBottom: 24,
  },
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2A2A2A',
  },
  totalValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#2A2A2A',
  },
  checkoutButton: {
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateImage: {
    width: 180,
    height: 180,
    marginBottom: 24,
    borderRadius: 90,
  },
  emptyStateTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#2A2A2A',
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 32,
  },
  startShoppingButton: {
    width: '100%',
  },
});