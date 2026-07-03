import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useTheme} from "../components/ThemeContext";

export default function HomePage() {
    const navigation = useNavigation();
    const {isFavorite} = useTheme();

    const [champions, setChampions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Assassins", "Mages", "Fighters", "Bruisers"];

    // 🔥 API CALL — haalt champions online op
    useEffect(() => {
        async function loadChampions() {
            try {
                const response = await fetch(
                    ""
                );
                const data = await response.json();
                setChampions(data);
            } catch (error) {
                console.log("API fout:", error);
            }
        }

        loadChampions();
    }, []);

    // 🔥 Alleen favorieten tonen
    const favoriteChamps = champions.filter((champ) =>
        isFavorite(champ.id)
    );

    return (
        <ScrollView style={styles.container}>
            {/* PROFILE */}
            <View style={styles.profileCard}>
                <Image
                    source={{uri: "https://i.imgur.com/4AiXzf8.jpeg"}}
                    style={styles.profileImage}
                />

            </View>

            {/* SEARCH */}
            <TextInput
                placeholder="Search champions..."
                placeholderTextColor="#999"
                style={styles.search}
            />

            {/* CATEGORY TABS */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        onPress={() => setSelectedCategory(cat)}
                        style={[
                            styles.tab,
                            selectedCategory === cat && styles.tabActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedCategory === cat && styles.tabTextActive,
                            ]}
                        >
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* FAVORIETE CHAMPIONS */}
            <View style={styles.grid}>
                {favoriteChamps.length === 0 && (
                    <Text style={{color: "#fff", textAlign: "center", marginTop: 20}}>
                        Je hebt nog geen favorieten.
                    </Text>
                )}

                {favoriteChamps.map((champ) => (
                    <TouchableOpacity
                        key={champ.id}
                        style={styles.card}
                        onPress={() => navigation.navigate("ChampionDetail", {champ})}
                    >
                        <Image source={{uri: champ.img}} style={styles.cardImage}/>
                        <Text style={styles.cardName}>{champ.name}</Text>
                        <Text style={styles.cardRole}>{champ.role}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}
