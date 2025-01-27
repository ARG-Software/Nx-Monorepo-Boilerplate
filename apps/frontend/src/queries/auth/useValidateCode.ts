import { useMutation } from '@tanstack/react-query';
import { ConfirmCodeRequestDto } from '@nx-template/dtos';

export const QUERY_KEY_VALIDATE_CODE_USER = 'validateCodeUser';

const userValidateCode = async ({
  validationCodeParameters,
}: {
  validationCodeParameters: ConfirmCodeRequestDto;
}): Promise<boolean> => {
  const url = `/api/auth/validatecode`;
  let payload;
  try {
    payload = JSON.stringify(validationCodeParameters);
  } catch (error) {
    throw new Error('Error validating code, please try again');
  }

  let userValidationResponse: Response;

  try {
    userValidationResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });
  } catch (error) {
    throw new Error('Error validating code, please try again');
  }

  let data: any;

  try {
    data = await userValidationResponse.json();
  } catch (error) {
    throw new Error('Error validating code, please try again');
  }

  if (!userValidationResponse.ok) {
    throw new Error(data.message);
  }

  return true;
};

export const useValidateCode = () => {
  return useMutation({
    mutationKey: [QUERY_KEY_VALIDATE_CODE_USER],
    mutationFn: userValidateCode,
  });
};
