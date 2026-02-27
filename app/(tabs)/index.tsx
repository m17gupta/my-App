import PortfolioCard from '@/components/PortfolioCard';
import SectionHeader from '@/components/SectionHeader';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const PORTFOLIO_DATA = [
  { id: '1', title: 'Dzinly', category: 'UI Design', image: 'https://picsum.photos/id/20/400/300' },
  { id: '2', title: 'Luna Mobile App', category: 'FinTech UI', image: 'https://picsum.photos/id/26/400/300' },
  { id: '3', title: 'Stellar Web Platform', category: 'E-commerce', image: 'https://picsum.photos/id/36/400/300' },
  { id: '4', title: 'Nomad Travel UI', category: 'Portfolio', image: 'https://picsum.photos/id/48/400/300' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header / Hero Section */}
      <LinearGradient colors={['#1C1C1E', '#000000']} style={styles.hero}>
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu-outline" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.profileSummary}>
            <Text style={styles.userName}>Manish Gupta</Text>
            <Text style={styles.userHandle}> {"manish.gupta.mech@gmail.com"}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroContent}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('@/assets/images/image.png')}
              style={styles.avatar}
            />
          </View>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroGreeting}>MANISH GUPTA</Text>
            <Text style={styles.heroTitle}>Creative{"\n"}Developer</Text>
            <Text style={styles.heroSubtext}>
              Crafting immersive digital experiences & interfaces.
            </Text>
          </View>
        </View>

        <View style={styles.heroActions}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>View Work</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Let's Collaborate</Text>
          </TouchableOpacity>

        </View>
      </LinearGradient>

      {/* Portfolio Section */}
      <SectionHeader title="Recent Work" />

      <View style={styles.categoryScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
          {['All', 'Web', 'App', 'Motion'].map((cat, index) => (
            <TouchableOpacity key={cat} style={[styles.categoryTag, index === 0 && styles.activeCategoryTag]}>
              <Text style={[styles.categoryTagText, index === 0 && styles.activeCategoryTagText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.portfolioGrid}>
        {PORTFOLIO_DATA.map((item) => (
          <PortfolioCard
            key={item.id}
            title={item.title}
            category={item.category}
            image={item.image}
          />
        ))}
      </View>

      {/* Services Section */}
      <View style={styles.servicesSection}>
        <Text style={styles.servicesHeader}>Services</Text>
        <View style={styles.servicesList}>
          {['Web Development', 'Mobile Apps', 'UI/UX Design'].map((service) => (
            <Text key={service} style={styles.serviceItem}>{service}</Text>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.socialIcons}>
          {['logo-linkedin', 'logo-github', 'basketball', 'logo-twitter'].map((icon) => (
            <TouchableOpacity key={icon} style={styles.socialButton}>
              <Ionicons name={icon as any} size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.footerCopyright}>Manish Gupta • Creative Developer • © 2024</Text>
        <View style={styles.footerLinks}>
          {['Home', 'Work', 'About', 'Contact'].map((link) => (
            <Text key={link} style={styles.footerLinkText}>{link}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  hero: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  menuButton: {
    padding: 8,
  },
  notificationButton: {
    padding: 8,
  },
  profileSummary: {
    alignItems: 'center',
  },
  userName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  userHandle: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    padding: 3,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  heroTextContainer: {
    flex: 1,
  },
  heroGreeting: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 4,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 40,
    marginBottom: 10,
  },
  heroSubtext: {
    color: '#8E8E93',
    fontSize: 14,
    lineHeight: 20,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  categoryScroll: {
    marginBottom: 10,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryTag: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
  },
  activeCategoryTag: {
    backgroundColor: '#007AFF',
  },
  categoryTagText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  activeCategoryTagText: {
    fontWeight: '700',
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  servicesSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  servicesHeader: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
  },
  servicesList: {
    flexDirection: 'row',
    gap: 20,
  },
  serviceItem: {
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  socialButton: {
    padding: 10,
  },
  footerCopyright: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    marginBottom: 15,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 15,
  },
  footerLinkText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '500',
  }
});
