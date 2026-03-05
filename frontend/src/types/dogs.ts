export type UUID = string;

export type Breed = {
  id: UUID;
  name: string;
};

export type Description = {
  id: UUID;
  title: string;
};

export type DogStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type Dog = {
  id: UUID;
  status: DogStatus;
  breed: Breed;
  description: Description;
  rating: number;
  note: string;
  created_at: string;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
