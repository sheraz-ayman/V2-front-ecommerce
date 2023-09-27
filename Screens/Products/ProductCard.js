import { Text, View, StyleSheet, Button, Image, Dimensions } from 'react-native'
import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'

import { Toast } from 'react-native-toast-message'

var { width } = Dimensions.get('window')


const ProductCard = (props) => {
    const { name, price, image, countInStock } = props;
    return (
        <View style={styles.container}>
            <Image style={styles.image}
                resizeMode='contain'
                source={{ uri: image ? image : " https://i.pinimg.com/474x/47/32/eb/4732eb1592b116443340917e51eed478.jpg" }}
            />
            <View style={styles.card} />
            <Text style={styles.title}>
                {name.length > 20 ? name.substring(0, 15 - 3) + "..." : name}
            </Text>
            <Text style={styles.price}>${price}</Text>
            {countInStock > 0 ? (
                <View style={{ marginBottom: 60 }}>
                    <Button
                        title='Add'
                        color="green"
                        onPress={() => {props.addItemToCart(props)
                            // Toast.show({
                            //     topOffset:60,
                            //     type:'success',
                            //     text1:`${props.name} added to Cart`,
                            //     text2:"Go to your cart to complete the order"
                            // })
                    }}
                    />
                </View>
            ) : <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>}
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft:13,
        alignItems: "center",
        elevation: 8,
        backgroundColor: "white",
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: "transparent",
        position: 'absolute',
        top: -45
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: "transparent",
        width: width / 2 - 20 - 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})


export default connect(null, mapDispatchToProps)(ProductCard);