import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react-native';
import { wishlistItems as initialWishlistItems } from '@/data/wishlist';

export default function WishlistScreen() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeFromWishlist = (itemId: string) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your wishlist?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => {
            setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleAddToCart = (itemId: string) => {
    // In a real app, this would add the item to the cart
    Alert.alert("Success", "Item added to cart!");
  };

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <Text style={styles.itemCount}>{wishlistItems.length} items</Text>
      </View>

      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.wishlistContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.wishlistItem}
              onPress={() => handleProductPress(item.id)}
              activeOpacity={0.8}
            >
              <View style={styles.productRow}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>${item.price}</Text>
                </View>
              </View>
              
              <View style={styles.actionRow}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => removeFromWishlist(item.id)}
                >
                  <Trash2 size={20} color="#FF3B30" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.addToCartButton]}
                  onPress={() => handleAddToCart(item.id)}
                >
                  <ShoppingBag size={18} color="#FFFFFF" />
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyState}>
          <Heart size={80} color="#EEEEEE" />
          <Text style={styles.emptyStateTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptyStateDescription}>
            Save items you like in your wishlist and review them anytime
          </Text>
          <TouchableOpacity 
            style={styles.startShoppingButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.startShoppingText}>Start Shopping</Text>
          </TouchableOpacity>
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
  wishlistContent: {
    padding: 16,
  },
  wishlistItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2A2A2A',
    marginBottom: 4,
  },
  productPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2A2A2A',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  addToCartButton: {
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  addToCartText: {
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#2A2A2A',
    marginTop: 16,
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
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  startShoppingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});