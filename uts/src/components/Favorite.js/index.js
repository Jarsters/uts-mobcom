import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, RefreshControl } from 'react-native'
import { COFFEE_DETAILS } from '../../constants'
import datas from '../../contexts/datas'

const Favorite = ({ navigation }) => {

    const [favorite, setFavorite] = useState([])

    useLayoutEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                setFavorite(JSON.parse(value))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [Refreshing, setRefreshing] = useState(false)
    const onRefreshing = () => {
        setRefreshing(true);
        getData();
        setRefreshing(false);
    }

    return (
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={datas}
            renderItem={({ item }) => {
                return (
                <>
                    { favorite.find(f => f?.name === item.name) ?
                    <TouchableOpacity
                        onPress={() => { navigation.navigate(COFFEE_DETAILS, { item: item }) }}
                        style={styles.item}
                    >
                        <View>
                            <Image
                                style={{ width: 100, height: 150 }}
                                source={item.img}
                            />
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={[styles.text, styles.title]}>{item.name}</Text>
                            <Text style={[styles.text, styles.desc]}>{item.desc}</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    null
            }
                </>
                )
            }}
            refreshControl={
                        <RefreshControl
                            refreshing={Refreshing}
                            onRefresh={onRefreshing}
                            colors={['#ff00ff']}
                        />
                    }
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

export default Favorite
