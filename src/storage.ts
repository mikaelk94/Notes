import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (value: string[]) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('my-key', jsonValue)
  } catch (e) {
    console.error('Error saving data to AsyncStorage:', e)
    // saving error
  }
}

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.log('Error reading data from AsyncStorage:', e)
    // error reading value
  }
}

export const clearData = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    console.error('Error clearing data from AsyncStorage:', e)
    // error clearing value
  }
}
