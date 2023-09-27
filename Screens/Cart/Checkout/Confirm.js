import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button, Text, Image } from "react-native";
import { connect } from "react-redux";
import * as actions from '../../../Redux/Actions/cartActions';

const { width, height } = Dimensions.get('window');
import Toast from "react-native-toast-message";
import axios from "axios";

const Confirm = (props) => {
    const finalOrder = props.route.params

    const confirmOrder = () => {
        const order = finalOrder.order.order
        setTimeout(() => {
            props.clearCart();
            props.navigation.navigate('Cart');
        }, 500);
    };

    const confirm = props.route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Order Confirmation</Text>
                {confirm ? (
                    <View style={styles.orderContainer}>
                        <Text style={styles.sectionTitle}>Shipping Details:</Text>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>Address:</Text>
                            <Text style={styles.infoText}>{confirm.order.shippingAddress1}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>Address2:</Text>
                            <Text style={styles.infoText}>{confirm.order.shippingAddress2}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>City:</Text>
                            <Text style={styles.infoText}>{confirm.order.city}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>Zip code:</Text>
                            <Text style={styles.infoText}>{confirm.order.zip}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>Country:</Text>
                            <Text style={styles.infoText}>{confirm.order.country}</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Ordered Items:</Text>
                        {confirm.order.orderItems && confirm.order.orderItems.map((x) => (
                            <View style={styles.itemContainer} key={x.product.name}>
                                <Image
                                    style={styles.itemImage}
                                    source={{ uri: x.product.image }}
                                />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{x.product.name}</Text>
                                    <Text style={styles.itemPrice}>${x.product.price}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : null}

                <View style={styles.buttonContainer}>
                    <Button title={'Place Order'} onPress={confirmOrder} />
                </View>
            </View>
        </ScrollView>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart())
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    titleContainer: {
        marginTop: 20,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    orderContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
    },
    infoContainer: {
        flexDirection: 'row',
        marginTop: 8,
    },
    infoLabel: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    infoText: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    itemImage: {
        width: 60,
        height: 60,
        marginRight: 12,
        borderRadius: 4,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#777',
    },
    buttonContainer: {
        marginTop: 20,
        alignSelf: 'center',
    },
});

export default connect(null, mapDispatchToProps)(Confirm);
