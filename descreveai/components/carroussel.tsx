import React, { useRef } from 'react';
import {
    View,
    Animated,
    FlatList,
    Image,
    Dimensions,
    StyleSheet,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const GAP = 5;
const SPACER = (width - ITEM_WIDTH) / 3;

type CarouselProps = {
    images: string[];
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    type CarouselItem = { key: string; uri?: string };

    const dataWithSpacers: CarouselItem[] = [
        { key: 'left-spacer' },
        ...images.map((img, i) => ({ key: `img-${i}`, uri: img })),
        { key: 'right-spacer' },
    ];

    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={dataWithSpacers}
                keyExtractor={(item) => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH + GAP}
                decelerationRate="fast"
                bounces={false}
                contentContainerStyle={{ alignItems: 'center' }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                    if (!item.uri) {
                        return <View style={{ width: SPACER }} />;
                    }

                    const inputRange = [
                        (index - 2) * (ITEM_WIDTH + GAP),
                        (index - 1) * (ITEM_WIDTH + GAP),
                        index * (ITEM_WIDTH + GAP),
                    ];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.9, 1, 0.9],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View style={[styles.imageContainer, { transform: [{ scale }] }]}>
                            <Image source={{ uri: item.uri }} style={styles.image} />
                        </Animated.View>
                    );
                }}
                ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: 300,
    },
    imageContainer: {
        width: ITEM_WIDTH,
        height: 300,
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
});

export default Carousel;
