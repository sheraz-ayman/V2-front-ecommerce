import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'

var { width } = Dimensions.get('window')

const ProductList = (props) => {
    const { item } = props;

    return (
        <View >
            <TouchableOpacity
                    style={{ width: '50%' }}
                onPress={() => props.navigation.navigate('Product Details', { item: item })
                }
            >
                <View  >
                    <ProductCard  {...item} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    // container: {
    //     backgroundColor: "gainsboro",
    //     padding: 5,
    //     width:'100%'
    // }


})


export default ProductList;