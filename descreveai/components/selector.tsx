import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const IASelector = () => {
    const [selected, setSelected] = useState<string | null>(null);

    const options = [
        { name: 'AWS', logo: 'https://static-00.iconduck.com/assets.00/ai-amazonrekognition-icon-1696x2048-77s6olqh.png' },
        { name: 'OpenAI', logo: 'https://static-00.iconduck.com/assets.00/openai-icon-2021x2048-4rpe5x7n.png' },
        { name: 'Gemini', logo: 'https://brandlogos.net/wp-content/uploads/2025/03/gemini_icon-logo_brandlogos.net_bqzeu-512x512.png' }
    ];

    return (
        <View style={styles.container}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.name}
                    style={[
                        styles.button,
                        selected === option.name && styles.buttonSelected
                    ]}
                    onPress={() => setSelected(option.name)}
                >
                    <Image
                        source={{ uri: option.logo }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={[
                        styles.buttonText,
                        selected === option.name && styles.buttonTextSelected
                    ]}>
                        {option.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default IASelector;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 100,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 5,
        width: 100,
    },
    buttonSelected: {
        backgroundColor: '#333333',
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        marginTop: 8,
        fontSize: 12,
        textAlign: 'center',
    },
    buttonTextSelected: {
        color: '#ffffff',
    },
    logo: {
        width: 24,
        height: 24,
    },
});
