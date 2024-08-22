import React from 'react';
import { View, StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import CardTest from './CardTest';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SPACING = screenWidth * 0.025;
const ITEM_SIZE = screenWidth * 0.8;
const EMPTY_ITEM_SIZE = (screenWidth - ITEM_SIZE) / 2;
const isPad = Platform.isPad;

const Carousel = ({ scrollX, fadeAnim, cardFadeAnim, cardTranslateAnim, toggleGif, toggleGifTwo }) => {
  const data = [
    <CardTest name="LocationGame" backgroundColor="#F5E7A0" backgroundColor2="#8B6E42" toggleGif={toggleGif}  />,
    <CardTest name="FlagGame" backgroundColor="#E7A0A0" backgroundColor2="#7A4848" toggleGif={toggleGif}  />,
    <CardTest name="PopulationGame" backgroundColor="#A0E7A5" backgroundColor2="#427A42" toggleGifTwo={toggleGifTwo} />,
    <CardTest name="CapitalsGame" backgroundColor="#C6A0E7" backgroundColor2="#6A4282" toggleGif={toggleGif} />,
    <CardTest name="SizeGame" backgroundColor="#A0D8E7" backgroundColor2="#426F7A" toggleGifTwo={toggleGifTwo} />, 
  ];




  const items = [{ key: 'empty-left' }, ...data.map((_, index) => ({ key: `item-${index}` })), { key: 'empty-right' }];

  return (
    <>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        initialScrollIndex={2}
        getItemLayout={(data, index) => (
          { length: ITEM_SIZE, offset: ITEM_SIZE * index, index }
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (item.key.startsWith('empty')) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const dataIndex = index % data.length; // Calculate the index within the data array
          const cardData = data[dataIndex]; // Get the corresponding data from the array

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: isPad ? [-screenWidth * 0.08, -screenWidth * 0.08, -screenWidth * 0.08] 
            : [screenWidth * 0.02, -screenWidth * 0.18, screenWidth * 0.02],
            extrapolate: 'clamp',
          });

          return (
            <View style={{ width: ITEM_SIZE, height: ITEM_SIZE * 1.3,  }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  alignItems: 'center',
                  transform: [{ translateY }, { translateX: cardTranslateAnim }],
                  opacity: cardFadeAnim,
                }}
              >
                {cardData}
              </Animated.View>
            </View>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});

export default Carousel;

