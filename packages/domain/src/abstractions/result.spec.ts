import { Result } from './result';

describe('Result', () => {
  it('exposes a successful value without an error', () => {
    const value = { id: 'user-1' };

    const result = Result.success(value);

    expect(result.isSuccess()).toBe(true);
    expect(result.isFailure()).toBe(false);
    expect(result.getValue()).toBe(value);
    expect(result.getError()).toBeUndefined();
    expect(result.getErrorMessage()).toBeUndefined();
  });

  it('preserves an error and does not expose a value', () => {
    const error = new Error('User not found');

    const result = Result.error<string>(error);

    expect(result.isSuccess()).toBe(false);
    expect(result.isFailure()).toBe(true);
    expect(result.getValue()).toBeUndefined();
    expect(result.getError()).toBe(error);
    expect(result.getErrorMessage()).toBe('User not found');
  });

  it('creates an error result from a message', () => {
    const result = Result.errorMessage<number>('Invalid amount');

    expect(result.isFailure()).toBe(true);
    expect(result.getError()).toEqual(new Error('Invalid amount'));
    expect(result.getErrorMessage()).toBe('Invalid amount');
  });
});
