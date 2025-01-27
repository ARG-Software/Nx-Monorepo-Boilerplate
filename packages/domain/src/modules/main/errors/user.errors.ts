export class UnableToGetAllUsersError extends Error {
  constructor() {
    super('Unable to get all users');
  }
}

export class UnableToFindUserByIdError extends Error {
  constructor() {
    super('Unable to find user by id');
  }
}

export class UnableToFindUserByEmailError extends Error {
  constructor() {
    super('Unable to find user by email');
  }
}

export class UnableToFindUserByEmailAndPasswordError extends Error {
  constructor() {
    super('Unable to find user by email and password');
  }
}

export class UnableToFindUserByMintAddressError extends Error {
  constructor() {
    super('Unable to find user by mint address');
  }
}

export class UnableToAddUserError extends Error {
  constructor() {
    super('Unable to add user');
  }
}

export class UnableToUpdateUserError extends Error {
  constructor() {
    super('Unable to update user');
  }
}

export class UnableToDeleteUserError extends Error {
  constructor() {
    super('Unable to delete user');
  }
}
