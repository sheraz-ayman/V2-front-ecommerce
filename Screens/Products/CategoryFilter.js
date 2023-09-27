import React from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Text,
} from "react-native";


const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "#f2f2f2" }}
        >

            {props.categories.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                        props.categoryFilter(item.id);
                        props.setActive(props.categories.indexOf(item));
                    }}>
                    <View style={[styles.center, styles.categoryItem, { margin: 5 },
                    props.active == props.categories.indexOf(item)
                        ? styles.active
                        : styles.inactive]}>
                        <Text style={{ color: "white" }}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    categoryItem: {
        margin: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#a0e1eb", // Set your default background color here
    },
    active: {
        backgroundColor: "#03bafc",
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
});

export default CategoryFilter;
