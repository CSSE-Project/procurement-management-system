export async function getData() {
  const response = await fetch("http://localhost:8070/order/");
  return response;
}
