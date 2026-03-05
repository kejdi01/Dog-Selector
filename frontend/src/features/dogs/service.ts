import { axiosClient } from "../../api/axiosClient";
import type { PaginatedResponse } from "../../types/common";
import type { Dog, DogStatus, UUID } from "../../types/dogs";
import { normalizeListParams } from "../../utils/utils";

const DOGS_BASE = "/dogs/";

export type DogsListParams = {
  page?: number;
  search?: string;
  ordering?: string;
  page_size?: number;
};

export type UpdateDogPayload = Partial<{
  status: DogStatus;
  breed_id: UUID;
  description_id: UUID;
  rating: number;
  note: string;
}>;

export const fetchDogs = async (
  params: DogsListParams,
  options?: { signal?: AbortSignal },
): Promise<PaginatedResponse<Dog>> => {
  const res = await axiosClient.get<PaginatedResponse<Dog>>(DOGS_BASE, {
    params: normalizeListParams(params),
    signal: options?.signal,
  });
  return res.data;
};

export const updateDog = async (
  dogId: UUID,
  payload: UpdateDogPayload,
): Promise<Dog> => {
  const res = await axiosClient.patch<Dog>(`${DOGS_BASE}${dogId}/`, payload);
  return res.data;
};

export const deleteDog = async (dogId: UUID): Promise<void> => {
  await axiosClient.delete(`${DOGS_BASE}${dogId}/`);
};

export const bulkDeleteDogs = async (ids: UUID[]): Promise<void> => {
  if (ids.length === 0) return;
  await axiosClient.post(`${DOGS_BASE}bulk-delete/`, { ids });
};
