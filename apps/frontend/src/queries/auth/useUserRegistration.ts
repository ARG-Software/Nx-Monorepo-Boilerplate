import { useMutation } from '@tanstack/react-query';
import { RegisterRequestDto, RegisteredUserResponseDto } from '@nx-template/dtos';

export const QUERY_KEY_REGISTER_USER = 'registerUser';

const userRegistration = async ({
  registrationParameters,
}: {
  registrationParameters: RegisterRequestDto;
}): Promise<RegisteredUserResponseDto> => {
  const url = `/api/auth/register`;

  let payload;

  try {
    payload = JSON.stringify(registrationParameters);
  } catch {
    throw new Error('Error registering, please try again');
  }

  const userRegistrationResponse = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: payload,
  }).catch(() => {
    throw new Error('Error registering, please try again');
  });

  let data: any;

  try {
    data = await userRegistrationResponse.json();
  } catch {
    throw new Error('Error registering, please try again');
  }

  if (!userRegistrationResponse.ok) {
    throw new Error(data.message);
  }

  try {
    const result: RegisteredUserResponseDto = data;
    return result;
  } catch {
    throw new Error('Error registering, please try again');
  }
};

export const useUserRegistration = () => {
  return useMutation({
    mutationKey: [QUERY_KEY_REGISTER_USER],
    mutationFn: userRegistration,
  });
};
