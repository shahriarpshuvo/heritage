import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
export const SLIDE_HIEGHT = 0.6 * height;

interface SlideProps {
  label: string;
  right?: boolean;
}

export const Slide = ({ label, right }: SlideProps) => {
  const transform = [
    { translateY: (SLIDE_HIEGHT - 60) / 2 },
    { translateX: right ? width / 2 - 30 : -width / 2 + 30 },
    { rotate: right ? '-90deg' : '90deg' },
  ];
  return (
    <View style={styles.container}>
      <View style={{ ...styles.textContainer, transform }}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
  },
  textContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 60,
  },
  label: {
    fontSize: 48,
    lineHeight: 0,
    fontFamily: 'LexendBold',
    color: 'white',
    textAlign: 'center',
  },
});
