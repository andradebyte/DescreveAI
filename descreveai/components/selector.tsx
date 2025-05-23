// src/components/selector.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

type Props = {
    selected: 'OpenAI' | 'Gemini' | null
    onSelect: (name: 'OpenAI' | 'Gemini') => void
}

const IASelector: React.FC<Props> = ({ selected, onSelect }) => {
    const options = [
        { name: 'OpenAI' as const, logo: 'https://static-00.iconduck.com/assets.00/openai-icon-2021x2048-4rpe5x7n.png' },
        { name: 'Gemini' as const, logo: 'https://brandlogos.net/wp-content/uploads/2025/03/gemini_icon-logo_brandlogos.net_bqzeu-512x512.png' }
    ]

    return (
        <View style={styles.container}>
            {options.map(opt => (
                <TouchableOpacity
                    key={opt.name}
                    style={[styles.button, selected === opt.name && styles.buttonSelected]}
                    onPress={() => onSelect(opt.name)}
                >
                    <Image source={{ uri: opt.logo }} style={styles.logo} resizeMode="contain" />
                    <Text style={[styles.buttonText, selected === opt.name && styles.buttonTextSelected]}>
                        {opt.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default IASelector

const styles = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'center', padding: 10 },
    button: {
        alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16,
        borderRadius: 100, backgroundColor: '#e0e0e0', marginHorizontal: 5, width: 100,
    },
    buttonSelected: { backgroundColor: '#333' },
    buttonText: { color: '#000', fontWeight: 'bold', marginTop: 8, fontSize: 12, textAlign: 'center' },
    buttonTextSelected: { color: '#fff' },
    logo: { width: 24, height: 24 },
})
