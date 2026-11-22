import { FlatList } from 'react-native'
import Note from './Note'

export default function NotesList(props: { listOfNotes: string[] }) {
  const { listOfNotes } = props

  return (
    <FlatList
      contentContainerStyle={{
        margin: 2,
        flexGrow: 1,
        justifyContent: 'center',
      }}
      data={listOfNotes}
      renderItem={({ item }) => <Note title={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}
