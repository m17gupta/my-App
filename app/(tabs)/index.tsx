import { AccountContent } from '@/components/AccountContent';
import PortfolioCard from '@/components/PortfolioCard';
import { RightDrawer } from '@/components/RightDrawer';
import SectionHeader from '@/components/SectionHeader';
import { VibrantBackground } from '@/components/VibrantBackground';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const PORTFOLIO_DATA = [
  { id: '1', title: 'Dzinly', category: 'UI Design', image: 'https://picsum.photos/id/20/400/300' },
  { id: '2', title: 'Luna Mobile App', category: 'FinTech UI', image: 'https://picsum.photos/id/26/400/300' },
  { id: '3', title: 'Stellar Web Platform', category: 'E-commerce', image: 'https://picsum.photos/id/36/400/300' },
  { id: '4', title: 'Nomad Travel UI', category: 'Portfolio', image: 'https://picsum.photos/id/48/400/300' },
];

const ACCENT_COLOR = '#22E1FF';

export default function HomeScreen() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <VibrantBackground>
      <View style={styles.flexContainer}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header / Hero Section */}
          <Animated.View entering={FadeInUp.duration(800)} style={styles.hero}>
            <View style={styles.topNav}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => setIsDrawerOpen(true)}
              >
                <BlurView intensity={20} tint="light" style={styles.iconBack}>
                  <Ionicons name="menu-outline" size={26} color="#FFFFFF" />
                </BlurView>
              </TouchableOpacity>
              <View style={styles.profileSummary}>
                <Text style={styles.userName}>Manish Gupta</Text>
                <Text style={styles.userHandle}>Portfolio</Text>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <BlurView intensity={20} tint="light" style={styles.iconBack}>
                  <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
                </BlurView>
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
                <Text style={styles.heroGreeting}>CREATIVE DEVELOPER</Text>
                <Text style={styles.heroTitle}>Manish{"\n"}Gupta</Text>
                <Text style={styles.heroSubtext}>
                  Building immersive digital experiences with modern web & mobile technologies.
                </Text>
              </View>
            </View>

            <View style={styles.heroActions}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>View Work</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Collaborate</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Portfolio Section */}
          <Animated.View entering={FadeInDown.delay(200).duration(800)}>
            <SectionHeader title="Recent Projects" />
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
          </Animated.View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.socialIcons}>
              {['logo-linkedin', 'logo-github', 'logo-twitter'].map((icon) => (
                <TouchableOpacity key={icon} style={styles.socialButton}>
                  <Ionicons name={icon as any} size={20} color="rgba(255,255,255,0.6)" />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.footerCopyright}>© 2024 • Manish Gupta</Text>
          </View>
        </ScrollView>

        <RightDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <AccountContent />
        </RightDrawer>
      </View>
    </VibrantBackground>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  hero: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 25,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  menuButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  iconBack: {
    padding: 10,
    borderRadius: 15,
  },
  notificationButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  profileSummary: {
    alignItems: 'center',
  },
  userName: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: -0.5,
  },
  userHandle: {
    color: ACCENT_COLOR,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  heroContent: {
    marginBottom: 40,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 2,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  heroTextContainer: {
    width: '100%',
  },
  heroGreeting: {
    color: ACCENT_COLOR,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 52,
    marginBottom: 15,
    letterSpacing: -1,
  },
  heroSubtext: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    lineHeight: 24,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    shadowColor: ACCENT_COLOR,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryContainer: {
    paddingHorizontal: 25,
    gap: 12,
  },
  categoryTag: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  activeCategoryTag: {
    backgroundColor: ACCENT_COLOR,
  },
  categoryTagText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '700',
  },
  activeCategoryTagText: {
    color: '#000',
    fontWeight: '900',
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  footer: {
    paddingVertical: 60,
    paddingBottom: 150,
    alignItems: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 25,
    marginBottom: 25,
  },
  socialButton: {
    padding: 5,
  },
  footerCopyright: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '600',
  },
});
