import axios from "axios";

export const createChat = async (body: any) => {
  const { data } = await axios.post('/api/create-chat', body);
  return data;
}

export const fetchMessage = async (messageId: number) => {
  const { data } = await axios.get(`/api/message/${messageId}`);
  return data;
}