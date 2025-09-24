export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

export interface UserFilters {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface SortConfig {
  key: keyof UserFormData | 'id' | null;
  direction: 'asc' | 'desc';
}