import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Icon from '../Icon'

const DetailsCoffee = ({ route }) => {

    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        getData()
        console.log('Buka ' + route.params.item.name)
    }, [])

    const getData = async () => {
        try {
            // AsyncStorage.removeItem('user');
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                setFavorite(JSON.parse(value))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const {
        name,
        desc,
        img
    } = route.params.item

    const handleAddFavorite = (f) => {
        const newFav = [...favorite];
        newFav.push(f)
        AsyncStorage.setItem('user', JSON.stringify(newFav))
        setFavorite(newFav)
    }

    const handleRemoveFavorite = (f) => {
        const newFav = [];
        favorite.forEach(o => {
            if(o.name !== f.name){
                newFav.push(o)
            }
        })
        AsyncStorage.setItem('user', JSON.stringify(newFav))
        setFavorite(newFav)
    }


    const setIntoFavorite = async () => {
        try {
            if (!(favorite.find(f => f?.name === name))) {
                handleAddFavorite({ name: name, desc: desc, img: img })
                Alert.alert('Pemberitahuan', 'Anda telah menambahkannya ke favorite!')
            }
            else {
                handleRemoveFavorite({ name: name, desc: desc, img: img });
                Alert.alert('Pemberitahuan', 'Anda telah menghapusnya dari favorite')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={{ width: 100, height: 150 }}
                    source={img}
                />
                <View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, flexWrap: 'wrap' }}>
                    <Text style={[styles.text, styles.title]}>{name}</Text>
                </View>
            </View>
            <View>
                <Text style={[styles.text, styles.desc]}>{desc}</Text>
            </View>

            <TouchableOpacity
                style={styles.floatingActionButton}
                onPress={async () => {
                    await setIntoFavorite()
                }}
            >
                {favorite.find(f => f?.name === name) ?
                    <Icon type='material' name="favorite" size={21} color={"#fff"} />
                    :
                    <Icon type='material' name="favorite-border" size={21} color={"#fff"} />
}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 40,
        flex: 1,
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
        marginTop: 25,
        marginLeft: 15,
    },
    floatingActionButton: {
        backgroundColor: 'red',
        width: 55,
        height: 55,
        position: 'absolute',
        bottom: 45,
        right: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default DetailsCoffee
