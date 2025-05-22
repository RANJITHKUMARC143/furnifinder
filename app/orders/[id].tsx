import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Package, CircleCheck as CheckCircle, CircleAlert } from 'lucide-react-native';
import Button from '@/components/Button';
import { orderDetails } from '@/data/orders';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  
  // In a real app, you would fetch the order details based on the ID
  const order = orderDetails;
  
  const getStatusColor = () => {
    switch (order.status) {
      case 'Delivered':
        return '#4CAF50';
      case 'In Transit':
        return '#2196F3';
      case 'Processing':
        return '#FF9800';
      case 'Cancelled':
        return '#FF3B30';
      default:
        return '#9E9E9E';
    }
  };
  
  const getStatusIcon = () => {
    switch (order.status) {
      case 'Delivered':
        return <CheckCircle size={16} color="#4CAF50" fill="#4CAF50" />;
      case 'In Transit':
        return <Package size={16} color="#2196F3" />;
      case 'Processing':
        return <Package size={16} color="#FF9800" />;
      case 'Cancelled':
        return <CircleAlert size={16} color="#FF3B30" />;
      default:
        return <Package size={16} color="#9E9E9E" />;
    }
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
        <Text style={styles.headerTitle}>Order #{order.orderNumber}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Order Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusHeader}>
            <Text style={styles.sectionTitle}>Order Status</Text>
            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
              <View style={styles.statusIconContainer}>
                {getStatusIcon()}
              </View>
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {order.status}
              </Text>
            </View>
          </View>
          
          <View style={styles.timeline}>
            {order.timeline.map((event, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineIconContainer}>
                  <View 
                    style={[
                      styles.timelineIcon, 
                      { backgroundColor: event.completed ? getStatusColor() : '#E0E0E0' }
                    ]}
                  />
                  {index < order.timeline.length - 1 && (
                    <View 
                      style={[
                        styles.timelineLine,
                        { backgroundColor: event.completed ? getStatusColor() : '#E0E0E0' }
                      ]}
                    />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>{event.title}</Text>
                  <Text style={styles.timelineDate}>{event.date}</Text>
                  {event.description && (
                    <Text style={styles.timelineDescription}>{event.description}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          
          {order.items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price} x {item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Shipping Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Information</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{order.shippingAddress.name}</Text>
            <Text style={styles.infoValue}>{order.shippingAddress.line1}</Text>
            {order.shippingAddress.line2 && (
              <Text style={styles.infoValue}>{order.shippingAddress.line2}</Text>
            )}
            <Text style={styles.infoValue}>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
            </Text>
            
            <View style={styles.infoDivider} />
            
            <Text style={styles.infoLabel}>Shipping Method</Text>
            <Text style={styles.infoValue}>{order.shippingMethod}</Text>
            
            {order.trackingNumber && (
              <>
                <View style={styles.infoDivider} />
                <Text style={styles.infoLabel}>Tracking Number</Text>
                <Text style={styles.infoValue}>{order.trackingNumber}</Text>
              </>
            )}
          </View>
        </View>
        
        {/* Payment Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Payment Method</Text>
            <Text style={styles.infoValue}>
              {order.paymentMethod.type} ending in {order.paymentMethod.last4}
            </Text>
            
            <View style={styles.infoDivider} />
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Subtotal</Text>
              <Text style={styles.summaryItemValue}>${order.subtotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Shipping</Text>
              <Text style={styles.summaryItemValue}>${order.shipping.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Tax</Text>
              <Text style={styles.summaryItemValue}>${order.tax.toFixed(2)}</Text>
            </View>
            
            {order.discount > 0 && (
              <View style={styles.summaryItem}>
                <Text style={styles.summaryItemLabel}>Discount</Text>
                <Text style={[styles.summaryItemValue, styles.discountText]}>
                  -${order.discount.toFixed(2)}
                </Text>
              </View>
            )}
            
            <View style={[styles.summaryItem, styles.totalItem]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Need Help?" 
          onPress={() => {}} 
          style={styles.helpButton}
          variant="secondary"
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
  statusContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusIconContainer: {
    marginRight: 4,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  timeline: {
    marginTop: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineIconContainer: {
    width: 24,
    alignItems: 'center',
  },
  timelineIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
    marginBottom: -8,
  },
  timelineContent: {
    flex: 1,
    marginLeft: 12,
    marginTop: -4,
  },
  timelineTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 2,
  },
  timelineDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  timelineDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#696969',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2A2A2A',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#696969',
  },
  infoCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
  },
  infoLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#696969',
    marginBottom: 2,
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
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
    marginTop: 12,
    paddingTop: 12,
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
    fontSize: 16,
    color: '#2A2A2A',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  helpButton: {
    width: '100%',
  },
});