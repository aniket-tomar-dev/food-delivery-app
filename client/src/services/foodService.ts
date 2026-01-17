import api from "@/lib/api";

export const getFoods = async (params: {
  page: number;
  limit: number;
  search?: string;
  order?: string;
}) => {
  const res = await api.get("/foods", { params });
  return res.data;
};

export const addFood = async (data: FormData) => {
  const res = await api.post("/foods", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateFood = async (id: string, data: any) => {
  const res = await api.put(`/foods/${id}`, data);
  return res.data;
};

export const deleteFood = async (id: string) => {
  const res = await api.delete(`/foods/${id}`);
  return res.data;
};

export const getAdminStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};
