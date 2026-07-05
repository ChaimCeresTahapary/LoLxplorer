import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import jungleCamps from '../data/jungleCamps.json';
import {useTheme} from '../components/ThemeContext';
import JungleCampDetailCard from '../components/JungleCampDetailCard';
import JungleCampListItem from '../components/JungleCampListItem';

const CAPELLE_REGION = {
    latitude: 51.9306,
    longitude: 4.5876,
    latitudeDelta: 0.03,
    longitudeDelta: 0.04,
};

export default function MapPage() {
    const mapRef = useRef(null);
    const {isDarkMode} = useTheme();
    const [selectedCamp, setSelectedCamp] = useState(jungleCamps[0]);

    const selectCamp = (camp) => {
        setSelectedCamp(camp);

        if (mapRef.current) {
            mapRef.current.animateToRegion(
                {
                    latitude: camp.latitude,
                    longitude: camp.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                700
            );
        }
    };

    return (
        <ScrollView
            style={[styles.screen, {backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc'}]}
            contentContainerStyle={styles.content}
        >
            <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#0f172a'}]}>
                Jungle Camp Map
            </Text>
            <Text style={[styles.subtitle, {color: isDarkMode ? '#cbd5e1' : '#475569'}]}>
                Based on Capelle aan den IJssel in Zuid-Holland. Tap a camp to see its image,
                description, buffs, gold, and respawn time.
            </Text>

            <View style={[styles.mapCard, {backgroundColor: isDarkMode ? '#111827' : '#ffffff'}]}>
                <MapView ref={mapRef} style={styles.map} initialRegion={CAPELLE_REGION}>
                    {jungleCamps.map((camp) => (
                        <Marker
                            key={camp.id}
                            coordinate={{latitude: camp.latitude, longitude: camp.longitude}}
                            pinColor={selectedCamp.id === camp.id ? '#f59e0b' : '#ef4444'}
                            onPress={() => selectCamp(camp)}
                        />
                    ))}
                </MapView>
            </View>

            <JungleCampDetailCard camp={selectedCamp} isDarkMode={isDarkMode} />

            <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#0f172a'}]}>
                All jungle camps
            </Text>

            {jungleCamps.map((camp) => (
                <JungleCampListItem
                    key={camp.id}
                    camp={camp}
                    isDarkMode={isDarkMode}
                    selected={selectedCamp.id === camp.id}
                    onPress={() => selectCamp(camp)}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 28,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
    },
    mapCard: {
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 16,
    },
    map: {
        width: '100%',
        height: 320,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 10,
    },
});
