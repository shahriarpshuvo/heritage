import { Slide } from '@app/components';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const OnBoarding = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.slider, backgroundColor: 'cyan' }}>
        <Animated.ScrollView
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          horizontal
        >
          <Slide label="Traditional" />
          <Slide label="Nebulous" right />
          <Slide label="Longlasting" />
          <Slide label="Excent" right />
          <Slide label="Indigenous" />
        </Animated.ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'cyan' }} />
        <View style={styles.footerContent}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    flex: 0.6,
    borderBottomRightRadius: 75,
  },
  footer: {
    flex: 0.4,
  },
  footerFill: {},
  footerContent: {
    flex: 1,
    borderTopLeftRadius: 75,
    backgroundColor: 'white',
  },
});

export default OnBoarding;
