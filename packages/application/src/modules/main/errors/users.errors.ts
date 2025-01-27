export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists');
  }
}

export class UserFailedToCreateError extends Error {
  constructor() {
    super('User failed to create');
  }
}

export class UserFailedToQueryError extends Error {
  constructor() {
    super('User failed to query');
  }
}

export class UserUnableToGeneratePublicKeyError extends Error {
  constructor() {
    super('User unable to generate public key');
  }
}
