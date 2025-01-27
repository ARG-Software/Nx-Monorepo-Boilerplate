import { useMutation } from '@tanstack/react-query';
import { ResetPasswordRequestDto } from '@nx-template/dtos';

export const QUERY_KEY_RESET_USER_PASS = 'resetUserPass';

const resetUserPassword = async ({
  resetPasswordParameters,
}: {
  resetPasswordParameters: ResetPasswordRequestDto;
}): Promise<boolean> => {
  const url = `/api/auth/resetPassword`;

  let payload;

  try {
    payload = JSON.stringify(resetPasswordParameters);
  } catch (error) {
    throw new Error('Error changing password, please try again');
  }

  const changeUserPasswordResponse = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: payload,
  }).catch(_ => {
    throw new Error('Error changing password, please try again');
  });

  let data: any;

  try {
    data = await changeUserPasswordResponse.json();
  } catch (error) {
    throw new Error('Error changing password, please try again');
  }

  if (!changeUserPasswordResponse.ok) {
    throw new Error(data.message);
  }

  try {
    const result = data;
    return result;
  } catch (error) {
    throw new Error('Error changing password, please try again');
  }
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: [QUERY_KEY_RESET_USER_PASS],
    mutationFn: resetUserPassword,
  });
};
