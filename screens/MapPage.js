import {View, Text} from 'react-native';
import {useTheme} from '../components/ThemeContext';

export default function MapPage() {
    const {isDarkMode} = useTheme();
    
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? '#0f172a' : '#ffffff'}}>
            <Text style={{color: isDarkMode ? '#fff' : '#000'}}>Map Page</Text>
        </View>
    );
}
