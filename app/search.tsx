import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import CharacterTable from '@/components/CharacterTable';
import PaginationControls from '@/components/PaginationControls';
import { SWAPICharacter, SWAPIResponse } from '@/types/swapi';

const PAGE_SIZES = [25, 50, 100, 150];

export default function SearchScreen() {
  const { query } = useLocalSearchParams<{ query: string }>();
  const [data, setData] = useState<SWAPICharacter[]>([]);
  const [processedData, setProcessedData] = useState<SWAPICharacter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof SWAPICharacter; asc: boolean } | null>(null);

  useEffect(() => {
    const fetchAllPages = async () => {
      if (!query?.trim()) return;

      try {
        setLoading(true);
        let allResults: SWAPICharacter[] = [];
        let nextUrl: string | null = `https://swapi.dev/api/people/?search=${encodeURIComponent(query)}`;

        while (nextUrl) {
          const response = await fetch(nextUrl);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

          const result: SWAPIResponse = await response.json();
          allResults = [...allResults, ...result.results];
          nextUrl = result.next;
        }

        const blueEyes = allResults
          .filter(c => c.eye_color.toLowerCase() === 'blue')
          .sort((a, b) => a.name.localeCompare(b.name));

        const others = allResults
          .filter(c => c.eye_color.toLowerCase() !== 'blue')
          .sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());

        setData([...blueEyes, ...others]);
        setProcessedData([...blueEyes, ...others]);

      } catch (error) {
        if (error instanceof Error) {
          console.error('Error:', error.message);
        } else {
          console.error('Error:', 'Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllPages();
  }, [query]);

  useEffect(() => {
    if (!sortConfig) return;

    const sorted = [...data].sort((a, b) => {
      if (sortConfig.key === 'created') {
        return sortConfig.asc 
          ? new Date(a.created).getTime() - new Date(b.created).getTime()
          : new Date(b.created).getTime() - new Date(a.created).getTime();
      }
      return sortConfig.asc
        ? (a[sortConfig.key] as string).localeCompare(b[sortConfig.key] as string)
        : (b[sortConfig.key] as string).localeCompare(a[sortConfig.key] as string);
    });

    setProcessedData(sorted);
  }, [sortConfig, data]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = processedData.slice(startIndex, startIndex + pageSize);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <CharacterTable 
            data={paginatedData} 
            onSort={(key: keyof SWAPICharacter) => setSortConfig({ key, asc: sortConfig?.key === key ? !sortConfig.asc : true })}
            sortConfig={sortConfig}
          />
          <PaginationControls
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={processedData.length}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizes={PAGE_SIZES}
          />
        </>
      )}
    </View>
  );
}


