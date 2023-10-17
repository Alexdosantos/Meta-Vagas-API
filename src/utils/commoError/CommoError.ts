class CommoError {
  static ErroBuild(message: string, status: number) {
    return { erro: true, message, status };
  }
}
export { CommoError };
