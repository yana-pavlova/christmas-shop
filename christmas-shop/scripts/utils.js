export async function loadGiftsData() {
  const res = await fetch('../data/gifts-data.json');
  const data = await res.json();
  
  return data;
};