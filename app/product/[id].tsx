import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
  useWindowDimensions
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Plus, 
  Minus,
  Share2,
  Check
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate
} from 'react-native-reanimated';
import Button from '@/components/Button';
import { allProducts } from '@/data/products';
import { reviews } from '@/data/reviews';

const { width } = Dimensions.get('window');

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const { height } = useWindowDimensions();
  
  const product = allProducts.find(p => p.id === id) || allProducts[0];
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  
  // Animation values
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      'clamp'
    );
    
    return {
      opacity,
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      borderBottomColor: `rgba(240, 240, 240, ${opacity})`,
      borderBottomWidth: 1,
    };
  });

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    Alert.alert(
      "Success", 
      `${product.name} (${selectedColor}, Qty: ${quantity}) added to cart`
    );
  };

  const toggleWishlist = () => {
    setLiked(!liked);
    Alert.alert(
      liked ? "Removed from Wishlist" : "Added to Wishlist",
      liked ? "Product removed from your wishlist" : "Product added to your wishlist"
    );
  };

  const shareProduct = () => {
    Alert.alert("Share", "Sharing functionality would be implemented here");
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, headerAnimatedStyle]}>
        <Text style={styles.headerTitle} numberOfLines={1}>{product.name}</Text>
      </Animated.View>
      
      {/* Static Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2A2A2A" />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={shareProduct}
          >
            <Share2 size={24} color="#2A2A2A" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={toggleWishlist}
          >
            <Heart 
              size={24} 
              color={liked ? "#FF3B30" : "#2A2A2A"} 
              fill={liked ? "#FF3B30" : "transparent"} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <FlatList
            data={[product.image, ...product.gallery || []]}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={[styles.productImage, { width }]}
              />
            )}
            keyExtractor={(_, index) => `image-${index}`}
          />
        </View>
        
        <View style={styles.productContent}>
          {/* Product Info */}
          <View style={styles.productInfo}>
            <View style={styles.namePriceRow}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>
            
            <View style={styles.ratingContainer}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    size={16} 
                    color="#FFB800"
                    fill={star <= product.rating ? "#FFB800" : "transparent"}
                  />
                ))}
              </View>
              <Text style={styles.reviewCount}>
                {product.rating} ({reviews.length} reviews)
              </Text>
            </View>
          </View>
          
          {/* Color Selection */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorOptions}>
              {product.colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColorOption
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <Check size={16} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Quantity */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={decreaseQuantity}
              >
                <Minus size={16} color="#2A2A2A" />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={increaseQuantity}
              >
                <Plus size={16} color="#2A2A2A" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Description */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>
          
          {/* Reviews */}
          <View style={styles.sectionContainer}>
            <View style={styles.reviewHeaderRow}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {reviews.slice(0, 2).map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image 
                    source={{ uri: review.userAvatar }}
                    style={styles.reviewAvatar}
                  />
                  <View style={styles.reviewUser}>
                    <Text style={styles.reviewUserName}>{review.userName}</Text>
                    <View style={styles.starsRow}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          size={12} 
                          color="#FFB800"
                          fill={star <= review.rating ? "#FFB800" : "transparent"}
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
      
      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Button 
          title="Add to Cart" 
          onPress={addToCart}
          style={styles.addToCartButton}
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
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    paddingHorizontal: 50,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2A2A2A',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  imageContainer: {
    height: 400,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    height: '100%',
    resizeMode: 'cover',
  },
  productContent: {
    padding: 16,
    paddingBottom: 100,
  },
  productInfo: {
    marginBottom: 20,
  },
  namePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#2A2A2A',
    marginRight: 16,
  },
  productPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#2A2A2A',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviewCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2A2A2A',
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: 'row',
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#2A2A2A',
    width: 60,
    textAlign: 'center',
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#696969',
    lineHeight: 24,
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
  },
  reviewCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewUser: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  reviewUserName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 2,
  },
  reviewDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9E9E9E',
  },
  reviewText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#696969',
    lineHeight: 20,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    padding: 16,
  },
  addToCartButton: {
    width: '100%',
  },
});