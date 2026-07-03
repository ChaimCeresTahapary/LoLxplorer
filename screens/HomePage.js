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
import {getData} from "../components/GetApi"; // jouw API

export default function HomePage() {
    const navigation = useNavigation();
    const {isFavorite} = useTheme();

    const [champions, setChampions] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Assassins", "Mages", "Fighter", "Bruisers"];

    // 🔥 API CALL — haalt champions online op
    useEffect(() => {
        async function loadChampions() {
            const data = await getData();
            setChampions(data); // moet een array zijn
        }

        loadChampions();
    }, []);

    // 🔥 FILTER PIPELINE (favorites + search + category)
    const filteredChamps = champions
        // 1. alleen favorieten
        .filter((champ) => isFavorite(champ.name))

        // 2. search filter
        .filter((champ) =>
            champ.name.toLowerCase().includes(search.toLowerCase())
        )

        // 3. categorie filter
        .filter((champ) =>
            selectedCategory === "All"
                ? true
                : champ.role === selectedCategory
        );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

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
                value={search}
                onChangeText={setSearch}
            />

            {/* CATEGORY TABS */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.tab,
                            selectedCategory === cat && styles.tabActive
                        ]}
                        onPress={() => setSelectedCategory(cat)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedCategory === cat && styles.tabTextActive
                            ]}
                        >
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Favorite highlights</Text>

            {/* FAVORIETE + GEFILTERDE CHAMPIONS */}
            <View style={styles.grid}>
                {filteredChamps.length === 0 ? (
                    <Text style={styles.emptyState}>
                        No champions match your filters.
                    </Text>
                ) : (
                    filteredChamps.map((champ) => (
                        <TouchableOpacity
                            key={champ.name}
                            style={styles.card}
                            onPress={() => navigation.navigate("ProfilePage")}
                        >
                            <Image source={{uri: champ.img}} style={styles.cardImage}/>
                            <Text style={styles.cardName}>{champ.name}</Text>
                            <Text style={styles.cardRole}>{champ.role}</Text>
                        </TouchableOpacity>
                    ))
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    profileCard: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    search: {
        backgroundColor: "#1e293b",
        color: "#fff",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
    },
    tabs: {
        marginBottom: 18,
    },
    tab: {
        backgroundColor: "#1e293b",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 999,
        marginRight: 10,
    },
    tabActive: {
        backgroundColor: "#3b82f6",
    },
    tabText: {
        color: "#e2e8f0",
        fontWeight: "600",
    },
    tabTextActive: {
        color: "#fff",
        fontWeight: "700",
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
    },
    grid: {
        gap: 12,
    },
    emptyState: {
        color: "#cbd5e1",
        textAlign: "center",
        marginTop: 12,
    },
    card: {
        backgroundColor: "#1e293b",
        borderRadius: 16,
        overflow: "hidden",
    },
    cardImage: {
        width: "100%",
        height: 180,
    },
    cardName: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        paddingHorizontal: 14,
        paddingTop: 12,
    },
    cardRole: {
        color: "#94a3b8",
        paddingHorizontal: 14,
        paddingTop: 4,
        paddingBottom: 14,
    },
});
