import { LoginRequestDto, AuthenticatedUserResponseDto } from '@nx-template/dtos';
import { useMutation } from '@tanstack/react-query';

export const QUERY_KEY_LOGIN_USER = 'getUserLogin';

const userLogin = async ({
  authenticationParameters,
}: {
  authenticationParameters: LoginRequestDto;
}): Promise<AuthenticatedUserResponseDto> => {
  const url = `/api/auth/login`;

  let payload;

  try {
    payload = JSON.stringify(authenticationParameters);
  } catch (error) {
    throw new Error('Error logging in, please try again');
  }

  let userLoginResponse: Response;

  try {
    userLoginResponse = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',

      body: payload,
    });
  } catch (error) {
    throw new Error('Error logging in, please try again');
  }

  let data: any;

  try {
    data = await userLoginResponse.json();
  } catch (error) {
    throw new Error('Error logging in, please try again');
  }

  if (!userLoginResponse.ok) {
    throw new Error(data.message);
  }

  try {
    const result: AuthenticatedUserResponseDto = data;
    return result;
  } catch (error) {
    throw new Error('Error logging in, please try again');
  }
};

export const useUserLogin = () => {
  return useMutation({
    mutationKey: [QUERY_KEY_LOGIN_USER],
    mutationFn: userLogin,
  });
};
