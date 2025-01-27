import { useQuery } from '@tanstack/react-query';

export const QUERY_KEY_GET_USERS_LIST_LIST = 'user';

export type usersListDTO = {
  name: string;
  email: string;
  createdAt: string;
};

const getUsersList = async (): Promise<usersListDTO[]> => {
  const apiResponse = await fetch('/api/user', {
    method: 'GET',
  });

  const response = await apiResponse.json();

  return response.value;
};

export const useGetUsersList = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY_GET_USERS_LIST_LIST],
    queryFn: getUsersList,
  });
  return query;
};
