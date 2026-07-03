import {View, Text, Switch} from 'react-native';
import {useTheme} from '../components/ThemeContext';

export default function SettingsPage() {
    const {isDarkMode, toggleDarkMode} = useTheme();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: isDarkMode ? '#121212' : '#f2f2f2',
                padding: 20,
                justifyContent: 'center',
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: isDarkMode ? '#fff' : '#000',
                    marginBottom: 10,
                }}
            >
                Settings
            </Text>

            <Text
                style={{
                    fontSize: 12,
                    color: isDarkMode ? '#fff' : '#000',
                    marginBottom: 5,
                    marginTop: 10,
                }}
            >Hello Challenger, this is the settings page you can customise your app on here.
                You can also favorite your champions and view them on the champs page,
                there's also a Dark Mode button for those that like the dark muwahah.
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        color: isDarkMode ? '#fff' : '#000',
                        marginBottom: 5,
                        fontWeight: 'bold',
                    }}
                >
                    Dark Mode
                </Text>

                <Switch value={isDarkMode} onValueChange={toggleDarkMode}/>
            </View>
        </View>
    );
}
