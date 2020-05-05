class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.customMessage = message;
    this.name = this.constructor.name;
    this.code = code;
  }
}

export default CustomError;
