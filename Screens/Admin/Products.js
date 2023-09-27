import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, Image, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Products = (props) => {
  const [productList, setProductList] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    // Get Token
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get('http://192.168.100.105:5000/api/v1/products')
      .then((res) => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredProducts = productList.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setProductFilter(filteredProducts);
  };

  const clearSearch = () => {
    setSearchText('');
    setProductFilter(productList);
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Image</Text>
        <Text style={styles.headerText}>Brand</Text>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Price</Text>
      </View>
    );
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
    onPress={()=>{
      props.navigation.navigate("Product Details" , {item:props})
    }} 
    onLongPress={()=>setModalVisible(true)}
    style={styles.productItem}>
      <Image
        resizeMode='contain'
        style={styles.productImage}
        source={{
          uri: item.image ? item.image : " https://i.pinimg.com/474x/47/32/eb/4732eb1592b116443340917e51eed478.jpg"
        }}
      />
      <Text style={styles.productText}>{item.brand}</Text>
      <Text style={styles.productText} numberOfLines={1}>{item.name}</Text>
      <Text style={[styles.productText, {
        marginLeft: 40,
      }]} >{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.headerContainer}
        centerComponent={{ text: 'Product List', style: styles.headerText }}
      />

      <View style={styles.searchContainer}>
        <Ionicons name="ios-search" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#888"
          onChangeText={handleSearch}
          value={searchText}
        />
        {searchText.length > 0 && (
          <Ionicons
            name="ios-close-circle"
            size={24}
            color="black"
            style={styles.clearButton}
            onPress={clearSearch}
          />
        )}
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      ) : (
        <>

          <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false)
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableHighlight
                  underlayColor="#E8E8E8"
                  onPress={() => {
                    setModalVisible(false)
                  }}
                  style={{
                    alignSelf: "flex-end",
                    position: 'absolute',
                    top: 5,
                    right: 10
                  }}
                >
                  <Ionicons
                    name="ios-close-circle"
                    size={24}
                    color="black"
                    style={styles.clearButton}
                  />
                </TouchableHighlight>
                <Button title="Edit"
                onPress={()=>[
                  props.navigation.navigate("ProductForm"),
                  setModalVisible(false)
                ]}
                />
                <Button 
                title="Delete"
                //Delete
                />
              </View>
            </View>

          </Modal>
          <FlatList
            data={productFilter}
            ListHeaderComponent={renderHeader}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    borderBottomWidth: 0,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gainsboro',
    paddingHorizontal: 16,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    margin: 10,
    height: 35,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
  clearButton: {
    marginRight: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
  },
  productItem: {
    flexDirection: 'row', // Display items in a row
    alignItems: 'center', // Center items vertically
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 80, // Adjust the image width as needed
    height: 80, // Adjust the image height as needed
    marginRight: 16,
  },
  productText: {
    flex: 1, // Take up the remaining space
  },
  centeredView:{
    flex : 1,
    justifyContent:'center',
    alignItems:"center",
    marginTop:22,
  },
  modalView:{
    margin:20,
    backgroundColor :"white" ,
    borderRadius:20,
    padding:35,
    alignItems:"center",
    shadowColor: "#000",
    shadowOffset:{
      width:0,
      height:2
    },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5
  }
});

export default Products;
