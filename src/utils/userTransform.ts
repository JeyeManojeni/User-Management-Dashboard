import { User, UserFormData } from '../types/user';

export function transformUserToFormData(user: User): UserFormData {
  const nameParts = user.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  return {
    firstName,
    lastName,
    email: user.email,
    department: user.company.name,
  };
}

export function transformFormDataToUser(formData: UserFormData, id?: number): Partial<User> {
  return {
    ...(id && { id }),
    name: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email,
    company: {
      name: formData.department,
      catchPhrase: '',
      bs: '',
    },
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: { lat: '', lng: '' },
    },
  };
}

export function getUserDisplayData(user: User): UserFormData & { id: number } {
  const formData = transformUserToFormData(user);
  return {
    id: user.id,
    ...formData,
  };
}