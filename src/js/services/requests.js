export const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });
  return await response.text();
};

export const getData = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Cloud not fetch ${url}, status: ${response.status}`);
  }
  return await response.json();
};
