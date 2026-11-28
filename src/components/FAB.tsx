import React, { useContext } from 'react'
import { Pressable, StyleSheet, ViewStyle } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ThemeContext } from '../../App'

interface FabProps {
  onPress: () => void
  style?: ViewStyle
}

export function FloatingActionButton({ onPress, style }: FabProps) {
  const { theme, buttonBg, textColor } = useContext(ThemeContext)

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        pressed && styles.pressed,
        style,
        { backgroundColor: theme === 'light' ? '#9b9ca1' : buttonBg },
      ]}
      accessibilityRole='button'
      accessibilityLabel='Floating action button'
    >
      <MaterialCommunityIcons
        name='theme-light-dark'
        size={24}
        color={textColor}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex: 1,
    top: 50,
    right: 15,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    // Android shadow
    elevation: 6,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
})
