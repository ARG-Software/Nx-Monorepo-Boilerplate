import { useMutation } from '@tanstack/react-query';

export const QUERY_KEY_REQUEST_NEW_CODE = 'requestNewCode';

const generateNewCode = async ({ email }: { email: string }): Promise<boolean> => {
  const url = `/api/auth/generateConfirmationCode/${encodeURIComponent(email)}`;

  let generateCodeResponse: Response;

  try {
    generateCodeResponse = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Error generating new code, please try again');
  }

  let data: any;

  try {
    data = await generateCodeResponse.text();
  } catch (error) {
    throw new Error('Error generating new code, please try again');
  }

  if (!generateCodeResponse.ok) {
    throw new Error(data.message);
  }

  return true;
};

export const useRequestNewCode = () => {
  return useMutation({
    mutationKey: [QUERY_KEY_REQUEST_NEW_CODE],
    mutationFn: generateNewCode,
  });
};
