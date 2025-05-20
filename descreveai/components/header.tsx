import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Text,
    Pressable,
    Platform
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Header = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const openCamera = async () => {
        setModalVisible(false);
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Permissão negada para acessar a câmera');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) {
            console.log("Imagem tirada:", result.assets[0].uri);
        }
    };

    const openGallery = async () => {
        setModalVisible(false);
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permissão negada para acessar a galeria');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) {
            console.log("Imagem selecionada:", result.assets[0].uri);
        }
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <FontAwesome name="camera" size={24} color="black" />
            </TouchableOpacity>

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.option} onPress={openCamera}>
                            <FontAwesome name="camera" size={20} color="#333" />
                            <Text style={styles.optionText}>Tirar Foto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.option} onPress={openGallery}>
                            <FontAwesome name="image" size={20} color="#333" />
                            <Text style={styles.optionText}>Galeria</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: '8%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: '10%',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: 250,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    optionText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
    },
});

export default Header;
