import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const ThemeContext = createContext();
const FAVORITES_KEY = 'favoriteChamps';

export function ThemeProvider({children}) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [favoriteChamps, setFavoriteChamps] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadPreferences() {
            try {
                const saved = await AsyncStorage.getItem('darkMode');
                if (saved !== null) {
                    setIsDarkMode(saved === 'true');
                }
                const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
                if (savedFavorites !== null) {
                    setFavoriteChamps(JSON.parse(savedFavorites));
                }
            } catch (e) {
                console.log("Failed to load preferences:", e);
            }
            setIsLoaded(true);
        }

        loadPreferences();
    }, []);

    const toggleDarkMode = async () => {
        const newValue = !isDarkMode;

        //  Melding wanneer dark mode wordt ingeschakeld
        if (newValue === true) {
            Alert.alert(
                "Dark Mode",
                "Ahh Challenger so you like the dark side huh? Well, enjoy the darkness!",
                [{text: "Ok", onPress: () => console.log("Dark Mode Alert Closed")}]
            );
        }

        setIsDarkMode(newValue);
        await AsyncStorage.setItem('darkMode', newValue.toString());
    };

    const isFavorite = (champName) => favoriteChamps.includes(champName);

    const toggleFavorite = async (champName) => {
        const nextFavorites = favoriteChamps.includes(champName)
            ? favoriteChamps.filter((name) => name !== champName)
            : [...favoriteChamps, champName];

        setFavoriteChamps(nextFavorites);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    };

    if (!isLoaded) return null;

    return (
        <ThemeContext.Provider value={{isDarkMode, toggleDarkMode, favoriteChamps, isFavorite, toggleFavorite}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
