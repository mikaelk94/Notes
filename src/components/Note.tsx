import { Checkbox } from 'expo-checkbox'
import { useContext, useState } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { ThemeContext } from '../../App'

export default function Note({
  title,
  onLongPress,
  onTouchEnd,
}: {
  title: string
  onLongPress?: () => void
  onTouchEnd?: () => void
}) {
  const [isChecked, setChecked] = useState(false)

  const { buttonBg, borderColor, textColor } = useContext(ThemeContext)

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        },
        styles.section,
        isChecked && styles.checked,
        {
          borderColor: borderColor,
          backgroundColor: buttonBg,
        },
      ]}
      onPress={() => setChecked(!isChecked)}
      onLongPress={onLongPress}
      onTouchEnd={onTouchEnd}
      delayLongPress={300}
    >
      <Checkbox
        color={borderColor}
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
      />
      <Text style={[styles.paragraph, { color: textColor, fontSize: 18 }]}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    padding: 2,
    marginBottom: 4,
    borderWidth: 1,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checked: {
    opacity: 0.6,
  },
  checkbox: {
    margin: 8,
  },
})
