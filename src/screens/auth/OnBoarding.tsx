import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OnBoarding = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'DMSerif' }}>Heritage!</Text>
      <Text style={{ fontFamily: 'LalSabujBold', fontSize: 50 }}>ঐতিহ্য</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
  },
});

export default OnBoarding;
