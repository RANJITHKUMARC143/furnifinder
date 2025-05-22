import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput,
  Platform,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { Search, ChevronRight, Filter } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { featuredProducts, categories } from '@/data/products';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.44;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.centeredWelcome}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG9vMy3VUDtH5eOQ3KwC1kiYTYV1yqzPxzOg&s' }}
            style={styles.welcomeImage}
          />
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.userName}>FurniFindr</Text>
        </View>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9E9E9E" />
            <TextInput
              placeholder="Search furniture"
              placeholderTextColor="#9E9E9E"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Best Selling Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color="#2A2A2A" />
          </TouchableOpacity>
        </View>

        {/* Best Selling Products */}
        <View style={styles.productGrid}>
          {featuredProducts.slice(0, 4).map((product) => (
            <TouchableOpacity 
              key={product.id}
              style={styles.productCard}
              onPress={() => handleProductPress(product.id)}
            >
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Video Section */}
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: 'https://videos.pexels.com/video-files/4231455/4231455-sd_640_360_25fps.mp4' }}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay
          />
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={() => router.push('/categories')}  
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color="#2A2A2A" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {categories.slice(0, 4).map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={styles.categoryCard}
              onPress={() => router.push({
                pathname: '/categories',
                params: { category: category.id }
              })}
            >
              <View style={styles.categoryImageContainer}>
                <Image 
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    paddingBottom: 16,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  greeting: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000000',
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#B8860B',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: '#3B2F2F',
    backdropFilter: 'blur(10px)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#2A2A2A',
  },
  filterButton: {
    backgroundColor: 'rgba(218, 165, 32, 0.9)',
    borderRadius: 12,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2A2A2A',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
    marginRight: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoryCard: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
  },
  categoryImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  categoryName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
    textAlign: 'center',
    marginTop: 4,
    width: '100%',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  productCard: {
    width: cardWidth,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 4,
  },
  productPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2A2A2A',
  },
  centeredWelcome: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  welcomeImage: {
    width: 100,
    height: 60,
    borderRadius: 8,
    marginBottom: 0,
    resizeMode: 'contain',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
  },
  scrollContent: {
    paddingTop: 200,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    marginVertical: 24,
    borderRadius: 12,
    overflow: 'hidden',
    paddingHorizontal: 16,
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});