import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native' 
import Swiper from 'react-native-swiper/src'

const scroll1 = require('../assets/scroll1.png')
const scroll2 = require('../assets/scroll2.png')

var { width } = Dimensions.get('window') 

const Banner = () => {
    const [bannerData, setBannerData] = useState([scroll1, scroll2])

    useEffect(() => {
        // Clear the bannerData if needed
        // setBannerData([])
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width /1.8}}
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
                    >
                        {bannerData.map((item, index) => { 
                            return (
                                <Image
                                    key={index} // Use index as the key since the items are not unique
                                    style={styles.imageBanner}
                                    resizeMode='contain'
                                    source={item}
                                />
                            );
                        })}
                    </Swiper>
                    {/* <View style={{ height: 20 }}></View> */}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gainsboro'
    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10,
    },
    imageBanner: {
        height: width/2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

export default Banner;
