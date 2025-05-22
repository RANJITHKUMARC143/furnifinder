import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  Dimensions
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ArrowLeft, Filter, X } from 'lucide-react-native';
import { categories, allProducts } from '@/data/products';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.44;

export default function CategoriesScreen() {
  const params = useLocalSearchParams();
  const initialCategory = params.category ? String(params.category) : null;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const filteredProducts = allProducts.filter(product => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === null || 
      product.categoryId === selectedCategory;
    
    // Filter by active filters (e.g., price range, ratings)
    const matchesFilters = activeFilters.length === 0 || 
      activeFilters.includes(product.featured ? 'featured' : '');
    
    return matchesSearch && matchesCategory && matchesFilters;
  });

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const handleAddFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#2A2A2A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={{ width: 24 }} />
      </View>

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
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color="#9E9E9E" />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Categories Scroll */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipSelected
            ]}
            onPress={() => handleSelectCategory(category.id)}
          >
            <Text 
              style={[
                styles.categoryChipText,
                selectedCategory === category.id && styles.categoryChipTextSelected
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <View style={styles.activeFiltersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {activeFilters.map((filter) => (
              <TouchableOpacity 
                key={filter}
                style={styles.activeFilterChip}
                onPress={() => handleAddFilter(filter)}
              >
                <Text style={styles.activeFilterText}>{filter}</Text>
                <X size={16} color="#2A2A2A" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.productCard}
              onPress={() => handleProductPress(item.id)}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No products found</Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => {
              setSearchQuery('');
              setSelectedCategory(null);
              setActiveFilters([]);
            }}
          >
            <Text style={styles.resetButtonText}>Reset Filters</Text>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2A2A2A',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#2A2A2A',
  },
  filterButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#2A2A2A',
  },
  categoryChipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  activeFiltersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#2A2A2A',
    marginRight: 4,
  },
  productList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productRow: {
    justifyContent: 'space-between',
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyStateText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2A2A2A',
    marginBottom: 16,
  },
  resetButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
  },
  resetButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});