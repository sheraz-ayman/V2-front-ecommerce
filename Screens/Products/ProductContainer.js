import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import ProductList from './ProductList';
import { Ionicons } from '@expo/vector-icons';
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';


var { height } = Dimensions.get('window')

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true)

    const getProducts = async () => {
        try {
            const response = await axios.get(
                'http://192.168.100.105:5000/api/v1/products'
            );
            setProducts(response.data);
            setProductsFiltered(response.data);
            setProductsCtg(response.data);
            setInitialState(response.data);
            setLoading(false)
        } catch (error) {
            console.log("API call error:", error);
        }
    };
    const getCategories = async () => {
        try {
            const response = await axios.get(
                'http://192.168.100.105:5000/api/v1/categories'
            );
            setCategories(response.data);
        } catch (error) {
            console.log("API call error:", error);
        }
    };

    useFocusEffect((useCallback(
        () => {
            setFocus(false);
            setActive(-1);
            getProducts();
            getCategories();
        },
        [],
    )
    ))
    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    // Categories
    const changeCtg = (ctg) => {
        ctg === 'all'
            ? [setProductsCtg(initialState), setActive(true)]
            : [setProductsCtg(products.filter((i) => i.id === ctg)), setActive(true)];
    };

    return (
        <>
        {loading == false ?(
        <ScrollView>
            <View>
                <View style={styles.header}>
                    <Ionicons name="ios-search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#888"
                        onFocus={openList}
                        onChangeText={(text) => searchProduct(text)}
                    />
                    {focus == true ? (
                        <Ionicons onPress={onBlur} name='ios-close' size={20} />
                    ) : null}
                </View>
                {focus == true ? (
                    <SearchedProduct
                        navigation={props.navigation}
                        productsFiltered={productsFiltered}
                    />
                ) : (
                    <View>
                        <View>
                            <Banner />
                        </View>
                        <View>
                            <CategoryFilter
                                categories={categories}
                                categoryFilter={changeCtg}
                                productsCtg={productsCtg}
                                active={active}
                                setActive={setActive}
                            />
                        </View>
                        {productsCtg.length > 0 ? (
                            <View style={styles.listContainer}>
                                {productsCtg.map((item) => (
                                    <ProductList
                                        navigation={props.navigation}
                                        key={item.id}
                                        item={item}
                                    />
                                ))}
                            </View>
                        ) : (
                            <View style={styles.center}>
                                <Text>No products found</Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </ScrollView>
        ):(
            //loading
            <View style={[styles.center,{backgroundColor:"f2f2f2"}]}>
                <ActivityIndicator size='large' color='red'/>
            </View>
        )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        backgroundColor: 'gainsboro',
    },
    listContainer: {
        flex: 1,
        height: height,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: 'gainsboro',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'gainsboro',
        paddingHorizontal: 16,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        margin: 10,
        height: 35
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: 'black',
    },
    center: {
        backgroundColor: 'gainsboro',
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 2

    }
});


export default ProductContainer;
