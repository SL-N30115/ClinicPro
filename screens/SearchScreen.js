import { View, Text , StyleSheet} from "react-native";
import React from "react";
import TopBar from "../components/overview/TopBar";
import BottomTab from "../components/overview/BottomTab";
import { TapIconData } from "../data/TapIconData";
import SearchArea from "../components/search/SearchArea";


const SearchScreen = ({navigation}) => (
  <View style={styles.container}>
    <TopBar title={"Search"}/>
    <SearchArea navigation={navigation}/>
    <BottomTab icons={TapIconData} navigation={navigation} tabName={"Search"} />
  </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default SearchScreen;
