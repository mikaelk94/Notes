import { useContext, useEffect, useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { clearData, getData, storeData } from '../storage'
import NotesList from './NotesList'
import { ThemeContext } from '../../App'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function NoteInput() {
  const [text, onChangeText] = useState('')
  const [listOfNotes, setListOfNotes] = useState<string[]>([])

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        console.log('Retrieved data from AsyncStorage:', data)
        setListOfNotes(data)
      }
    })
  }, [])

  const { borderColor, textColor, themeContainerBg } = useContext(ThemeContext)

  return (
    <>
      <View
        style={{
          width: '99%',
          flex: 1,
          margin: 4,
        }}
      >
        <NotesList listOfNotes={listOfNotes} />
      </View>
      <View
        style={{
          margin: 4,
          flexDirection: 'row',
          width: '98%',
          gap: 8,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.85 : 1,
              backgroundColor: themeContainerBg,
              borderWidth: 2,
              borderColor: borderColor,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
            },
          ]}
          onPress={() =>
            clearData().then(() => {
              setListOfNotes([])
            })
          }
        >
          <MaterialCommunityIcons
            name='trash-can-outline'
            size={32}
            color={borderColor}
          />
        </Pressable>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: borderColor,
              color: textColor,
              flex: 7,
              borderRadius: 4,
            },
          ]}
          onChangeText={onChangeText}
          placeholder='Add a note'
          placeholderTextColor={textColor}
          value={text}
          onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) => {
            if (!text.trim()) return // Prevent adding empty notes
            console.log('Submitted:', text)
            onChangeText('') // Clear the input after submission
            setListOfNotes([...listOfNotes, text])
            storeData([...listOfNotes, text]) // Store the updated list in AsyncStorage
          }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    borderWidth: 1,
    padding: 12,
  },
})
