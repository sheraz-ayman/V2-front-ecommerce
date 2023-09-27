import React from 'react';
import { View, StyleSheet, FlatList, Text, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

var { width } = Dimensions.get('window')
const SearchedProduct = (props) => {
    const { productsFiltered } = props;

    return (
        <View style={{ width: width }}>
            {productsFiltered.length > 0 ? (
                <FlatList
                    data={productsFiltered}
                    keyExtractor={(item) => item.id}

                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.listItem}
                            onPress={() => {
                                props.navigation.navigate('Product Details', { item: item }
                                )
                            }}>
                            <Image
                                source={{
                                    uri: item.image
                                        ? item.image
                                        : "https://i.pinimg.com/474x/47/32/eb/4732eb1592b116443340917e51eed478.jpg",
                                }}
                                style={styles.thumbnail}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.description} numberOfLines={2}>
                                    {item.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: "center" }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    thumbnail: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: 'gray',
    },
});

export default SearchedProduct;
