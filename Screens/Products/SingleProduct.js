import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'
import Toast from 'react-native-toast-message';


const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{ uri: item.image ? item.image : 'https://i.pinimg.com/474x/47/32/eb/4732eb1592b116443340917e51eed478.jpg' }}
                        resizeMode='contain'
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentHeader}>{item.name}</Text>
                    <Text style={styles.contentText}>{item.brand}</Text>
                    {/* Add the description, richDescription, and availability here */}
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={styles.left}>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <View style={styles.right}>
                    <Button
                        title='Add'
                        onPress={() => {props.addItemToCart(item)
                            Toast.show({
                                topOffset:60,
                                type:'success',
                                text1:`${item.name} added to Cart`,
                                text2:"Go to your cart to complete the order"
                            })
                    }}
                    />
                </View>
            </View>
        </View>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Add a background color if needed
    },
    image: {
        width: '100%',
        height: 250,
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentHeader: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red',
    },
});

export default connect(null, mapDispatchToProps)(SingleProduct);
