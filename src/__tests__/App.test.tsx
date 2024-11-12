import { render } from '@testing-library/react';
import App from '../App';
import { UserContext } from '../context/userDetailsContext';
import * as useGetQueryHookModule from '../customHooks/useGetQueryHook';
import '@testing-library/jest-dom';
import {
  QueryObserverPendingResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// Mock the BoilerplateInfo component
jest.mock('../pages/bolierPlateInfo/BoilerPlateInfo', () => {
  const BoilerPlateInfoMock = () => <div>BoilerplateInfo</div>;
  BoilerPlateInfoMock.displayName = 'BoilerPlateInfo';
  return BoilerPlateInfoMock;
});

// Mock the useGetQuery hook
const mockUseGetQuery = jest.spyOn(useGetQueryHookModule, 'useGetQuery');

// Mock the updateUser function
const mockUpdateUser = jest.fn();

// mock the user
const mockUser = {
  token: 'mock-token',
  userId: 1,
  username: 'testuser',
};

const renderWithContext = (
  mockQueryResult: UseQueryResult<AxiosResponse<unknown, unknown>, unknown>
) => {
  mockUseGetQuery.mockReturnValue(mockQueryResult);

  return render(
    <UserContext.Provider
      value={{ updateUser: mockUpdateUser, user: mockUser }}
    >
      <App />
    </UserContext.Provider>
  );
};

const defaultMockQueryResult: QueryObserverPendingResult<
  AxiosResponse<unknown, unknown>,
  unknown
> = {
  refetch: jest
    .fn()
    .mockResolvedValue({ isSuccess: true, data: { data: mockUser } }),
  data: undefined,
  error: null,
  isError: false,
  isLoading: false,
  isPending: true,
  isSuccess: false,
  status: 'pending',
  fetchStatus: 'idle',
  isFetching: false,
  isLoadingError: false,
  isRefetchError: false,
  dataUpdatedAt: 0,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: undefined,
  errorUpdateCount: 0,
  isFetched: false,
  isFetchedAfterMount: false,
  isInitialLoading: false,
  isPaused: false,
  isPlaceholderData: false,
  isRefetching: false,
  isStale: false,
};

describe('App', () => {
  beforeEach(() => {
    mockUseGetQuery.mockReturnValue(defaultMockQueryResult);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders BoilerplateInfo component', () => {
    const { getByText } = renderWithContext(defaultMockQueryResult);
    expect(getByText('BoilerplateInfo')).toBeInTheDocument();
  });
});
