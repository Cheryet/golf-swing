import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Animation for scaling icons
        const scaleValue = new Animated.Value(isFocused ? 1.1 : 1);

        Animated.timing(scaleValue, {
          toValue: isFocused ? 1.1 : 1,
          duration: 200,
          useNativeDriver: true,
        }).start();

        return route.name !== 'Record' ? ( // Exclude the "Record" tab from the default layout
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}>
            <Animated.View style={{transform: [{scale: scaleValue}]}}>
              <Icon
                name={
                  route.name === 'Home'
                    ? 'home'
                    : route.name === 'Library'
                    ? 'video-library'
                    : 'person'
                }
                size={20}
                color={isFocused ? '#7349FB' : '#A8A8A8'}
              />
            </Animated.View>
            <Text
              style={{
                color: isFocused ? '#7349FB' : '#A8A8A8',
                fontSize: 12,
                paddingTop: 5,
              }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        ) : null; // Skip rendering the "Record" tab
      })}

      {/* Floating Action Button for Recording */}
      <TouchableOpacity
        style={[
          styles.floatingButton,
          {display: descriptors === 'Record' && 'none'},
        ]}
        onPress={() => navigation.navigate('Record')} // Navigate to the "Record" screen
      >
        <Icon name="videocam" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -7,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 90, // Adjust based on your tab bar height
    right: 10,
    backgroundColor: '#7349FB',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
});
