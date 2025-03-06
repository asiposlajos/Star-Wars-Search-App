import { View, Text, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Props = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pageSizes: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function PaginationControls({
  currentPage,
  pageSize,
  totalItems,
  pageSizes,
  onPageChange,
  onPageSizeChange
}: Props) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      <Picker
        selectedValue={pageSize}
        onValueChange={(value) => {
          onPageSizeChange(value);
          onPageChange(1);
        }}
        style={{ width: 100, marginRight: 10 }}
      >
        {pageSizes.map(size => (
          <Picker.Item key={size} label={`${size} / page`} value={size} />
        ))}
      </Picker>

      <Pressable
        onPress={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <Text style={{ padding: 10 }}>←</Text>
      </Pressable>

      <Text style={{ padding: 10 }}>
        Page {currentPage} of {totalPages}
      </Text>

      <Pressable
        onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <Text style={{ padding: 10 }}>→</Text>
      </Pressable>
    </View>
  );
}