import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import NotesScreen from './src/components/NotesScreen'
import { createContext, useState } from 'react'
import { NavigationBar } from 'expo-navigation-bar'
import { FloatingActionButton } from './src/components/FAB'

export const ThemeContext = createContext({
  theme: 'dark',
  themeContainerBg: '#27374D',
  buttonBg: '#526D82',
  borderColor: '#3b3b3b',
  textColor: '#ffffff',
})

export default function App() {
  const [localScheme, setLocalScheme] = useState('dark')

  const themeContainerBg = localScheme === 'light' ? '#fff' : '#141414'
  const buttonBg = localScheme === 'light' ? '#fff' : '#222222'
  const borderColor = localScheme === 'light' ? '#5f5f63' : '#424f94'
  const textColor = localScheme === 'light' ? '#000' : '#ffffff'

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
    </ThemeContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 3,
    paddingVertical: '13%',
    borderColor: 'red',
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
  },
})
