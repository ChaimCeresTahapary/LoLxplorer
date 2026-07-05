import React from 'react';
import {View, Text, Switch, ScrollView, Image, StyleSheet} from 'react-native';
import {useTheme} from '../components/ThemeContext';
import {useFavorites} from '../components/isfavorite';
import championsData from '../data/Champs.json';

export default function SettingsPage() {
    const {isDarkMode, toggleDarkMode} = useTheme();
    const {isFavorite, toggleFavorite} = useFavorites();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={[
                styles.content,
                {backgroundColor: isDarkMode ? '#121212' : '#f2f2f2'},
            ]}
        >
            <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
                Settings
            </Text>

            <Text style={[styles.description, {color: isDarkMode ? '#fff' : '#000'}]}>
                Hello Challenger, in the settings menu you can customise your screen mode Light Mode or Dark Mode,
                here in settings you can also Favorite your champion so that it will be on the homescreen as a highlight
                the list of champions are on the nav tabs "Champs" or on settings Favorite Champs.
            </Text>

            <View style={styles.row}>
                <Text style={[styles.label, {color: isDarkMode ? '#fff' : '#000'}]}>
                    Dark Mode
                </Text>
                <Switch value={isDarkMode} onValueChange={toggleDarkMode}/>
            </View>

            <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#000'}]}>
                Favorite Champs
            </Text>

            {championsData.map((champ) => (
                <View
                    key={champ.name}
                    style={[
                        styles.champRow,
                        {backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff'},
                    ]}
                >
                    <Image source={{uri: champ.img}} style={styles.champImage}/>
                    <View style={styles.champInfo}>
                        <Text style={[styles.champName, {color: isDarkMode ? '#fff' : '#000'}]}>
                            {champ.name}
                        </Text>
                        <Text style={styles.champRole}>{champ.role}</Text>
                    </View>
                    <Switch
                        value={isFavorite(champ.name)}
                        onValueChange={() => toggleFavorite(champ.name)}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 18,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,

    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    champRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        padding: 12,
        marginBottom: 12,
    },
    champImage: {
        width: 52,
        height: 52,
        borderRadius: 26,
        marginRight: 12,
    },
    champInfo: {
        flex: 1,
    },
    champName: {
        fontSize: 16,
        fontWeight: '700',
    },
    champRole: {
        color: '#94a3b8',
        marginTop: 2,
    },
});
