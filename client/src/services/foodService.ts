import api from "@/lib/api";

export const getFoods = async (params: {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  order?: string;
}) => {
  const res = await api.get("/foods", { params });
  return res.data;
};
