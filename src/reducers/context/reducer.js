function reducer() {
  const domain = process.env.NODE_ENV === 'production'
    ? 'https://statics.test.com'
    : 'http://localhost:8081';

  return domain;
}

export default reducer;
