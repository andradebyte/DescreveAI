import React, { forwardRef, useRef } from 'react';
import {
    View,
    Animated,
    FlatList,
    Image,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;     // 80 % da largura da tela
const GAP = 10;              // espaço entre cards
const ITEM_LENGTH = ITEM_WIDTH + GAP;

type ImageItem = { id: string; image: any; description: string };

type Props = {
    images: ImageItem[];
    onScrollIndexChanged?: (index: number) => void;
};

const Carousel = forwardRef<FlatList, Props>(
    ({ images, onScrollIndexChanged }, ref) => {
        const scrollX = useRef(new Animated.Value(0)).current;



        return (
            <Animated.FlatList
                ref={ref}
                data={images}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_LENGTH}
                decelerationRate="fast"
                getItemLayout={(_, i) => ({
                    length: ITEM_LENGTH,
                    offset: ITEM_LENGTH * i,
                    index: i,
                })}
                contentContainerStyle={{
                    paddingHorizontal: (width - ITEM_WIDTH) / 2,
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                    // efeito de “zoom” suave no item central
                    const inputRange = [
                        (index - 1) * ITEM_LENGTH,
                        index * ITEM_LENGTH,
                        (index + 1) * ITEM_LENGTH,
                    ];
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.9, 1, 0.9],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
                            <Image source={item.image} style={styles.image} />
                            <TouchableOpacity style={styles.descContainer}>
                                <Text style={styles.description}>{item.description}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                }}
                onMomentumScrollEnd={(e) => {
                    const idx = Math.round(e.nativeEvent.contentOffset.x / ITEM_LENGTH);
                    onScrollIndexChanged?.(idx);
                }}
                ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
            />
        );
    }
);

const styles = StyleSheet.create({
    card: {
        width: ITEM_WIDTH,
        overflow: 'hidden',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    description: {
        paddingVertical: 10,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    descContainer: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        marginTop: 20,
        borderRadius: 20,
        width: '100%'
    }
});

export default Carousel;
