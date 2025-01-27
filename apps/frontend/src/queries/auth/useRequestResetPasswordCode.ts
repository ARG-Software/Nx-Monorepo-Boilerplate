import { useMutation } from '@tanstack/react-query';

export const QUERY_KEY_REQUEST_NEW_RESET_PASSWORD_CODE = 'requestNewResetPasswordCode';

const generateNewResetPasswordCode = async ({ email }: { email: string }): Promise<boolean> => {
  const url = `/api/auth/generateResetPasswordCode/${encodeURIComponent(email)}`;

  let generateResetPasswordCodeResponse: Response;

  try {
    generateResetPasswordCodeResponse = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Error generating reset password code, please try again');
  }

  let data: any;

  try {
    data = await generateResetPasswordCodeResponse.json();
  } catch (error) {
    throw new Error('Error generating reset password code, please try again');
  }

  if (!generateResetPasswordCodeResponse.ok) {
    throw new Error(data.message);
  }

  return true;
};

export const useGenerateResetPasswordCode = () => {
  return useMutation({
    mutationKey: [QUERY_KEY_REQUEST_NEW_RESET_PASSWORD_CODE],
    mutationFn: generateNewResetPasswordCode,
  });
};
