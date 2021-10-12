import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FAVORITE, HOME } from '../constants';
import HomeNavigator from './HomeNavigator';
import Icon from '../components/Icon';
import Favorite from '../components/Favorite.js';


const TabNavigator = () => {
    const Tab = createMaterialBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'HOME') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                            type = 'ionicon'
                        } else if (route.name === 'FAVORITE') {
                            iconName = focused
                                ? 'favorite'
                                : 'favorite-border';
                            type = 'material'
                        }
                        return <Icon type={type} name={iconName} size={21} color={color} />;
                    },
                })} tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name={HOME} component={HomeNavigator} />
                <Tab.Screen name={FAVORITE} component={Favorite} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
export default TabNavigator
