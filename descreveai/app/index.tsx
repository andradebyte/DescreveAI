// src/screens/HomePage.tsx
import React, { useEffect, useRef, useState } from 'react'
import {
    SafeAreaView, View, Text, TouchableOpacity,
    StyleSheet, FlatList, StatusBar, Alert, Platform, ActivityIndicator
} from 'react-native'

import Carousel from '@/components/carroussel'
import Selector from '@/components/selector'
import { data as initialData } from '../data/data'

import * as NavigationBar from 'expo-navigation-bar'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'

import { fetchFromGemini } from '@/requisicoes/gemini'
import { fetchFromOpenAI } from '@/requisicoes/openai'

type ImageItem = { id: string; image: any; description: string }

export default function HomePage() {
    // estados
    const [carouselData, setCarouselData] = useState<ImageItem[]>(initialData)
    const [selectedIA, setSelectedIA] = useState<'OpenAI' | 'Gemini' | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [loading, setLoading] = useState(false)

    const carouselRef = useRef<FlatList>(null)

    // converte qualquer imagem (require ou URI) em Base64
    async function toBase64(imageSource: any): Promise<string> {
        let uri: string

        if (typeof imageSource === 'number') {
            // require(...)
            const asset = Asset.fromModule(imageSource)
            await asset.downloadAsync()
            uri = asset.localUri!
        } else if (imageSource.uri) {
            // já é um objeto { uri: 'file://…' } ou similar
            uri = imageSource.uri
        } else {
            throw new Error('Fonte de imagem inválida')
        }

        return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
    }

    // ao tocar no botão Descrever
    async function handleDescribe() {
        if (!selectedIA) {
            Alert.alert('Selecione a IA primeiro')
            return
        }

        try {
            setLoading(true)  // inicia o loading
            const b64 = await toBase64(carouselData[currentIndex].image)
            // escolhe a função certa
            const res = selectedIA === 'Gemini'
                ? await fetchFromGemini(b64)
                : await fetchFromOpenAI(b64)

            // atualiza a descrição no estado
            setCarouselData(prev =>
                prev.map((item, i) =>
                    i === currentIndex
                        ? { ...item, description: res.description }
                        : item
                )
            )
        } catch (e: any) {
            Alert.alert('Erro ao descrever imagem', e.message)
        } finally {
            setLoading(false)                                         // ← desliga o spinner
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar} />

            <Selector
                selected={selectedIA}
                onSelect={setSelectedIA}
            />

            <View style={{ height: 20 }} />

            <Carousel
                ref={carouselRef}
                images={carouselData}
                onScrollIndexChanged={setCurrentIndex}
            />

            {/* Aqui mostramos ou o spinner, ou o botão */}

            <TouchableOpacity
                style={styles.button}
                onPress={handleDescribe}
            >
                {loading ? (
                    <ActivityIndicator size="small" style={styles.spinner} />
                ) : (
                    <Text style={styles.buttonText}>Descrever</Text>)}
            </TouchableOpacity>

            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    topBar: { height: 50 },
    button: {
        backgroundColor: '#2C2C2C', padding: 15, borderRadius: 100,
        width: 200, height: 60, justifyContent: 'center',
        alignItems: 'center', alignSelf: 'center', marginBottom: 20,
    },
    spinner: {
        marginVertical: 20,
        alignSelf: 'center',
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
})
