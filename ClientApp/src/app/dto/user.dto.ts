export interface UpdateUserDto {
    firstname?: string | null;
    lastname?: string | null;
    username?: string | null;
    bio?: string | null;
    file?: any | null;
  }

export interface UserDto {
  id: string
  firstName: string
  lastName: string
  userName: string
  bio: string | null
  avatar: object
  avatarFilename: string | null
}

export interface AvatarDto {
  userId: string
  filename: string
  bucket: string
}

export interface InterestDto {
  name: string;
}