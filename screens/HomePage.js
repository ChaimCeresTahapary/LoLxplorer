import React, {useEffect, useMemo, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../components/ThemeContext';
import {useFavorites} from '../components/isfavorite';
import {getData} from '../components/GetApi';
import ChampionHighlightCard from '../components/ChampionHighlightCard';
import championLore from '../data/championLore.json';


export default function HomePage() {
    const {isFavorite} = useFavorites();
    const {isDarkMode} = useTheme();
    const [champions, setChampions] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Assassin', 'Mage', 'Fighter', 'Marksman'];

    useEffect(() => {
        async function loadChampions() {
            const data = await getData();
            setChampions(data);
        }

        loadChampions();
    }, []);

    const detailedChampions = useMemo(() => {
        return champions.map((champ) => {
            const lore = championLore[champ.name] || {};
            return {
                ...champ,
                lore: lore.lore || '',
            };
        });
    }, [champions]);

    const filteredChamps = detailedChampions
        .filter((champ) => isFavorite(champ.name))
        .filter((champ) => (champ.name || '').toLowerCase().includes(search.toLowerCase()))
        .filter((champ) => (selectedCategory === 'All' ? true : champ.role === selectedCategory));

    return (
        <ScrollView
            style={[styles.container, {backgroundColor: isDarkMode ? '#0f172a' : '#ffffff'}]}
            contentContainerStyle={styles.content}
        >
            <View style={styles.profileCard}>
                <Image
                    source={{uri: 'https://avatars.githubusercontent.com/u/182497999?v=4'}}
                    style={styles.profileImage}
                />
            </View>

            <TextInput
                placeholder="Search champions..."
                placeholderTextColor="#999"
                style={[
                    styles.search,
                    {
                        backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                        color: isDarkMode ? '#fff' : '#000',
                    },
                ]}
                value={search}
                onChangeText={setSearch}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.tab,
                            {backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0'},
                            selectedCategory === cat && styles.tabActive,
                        ]}
                        onPress={() => setSelectedCategory(cat)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                {color: isDarkMode ? '#e2e8f0' : '#333'},
                                selectedCategory === cat && styles.tabTextActive,
                            ]}
                        >
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#000'}]}>
                Favorite highlights
            </Text>

            <View style={styles.grid}>
                {filteredChamps.length === 0 ? (
                    <Text style={[styles.emptyState, {color: isDarkMode ? '#cbd5e1' : '#666'}]}>
                        No champions match your filters.
                    </Text>
                ) : (
                    filteredChamps.map((champ) => (
                        <ChampionHighlightCard
                            key={champ.name}
                            champion={champ}
                            isDarkMode={isDarkMode}
                        />
                    ))
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    profileCard: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    search: {
        backgroundColor: '#1e293b',
        color: '#fff',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
    },
    tabs: {
        marginBottom: 18,
    },
    tab: {
        backgroundColor: '#1e293b',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 999,
        marginRight: 10,
    },
    tabActive: {
        backgroundColor: '#3b82f6',
    },
    tabText: {
        color: '#e2e8f0',
        fontWeight: '600',
    },
    tabTextActive: {
        color: '#fff',
        fontWeight: '700',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 12,
    },
    grid: {
        gap: 12,
    },
    emptyState: {
        color: '#cbd5e1',
        textAlign: 'center',
        marginTop: 12,
    },
});