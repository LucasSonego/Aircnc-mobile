import React, {useState} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    StyleSheet,
    Platform,
    AsyncStorage,
    StatusBar
} from 'react-native'

import api from '../services/api'

export default function Book({navigation}){
    const id = navigation.getParam('id');

    const [date, setDate] = useState('')

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookings`,{
            date
        },{
            headers: {user_id}
        })
        Alert.alert("Solicitação de reserva enviada.");
        navigation.navigate('List');
    }

    function cancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.form}>
                <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor="#999"
                    keyboardType="visible-password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cancel} style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 35 : 0,
        alignItems: "center",
        marginTop: 10,
    },

    form: {
        alignSelf: "stretch",
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: "bold",
        color: "#444",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,

    },
    cancelButton: {
        backgroundColor: "#ccc",
        marginTop: 10
    }
});