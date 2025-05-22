import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, CreditCard, Bell, CircleHelp as HelpCircle, LogOut, ChevronRight, Settings } from 'lucide-react-native';
import { userProfile } from '@/data/user';

type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  showBorder?: boolean;
};

const MenuItem = ({ icon, title, onPress, showBorder = true }: MenuItemProps) => (
  <TouchableOpacity 
    style={[styles.menuItem, showBorder && styles.menuItemBorder]}
    onPress={onPress}
  >
    <View style={styles.menuIcon}>
      {icon}
    </View>
    <Text style={styles.menuTitle}>{title}</Text>
    <ChevronRight size={20} color="#9E9E9E" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const [user, setUser] = useState(userProfile);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Log Out", 
          onPress: () => {
            setIsLoggedIn(false);
            // In a real app, this would clear auth tokens, etc.
          },
          style: "destructive"
        }
      ]
    );
  };

  const navigateToOrders = () => {
    // Navigate to orders screen
    router.push('/orders');
  };

  const navigateToSettings = () => {
    // Navigate to settings screen
    Alert.alert("Coming Soon", "Settings feature is coming soon!");
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/4450415/pexels-photo-4450415.jpeg' }}
            style={styles.loginImage}
          />
          <Text style={styles.loginTitle}>Join Modern Furniture</Text>
          <Text style={styles.loginDescription}>
            Sign in to view your profile, track orders, and access your wishlist
          </Text>
          
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => router.push('/auth/register')}
          >
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={navigateToSettings}>
            <Settings size={24} color="#2A2A2A" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1717229046427-7a9c89e6c59f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBjaXJjbGV8ZW58MHx8MHx8fDA%3D' }}
              style={styles.profileBackgroundImage}
            />
            <Image 
              source={{ uri: user.avatar }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.orders}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <Text style={styles.statValue}>{user.wishlistItems}</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.reviews}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <MenuItem 
            icon={<User size={20} color="#2A2A2A" />}
            title="Personal Information"
            onPress={() => router.push('/personal-info')}
          />
          <MenuItem 
            icon={<MapPin size={20} color="#2A2A2A" />}
            title="My Addresses"
            onPress={() => Alert.alert("Coming Soon", "This feature is coming soon!")}
          />
          <MenuItem 
            icon={<CreditCard size={20} color="#2A2A2A" />}
            title="Payment Methods"
            onPress={() => Alert.alert("Coming Soon", "This feature is coming soon!")}
          />
          <MenuItem 
            icon={<Bell size={20} color="#2A2A2A" />}
            title="Notifications"
            onPress={() => Alert.alert("Coming Soon", "This feature is coming soon!")}
          />
          <MenuItem 
            icon={<HelpCircle size={20} color="#2A2A2A" />}
            title="Help & Support"
            onPress={() => Alert.alert("Coming Soon", "This feature is coming soon!")}
          />
          <MenuItem 
            icon={<LogOut size={20} color="#FF3B30" />}
            title="Log Out"
            onPress={handleLogout}
            showBorder={false}
          />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#2A2A2A',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    width: 60,
    height: 60,
  },
  profileBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#2A2A2A',
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#EEEEEE',
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2A2A2A',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9E9E9E',
  },
  menuContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuIcon: {
    width: 32,
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2A2A2A',
  },
  loginContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 32,
  },
  loginTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#2A2A2A',
    marginBottom: 12,
    textAlign: 'center',
  },
  loginDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  registerButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  registerButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2A2A2A',
  },
});