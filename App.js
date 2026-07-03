import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './components/BottomNavTabs';
import {ThemeProvider} from './components/ThemeContext';

export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <BottomTabs/>
            </NavigationContainer>
        </ThemeProvider>
    );
}
