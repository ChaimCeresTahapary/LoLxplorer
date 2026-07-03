import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadTheme() {
            try {
                const saved = await AsyncStorage.getItem('darkMode');
                if (saved !== null) {
                    setIsDarkMode(saved === 'true');
                }
            } catch (e) {
                console.log("Failed to load theme:", e);
            }
            setIsLoaded(true);
        }

        loadTheme();
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

    if (!isLoaded) return null;

    return (
        <ThemeContext.Provider value={{isDarkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
