import { StyleProp, TextStyle } from 'react-native';

import { SFC } from 'react';

export enum SocialAuthProvider {
  Google = 'google',
  Facebook = 'facebook',
}

export enum AuthType {
  email,
  facebook,
  google,
  apple,
}

export enum PermissionType {
  read,
  write
}

export type User = {
  id: string;
  email?: string;
  name?: string;
  nickname?: string;
  thumbURL?: string;
  photoURL?: string;
  birthday?: Date;
  gender?: 'male' | 'female';
  phone?: string;
  statusMessage?: string;
  verified?: boolean;
  lastSignedIn?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  profile?: Profile;
  permissions: Permission[];
  workspaces: Workspace[];
  notifications: Notification[];
}

type Profile = {
  socialId?: string;
  authType?: AuthType;
}

type Permission = {
  id: string;
  isAdmin: boolean;
  basicInfo: PermissionType;
  product: PermissionType;
  order: PermissionType;
  delivery: PermissionType;
  customer: PermissionType;
  inventory: PermissionType;
  sales: PermissionType;
  user: User;
  workspace: Workspace;
}

type Workspace = {
  id: string;
  organization: string;
  representativeName: string;
  registrationNumber: string;
  registrationPhotoURL: string;
  zipCode: string;
  address: string;
  fax?: string;
  permissions: Permission[];
  users: User[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

type Notification = {
  id: string;
  token: string;
  device?: string
  os?: string;
  user: User;
  createdAt?: Date;
}

export type MediaQuery = {
  isDesktop: boolean,
  isTablet: boolean,
  isMobile: boolean,
}

interface IconProps {
  style?: StyleProp<TextStyle>;
  width?: number | string;
  height?: number | string;
  children?: never;
}

export type IconType = SFC<IconProps>;
