import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './components/BottomNavTabs';
import {ThemeProvider} from './components/ThemeContext';
import {FavoritesProvider} from './components/isfavorite';

export default function App() {
    return (
        <ThemeProvider>
            <FavoritesProvider>
                <NavigationContainer>
                    <BottomTabs/>
                </NavigationContainer>
            </FavoritesProvider>
        </ThemeProvider>
    );
}
