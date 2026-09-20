import { ActionLog } from './modules/action-log/entities/actionlog';
import { User } from './modules/main/entities/user';

describe('domain entities', () => {
  const now = new Date('2026-09-18T10:30:00.000Z');

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(now);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes a user with its registration data and safe defaults', () => {
    const user = new User(
      'person@example.com',
      'Person',
      'hashed-password',
      '123456',
      false
    );

    expect(user).toMatchObject({
      email: 'person@example.com',
      name: 'Person',
      password: 'hashed-password',
      active: false,
      verificationCode: '123456',
      isVerified: false,
      resetPasswordCode: null,
      resetPasswordExpiration: null,
      createdAt: now.toISOString(),
      modifiedAt: now.toISOString(),
    });
  });

  it('initializes an action log with its actor, action, and timestamps', () => {
    const actionLog = new ActionLog('user-1', 'user.login');

    expect(actionLog).toMatchObject({
      userId: 'user-1',
      action: 'user.login',
      createdAt: now.toISOString(),
      modifiedAt: now.toISOString(),
    });
  });
});
