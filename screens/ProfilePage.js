import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {getData} from '../components/GetApi'; // jouw API

export default function ProfilePage() {
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        async function loadChampions() {
            const data = await getData();   // haalt jouw champions op
            setChampions(data);             // zet ze in state
        }

        loadChampions();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Champions</Text>

            {champions.map((champ) => (
                <View key={champ.id} style={styles.card}>
                    <Text style={styles.name}>{champ.name}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20
    },
    card: {
        width: '90%',
        padding: 15,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginBottom: 10
    },
    name: {
        fontSize: 18,
        fontWeight: '600'
    }
});
