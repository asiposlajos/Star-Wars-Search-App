// __tests__/SearchScreen.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SearchScreen from '@/app/search';
import { SWAPICharacter } from '@/types/swapi';

jest.mock('node-fetch', () => ({
  Response: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
}));

const mockCharacters: SWAPICharacter[] = [
  {
    name: 'Luke Skywalker',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: 'blue',
    birth_year: '',
    gender: '',
    homeworld: '',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '',
    url: '1',
  },
  {
    name: 'Darth Vader',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: 'yellow',
    birth_year: '',
    gender: '',
    homeworld: '',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-10T14:50:51.644000Z',
    edited: '',
    url: '2',
  },
  {
    name: 'Leia Organa',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: 'blue',
    birth_year: '',
    gender: '',
    homeworld: '',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-08T12:50:51.644000Z',
    edited: '',
    url: '3',
  },
];

global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit | undefined) => {
  if (input.toString().includes('page=2')) {
    return Promise.resolve(
      new Response(
        JSON.stringify({
          results: [mockCharacters[2]],
          next: null,
          count: 3,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    );
  }

  return Promise.resolve(
    new Response(
      JSON.stringify({
        results: mockCharacters.slice(0, 2),
        next: 'https://swapi.dev/api/people/?page=2',
        count: 3,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  );
}) as jest.Mock;

describe('SearchScreen', () => {
  beforeEach(() => {
    (require('expo-router').useLocalSearchParams as jest.Mock).mockReturnValue({
      query: 'skywalker',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Retrieves and displays characters correctly', async () => {
    render(<SearchScreen />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeTruthy();
      expect(screen.getByText('Darth Vader')).toBeTruthy();
      expect(screen.getByText('Leia Organa')).toBeTruthy();
    });
  });

  it('Blue-eyed characters are placed first and sorted', async () => {
    render(<SearchScreen />);

    await waitFor(() => {
      const names = screen.getAllByText(/Luke|Leia|Darth/);
      expect(names[0].props.children).toBe('Leia Organa');
      expect(names[1].props.children).toBe('Luke Skywalker');
      expect(names[2].props.children).toBe('Darth Vader');
    });
  });

  it('Sorting by name works', async () => {
    render(<SearchScreen />);

    await waitFor(async () => {
      fireEvent.press(screen.getByText('Name'));

      const names = screen.getAllByText(/Luke|Leia|Darth/);
      expect(names[0].props.children).toBe('Darth Vader');
      expect(names[1].props.children).toBe('Leia Organa');
      expect(names[2].props.children).toBe('Luke Skywalker');
    });
  });

  it('Error handling works', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ detail: 'Server Error' }),
      } as Response)
    );

    render(<SearchScreen />);

    await waitFor(() => {
      expect(screen.getByText('No results')).toBeTruthy();
    });
  });
});

