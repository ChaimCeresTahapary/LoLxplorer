import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function JungleCampDetailCard({camp, isDarkMode}) {
    return (
        <View style={[styles.card, {backgroundColor: isDarkMode ? '#111827' : '#ffffff'}]}>
            <Image source={{uri: camp.image}} style={styles.image} />
            <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#0f172a'}]}>
                {camp.name}
            </Text>
            <Text style={[styles.location, {color: isDarkMode ? '#cbd5e1' : '#475569'}]}>
                {camp.location}
            </Text>
            <Text style={[styles.body, {color: isDarkMode ? '#e2e8f0' : '#334155'}]}>
                {camp.description}
            </Text>

            <View style={styles.metaRow}>
                <Text style={[styles.metaLabel, {color: isDarkMode ? '#93c5fd' : '#1d4ed8'}]}>
                    Respawn
                </Text>
                <Text style={[styles.metaValue, {color: isDarkMode ? '#fff' : '#0f172a'}]}>
                    {camp.respawn}
                </Text>
            </View>
            <View style={styles.metaRow}>
                <Text style={[styles.metaLabel, {color: isDarkMode ? '#93c5fd' : '#1d4ed8'}]}>
                    Buff
                </Text>
                <Text style={[styles.metaValue, {color: isDarkMode ? '#fff' : '#0f172a'}]}>
                    {camp.buff}
                </Text>
            </View>
            <View style={styles.metaRow}>
                <Text style={[styles.metaLabel, {color: isDarkMode ? '#93c5fd' : '#1d4ed8'}]}>
                    Gold
                </Text>
                <Text style={[styles.metaValue, {color: isDarkMode ? '#fff' : '#0f172a'}]}>
                    {camp.gold}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 14,
        marginBottom: 14,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 4,
    },
    location: {
        fontSize: 13,
        marginBottom: 10,
    },
    body: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(148,163,184,0.25)',
    },
    metaLabel: {
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    metaValue: {
        fontWeight: '700',
    },
});
