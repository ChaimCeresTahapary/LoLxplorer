import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomePage';
import SettingsPage from '../screens/SettingsPage';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useTheme} from './ThemeContext';
import MapPage from '../screens/MapPage';
import ProfilePage from "../screens/ProfilePage";


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    const {isDarkMode} = useTheme();


    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarActiveTintColor: isDarkMode ? '#fff' : 'dodgerblue',
                tabBarInactiveTintColor: isDarkMode ? '#888' : 'gray',
                tabBarStyle: {
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
                    borderTopWidth: 0,
                    elevation: 5,
                    height: 120,
                    paddingBottom: 20,
                    paddingTop: 10,
                },
                tabBarIcon: ({color, size}) => {
                    let iconName;
                    if (route.name === 'Home') iconName = 'home';
                    if (route.name === 'Jungle Map') iconName = 'paw';
                    if (route.name === 'Champs') iconName = 'people-sharp';
                    if (route.name === 'Settings') iconName = 'settings';
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomePage}/>
            <Tab.Screen name="Jungle Map" component={MapPage}/>
            <Tab.Screen name="Champs" component={ProfilePage}/>
            <Tab.Screen name="Settings" component={SettingsPage}/>
        </Tab.Navigator>
    );
}