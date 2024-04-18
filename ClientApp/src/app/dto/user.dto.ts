export interface UpdateUserDto {
    id: string;
    firstname?: string | null;
    lastname?: string | null;
    username?: string | null;
    bio?: string | null;
    file?: any | null;
  }