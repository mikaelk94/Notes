import { FlatList } from 'react-native'
import Note from './Note'

export default function NotesList(props: {
  listOfNotes: string[]
  onLongPress: () => void
  onTouchEnd: () => void
}) {
  const { listOfNotes, onLongPress, onTouchEnd } = props

  return (
    <FlatList
      contentContainerStyle={{
        margin: 2,
        flexGrow: 1,
        justifyContent: 'center',
      }}
      data={listOfNotes}
      renderItem={({ item }) => (
        <Note title={item} onLongPress={onLongPress} onTouchEnd={onTouchEnd} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}
