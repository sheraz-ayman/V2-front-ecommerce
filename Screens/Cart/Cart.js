import React from "react";
import {
    View,
    Dimensions,
    StyleSheet,
    Button,
    Text,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";
import Icon from "react-native-vector-icons/FontAwesome";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
    var total = 0;
    props.cartItem.forEach((cart) => {
        return (total += cart.product.price);
    });

    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Cart</Text>
            {props.cartItem.length ? (
                <View style={styles.container}>
                    <SwipeListView
                        data={props.cartItem}
                        renderItem={({ item }) => <CartItem item={item} />}
                        renderHiddenItem={(item) => (
                            <View style={styles.hiddenContainer}>
                                <TouchableOpacity
                                    style={styles.hiddenButton}
                                    onPress={() => props.removeFromCart(item.item)}>
                                    <Icon name="trash" color={"white"} size={30} />
                                </TouchableOpacity>
                            </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                        keyExtractor={(item, index) => (item.product.id ? item.product.id.toString() : index.toString())}
                    // Other SwipeListView props and render methods go here
                    />
                    <View style={styles.bottomContainer}>
                        <Text style={styles.price}>${total}</Text>
                        <View style={styles.rightPart}>
                            <Button title="Clear" onPress={() => props.clearCart()} />
                            <Button
                                title="Checkout"
                                onPress={() => props.navigation.navigate('Checkout')}
                            />
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text>Looks like your cart is empty</Text>
                    <Text>Add products to your cart to get started</Text>
                </View>
            )}
        </View>
    );
};

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItem: cartItems,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    h1: {
        alignSelf: "center",
        fontSize: 32,
        fontWeight: "bold",
    },
    bottomContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        elevation: 20,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    rightPart: {
        flexDirection: "row",
        fontSize: 18,
        marginHorizontal: 120,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    price: {
        fontSize: 18,
        marginHorizontal: 20,
        color: "red",
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    hiddenButton: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 25,
        height: 70,
        width: width / 1.2,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
