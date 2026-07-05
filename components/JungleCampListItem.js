import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

export default function JungleCampListItem({camp, isDarkMode, selected, onPress}) {
    return (
        <Pressable
            style={[
                styles.row,
                {
                    backgroundColor: isDarkMode ? '#111827' : '#ffffff',
                    borderColor: selected ? '#f59e0b' : 'transparent',
                },
            ]}
            onPress={onPress}
        >
            <Image source={{uri: camp.image}} style={styles.image} />
            <View style={styles.body}>
                <View style={styles.header}>
                    <Text style={[styles.name, {color: isDarkMode ? '#fff' : '#0f172a'}]}>
                        {camp.name}
                    </Text>
                    <Text style={[styles.respawn, {color: isDarkMode ? '#fbbf24' : '#d97706'}]}>
                        {camp.respawn}
                    </Text>
                </View>
                <Text style={[styles.text, {color: isDarkMode ? '#cbd5e1' : '#475569'}]}>
                    {camp.description}
                </Text>
                <Text style={[styles.text, {color: isDarkMode ? '#cbd5e1' : '#475569'}]}>
                    Buff: {camp.buff} · Gold: {camp.gold}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 14,
        marginRight: 12,
    },
    body: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    name: {
        fontSize: 16,
        fontWeight: '800',
        flex: 1,
        marginRight: 8,
    },
    respawn: {
        fontSize: 13,
        fontWeight: '700',
    },
    text: {
        fontSize: 13,
        lineHeight: 18,
    },
});
