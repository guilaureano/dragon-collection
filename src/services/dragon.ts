import { api } from './api';
interface IRegister {
  histories: string;
  name: string;
  type: string;
  createdAt: string;
}

interface IEdit {
  histories: string;
  name: string;
  type: string;
}

export const dragonService = {
  edit: async (id: string, values: IEdit) =>
    await api.put(`dragon/${id}`, values),
  delete: async (id: string) => await api.delete(`dragon/${id}`),
  getById: async (id: string) => await api.get(`dragon/${id}`),
  list: async () => await api.get('dragon'),
  register: async (values: IRegister) => await api.post('dragon', values),
};
