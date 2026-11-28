/* eslint-disable react-hooks/refs */
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  Keyboard,
  PanResponder,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import { clearData, getData, storeData } from '../storage'
import NotesList from './NotesList'
import { ThemeContext } from '../../App'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const justifyContentOptions = ['flex-start', 'center', 'flex-end'] as const

export default function NotesScreen() {
  const [text, onChangeText] = useState('')
  const [listOfNotes, setListOfNotes] = useState<string[]>([])
  const [justifyContent, setJustifyContent] =
    useState<(typeof justifyContentOptions)[number]>('center')
  const [isPositioning, setIsPositioning] = useState(false)
  const positioningEnabledRef = useRef(false)
  const justifyContentRef = useRef(justifyContent)
  const containerHeightRef = useRef(0)
  const dragStartIndexRef = useRef(0)
  const dragStartDyRef = useRef(0)

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        console.log('Retrieved data from AsyncStorage:', data)
        setListOfNotes(data)
      }
    })
  }, [])

  const { borderColor, textColor, themeContainerBg } = useContext(ThemeContext)

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (_, { dy }) =>
          positioningEnabledRef.current && Math.abs(dy) > 5,
        onPanResponderGrant: (_, { dy }) => {
          dragStartIndexRef.current = justifyContentOptions.indexOf(
            justifyContentRef.current,
          )
          dragStartDyRef.current = dy
        },
        onPanResponderMove: (_, { dy }) => {
          const stepSize = Math.max(containerHeightRef.current / 4, 1)
          const offset = Math.round((dy - dragStartDyRef.current) / stepSize)
          const nextIndex = Math.max(
            0,
            Math.min(
              justifyContentOptions.length - 1,
              dragStartIndexRef.current + offset,
            ),
          )
          const nextJustifyContent = justifyContentOptions[nextIndex]
          if (justifyContentRef.current !== nextJustifyContent) {
            justifyContentRef.current = nextJustifyContent
            setJustifyContent(nextJustifyContent)
          }
        },
        onPanResponderRelease: () => {
          positioningEnabledRef.current = false
          setIsPositioning(false)
        },
        onPanResponderTerminate: () => {
          positioningEnabledRef.current = false
          setIsPositioning(false)
        },
      }),
    [],
  )

  const onLongPress = () => {
    positioningEnabledRef.current = true
    setIsPositioning(true)
  }
  const onTouchEnd = () => {
    positioningEnabledRef.current = false
    setIsPositioning(false)
  }

  return (
    <>
      <View
        {...panResponder.panHandlers}
        onTouchStart={Keyboard.dismiss}
        onLayout={({ nativeEvent }) => {
          containerHeightRef.current = nativeEvent.layout.height
        }}
        style={{
          width: '99%',
          flex: 1,
          margin: 4,
          justifyContent,
        }}
      >
        <View>
          {listOfNotes.length ? (
            <Pressable
              onLongPress={onLongPress}
              onTouchEnd={onTouchEnd}
              delayLongPress={200}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {isPositioning && (
                <>
                  <MaterialCommunityIcons
                    name={
                      justifyContentRef.current === 'flex-start'
                        ? 'arrow-down'
                        : justifyContentRef.current === 'flex-end'
                          ? 'arrow-up'
                          : 'swap-vertical'
                    }
                    size={32}
                    color={borderColor}
                    style={{ alignSelf: 'center' }}
                  />
                </>
              )}
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name='drag-horizontal-variant'
                  size={40}
                  color={borderColor}
                />
              </View>
              {isPositioning && (
                <>
                  <MaterialCommunityIcons
                    name={
                      justifyContentRef.current === 'flex-start'
                        ? 'arrow-down'
                        : justifyContentRef.current === 'flex-end'
                          ? 'arrow-up'
                          : 'swap-vertical'
                    }
                    size={32}
                    color={borderColor}
                    style={{ alignSelf: 'center' }}
                  />
                </>
              )}
            </Pressable>
          ) : null}
          <View
            style={{
              marginBottom: justifyContentRef.current === 'center' ? 40 : 0,
            }}
          >
            <NotesList listOfNotes={listOfNotes} />
          </View>
        </View>
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
          onTouchStart={Keyboard.dismiss}
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
              fontSize: 18,
            },
          ]}
          onChangeText={onChangeText}
          placeholder='Add'
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
