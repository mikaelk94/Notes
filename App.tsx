import { StatusBar } from 'expo-status-bar'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import NotesScreen from './src/components/NotesScreen'
import { createContext, useState } from 'react'
import { NavigationBar } from 'expo-navigation-bar'
import { FloatingActionButton } from './src/components/FAB'
import { SafeAreaView } from 'react-native-safe-area-context'

export const ThemeContext = createContext({
  theme: 'dark',
  themeContainerBg: '#27374D',
  buttonBg: '#526D82',
  borderColor: '#3b3b3b',
  textColor: '#ffffff',
})

export default function App() {
  const colorScheme = useColorScheme()
  const [localScheme, setLocalScheme] = useState(colorScheme ?? 'dark')

  const themeContainerBg = localScheme === 'light' ? '#e9e9e9' : '#222222'
  const buttonBg = localScheme === 'light' ? '#fff' : '#343434'
  const borderColor = localScheme === 'light' ? '#5f5f63' : '#b1b1b1'
  const textColor = localScheme === 'light' ? '#000' : '#e9e9e9'

  console.log('Current color scheme:', localScheme) // Log the current color scheme

  return (
    <ThemeContext.Provider
      value={{
        theme: localScheme,
        themeContainerBg: themeContainerBg,
        buttonBg: buttonBg,
        borderColor: borderColor,
        textColor: textColor,
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: themeContainerBg }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.container, { backgroundColor: themeContainerBg }]}
        >
          <StatusBar style={localScheme === 'light' ? 'dark' : 'light'} />
          <NavigationBar style={localScheme === 'light' ? 'dark' : 'light'} />
          <NotesScreen />
        </KeyboardAvoidingView>
        <FloatingActionButton
          onPress={() =>
            setLocalScheme(localScheme === 'light' ? 'dark' : 'light')
          }
        />
      </SafeAreaView>
    </ThemeContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 3,
    paddingTop: 60,
    borderColor: 'red',
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
  },
})
