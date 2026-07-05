import React, {useState} from 'react';
import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';

export default function ChampionHighlightCard({champion, isDarkMode}) {
    const [showLore, setShowLore] = useState(false);

    const openWiki = () => {
        if (champion.wikiUrl) {
            Linking.openURL(champion.wikiUrl);
        }
    };

    return (
        <View style={[styles.card, {backgroundColor: isDarkMode ? '#1e293b' : '#f0f0f0'}]}>
            <Pressable style={styles.face} onPress={() => setShowLore((value) => !value)}>
                {showLore ? (
                    <View style={[styles.loreFace, {backgroundColor: isDarkMode ? '#0f172a' : '#e2e8f0'}]}>
                        <Text style={[styles.loreTitle, {color: isDarkMode ? '#fff' : '#000'}]}>
                            {champion.name}
                        </Text>
                        <Text style={[styles.description, {color: isDarkMode ? '#e2e8f0' : '#334155'}]}>
                            {champion.lore}
                        </Text>
                    </View>
                ) : (
                    <Image source={{uri: champion.img}} style={styles.image} />
                )}
            </Pressable>

            <View style={styles.body}>
                <Text style={[styles.name, {color: isDarkMode ? '#fff' : '#000'}]}>
                    {champion.name}
                </Text>
                <Text style={[styles.role, {color: isDarkMode ? '#94a3b8' : '#666'}]}>
                    {champion.role}
                </Text>

                <View style={styles.footer}>
                    <Text style={[styles.hint, {color: isDarkMode ? '#cbd5e1' : '#475569'}]}>
                        {showLore ? 'Lore shown above' : 'Tap image to flip to lore'}
                    </Text>
                    <Pressable onPress={openWiki} style={styles.profileLinkButton}>
                        <Text style={styles.profileLink}>Open</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    face: {
        minHeight: 180,
    },
    image: {
        width: '100%',
        height: 180,
    },
    loreFace: {
        minHeight: 180,
        padding: 16,
        justifyContent: 'center',
    },
    loreTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 8,
    },
    body: {
        paddingHorizontal: 14,
        paddingTop: 12,
        paddingBottom: 14,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
    },
    role: {
        marginTop: 4,
        marginBottom: 10,
    },
    footer: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hint: {
        fontSize: 12,
        fontWeight: '600',
    },
    profileLink: {
        color: '#3b82f6',
        fontWeight: '700',
    },
    profileLinkButton: {
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
});
