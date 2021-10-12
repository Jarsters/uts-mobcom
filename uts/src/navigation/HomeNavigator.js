import React from 'react';
import { COFFEE_DETAILS, COFFEE_LIST } from '../constants';
import CoffeesComponent from '../components/CoffeeComponents';
import DetailsCoffee from '../components/CoffeeDetailsComponents';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeNavigator = () => {
    const HomeStack = createNativeStackNavigator();
    return (
        <HomeStack.Navigator initialRouteName={COFFEE_LIST}>
            <HomeStack.Screen name={COFFEE_LIST} component={CoffeesComponent} />
            <HomeStack.Screen name={COFFEE_DETAILS} component={DetailsCoffee} />
        </HomeStack.Navigator>
    );
};
export default HomeNavigator;