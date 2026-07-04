import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {useTheme} from '../components/ThemeContext';
import {getData} from '../components/GetApi';

export default function ProfilePage() {
    const [champions, setChampions] = useState([]);
    const {isDarkMode} = useTheme();

    useEffect(() => {
        async function loadChampions() {
            const data = await getData();
            console.log("API RESULT:", data);

            // Als jouw JSON een array is:
            setChampions(data);

            // Als jouw JSON { champions: [...] } is:
            // setChampions(data.champions);
        }

        loadChampions();
    }, []);

    return (
        <ScrollView contentContainerStyle={[styles.container, {backgroundColor: isDarkMode ? '#0f172a' : '#ffffff'}]}
                    style={{flex: 1}}>
            <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>Champions</Text>

            {Array.isArray(champions) && champions.map((champ) => (
                <View key={champ.name} style={[styles.card, {backgroundColor: isDarkMode ? '#1e293b' : '#eee'}]}>
                    <Text style={[styles.name, {color: isDarkMode ? '#fff' : '#000'}]}>{champ.name}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        minHeight: '100%',
        flexGrow: 1
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20
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
