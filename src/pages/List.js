import React, {useState, useEffect} from 'react';
import { 
    SafeAreaView,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    AsyncStorage,
    Platform
} from 'react-native'

import logo from '../assets/logo.png'
import SpotList from '../components/SpotList'

export default function List({navigation}){
    const [techs, setTechs] = useState([]);

    useEffect(() =>{
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    function voltar(){
        AsyncStorage.removeItem('user');
        navigation.navigate("Login");
    }

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content"/>   
        <TouchableOpacity onPress={voltar}>
            <Image source={logo} style={styles.logo}/>
        </TouchableOpacity>
        <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //Android safe area
        paddingTop: Platform.OS === 'android' ? 35 : 0,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10
    }
});
