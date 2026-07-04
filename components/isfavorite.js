import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();
const FAVORITES_KEY = 'favoriteChamps';

export function FavoritesProvider({ children }) {
    const [favoriteChamps, setFavoriteChamps] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
            if (savedFavorites !== null) {
                setFavoriteChamps(JSON.parse(savedFavorites));
            }
        } catch (e) {
            console.log("Failed to load favorites:", e);
        }
        setIsLoaded(true);
    };

    const isFavorite = (champName) => favoriteChamps.includes(champName);

    const toggleFavorite = async (champName) => {
        const nextFavorites = favoriteChamps.includes(champName)
            ? favoriteChamps.filter((name) => name !== champName)
            : [...favoriteChamps, champName];

        setFavoriteChamps(nextFavorites);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    };

    const addFavorite = async (champName) => {
        if (!favoriteChamps.includes(champName)) {
            const nextFavorites = [...favoriteChamps, champName];
            setFavoriteChamps(nextFavorites);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
        }
    };

    const removeFavorite = async (champName) => {
        const nextFavorites = favoriteChamps.filter((name) => name !== champName);
        setFavoriteChamps(nextFavorites);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    };

    const clearFavorites = async () => {
        setFavoriteChamps([]);
        await AsyncStorage.removeItem(FAVORITES_KEY);
    };

    if (!isLoaded) return null;

    return (
        <FavoritesContext.Provider value={{
            favoriteChamps,
            isFavorite,
            toggleFavorite,
            addFavorite,
            removeFavorite,
            clearFavorites
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}