import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { SWAPICharacter } from '@/types/swapi';

type CharacterTableProps = {
  data: SWAPICharacter[];
  onSort: (key: keyof SWAPICharacter) => void;
  sortConfig?: {
    key: keyof SWAPICharacter;
    asc: boolean;
  } | null;
};

export default function CharacterTable({
  data,
  onSort,
  sortConfig,
}: CharacterTableProps) {
  const renderHeader = (title: string, key: keyof SWAPICharacter) => (
    <Pressable
      style={styles.headerCell}
      onPress={() => onSort(key)}
      testID={`sort-header-${key}`}
    >
      <Text style={styles.headerText}>
        {title}
        {sortConfig?.key === key && (
          <Text style={styles.sortArrow}>
            {sortConfig.asc ? ' ↑' : ' ↓'}
          </Text>
        )}
      </Text>
    </Pressable>
  );

  const renderItem = ({ item }: { item: SWAPICharacter }) => (
    <View style={styles.row} testID="character-row">
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.eye_color}</Text>
      <Text style={styles.cell}>
        {new Date(item.created).toLocaleDateString('en-US')}
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No results</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {renderHeader('Name', 'name')}
        {renderHeader('Eye Color', 'eye_color')}
        {renderHeader('Creation Date', 'created')}
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  headerCell: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  headerText: {
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
  },
  sortArrow: {
    color: '#1e88e5',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#424242',
    paddingHorizontal: 8,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#757575',
    fontSize: 16,
  },
});
