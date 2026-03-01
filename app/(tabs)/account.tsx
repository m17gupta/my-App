import { AccountContent } from '@/components/AccountContent';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <AccountContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AccountScreen;
