import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Carousel from '@/components/carroussel';
import * as NavigationBar from 'expo-navigation-bar';
import Header from '@/components/header';
import Selector from '@/components/selector';

const HomePage = () => {

    useEffect(() => {
        const hideNavBar = async () => {
            await NavigationBar.setVisibilityAsync("hidden");
            await NavigationBar.setBehaviorAsync("inset-swipe");
        };
        hideNavBar();
    }, []);


    const data = [
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        'https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/45ed8ecf-0bb2-4e34-8fcf-624db47c43c8/Golden+Retrievers+dans+pet+care.jpeg',
        'https://veterinario.pt/wp-content/uploads/2015/09/cat-pet-animal-domestic-gato800.jpg',
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header />
            {/* Texto */}
            <Selector />
            {/* Carrossel */}
            <View style={styles.carouselContainer}>
                <Carousel
                    images={data}
                />
                <TouchableOpacity style={styles.textGeneratedContainer}>
                    <Text style={styles.textGenerated}>Aperte em descrever imagem</Text>
                </TouchableOpacity>
            </View>
            {/* Botão */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Descrever</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    textGeneratedContainer: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
        marginVertical: 30,
        marginHorizontal: 20,
    },
    textGenerated: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'semibold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    carouselContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },
    button: {
        backgroundColor: '#2C2C2C',
        color: '#fff',
        padding: 15,
        borderRadius: 100,
        width: 200,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomePage;
