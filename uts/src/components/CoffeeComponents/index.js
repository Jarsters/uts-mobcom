import React, { useState } from 'react'
import { View, Text, FlatList, RefreshControl, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { COFFEE_DETAILS } from '../../constants'
import datas from '../../contexts/datas'

const CoffeesComponent = ({ navigation }) => {

    return (
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={datas}
            renderItem={({ item }) => {
                
            return (
                <TouchableOpacity 
                    onPress={() => {navigation.navigate(COFFEE_DETAILS, {item: item})}}
                    style={styles.item}
                >
                    <View>
                        <Image
                            style={{width: 100, height: 150}}
                            source={item.img}
                        />
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={[styles.text, styles.title]}>{item.name}</Text>
                        <Text style={[styles.text, styles.desc]}>{item.desc}</Text>
                    </View>
                </TouchableOpacity>
            )}}
        />
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        margin: 20,
        paddingBottom: 15,
        flexWrap: 'wrap',
        borderBottomWidth: 1,
    },
    text: {
        color: '#000',
    },
    title: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
    },
    desc: {
        fontSize: 18,
        marginLeft: 10,
    },
    wrapper: {
        flex: 1,
        flexGrow: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    }
})

export default CoffeesComponent
