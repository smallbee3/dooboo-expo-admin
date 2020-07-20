export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Auth: any;
  /**
   * A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Date: any;
  DateTime: any;
  Gender: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export enum AuthType {
  Email = 'email',
  Facebook = 'facebook',
  Google = 'google',
  Apple = 'apple'
}

export enum ChangeType {
  Add = 'add',
  Remove = 'remove'
}

export type ChangeUserInWorkspaceInput = {
  id?: Maybe<Scalars['String']>;
  changeType?: Maybe<ChangeType>;
};




export type Mutation = {
  __typename?: 'Mutation';
  createNotification: Notification;
  deleteNotification?: Maybe<Notification>;
  createPermission: Permission;
  updatePermission: Permission;
  deletePermission?: Maybe<Permission>;
  singleUpload?: Maybe<Scalars['String']>;
  signUp: User;
  signInEmail: AuthPayload;
  sendVerification: Scalars['Boolean'];
  updateProfile: User;
  findPassword: Scalars['Boolean'];
  changeEmailPassword: Scalars['Boolean'];
  signInWithFacebook: AuthPayload;
  signInWithGoogle: AuthPayload;
  deleteUser: User;
  createWorkspace: Workspace;
  updateWorkspace: Workspace;
  deleteWorkspace?: Maybe<Workspace>;
  changeUserOfWorkspace?: Maybe<Workspace>;
};


export type MutationCreateNotificationArgs = {
  token: Scalars['String'];
  device?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['Int'];
};


export type MutationCreatePermissionArgs = {
  permission?: Maybe<PermissionCreateInput>;
};


export type MutationUpdatePermissionArgs = {
  permission?: Maybe<PermissionUpdateInput>;
};


export type MutationDeletePermissionArgs = {
  id: Scalars['Int'];
};


export type MutationSingleUploadArgs = {
  file?: Maybe<Scalars['Upload']>;
  dir?: Maybe<Scalars['String']>;
};


export type MutationSignUpArgs = {
  user?: Maybe<UserCreateInput>;
};


export type MutationSignInEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSendVerificationArgs = {
  email: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  user?: Maybe<UserUpdateInput>;
};


export type MutationFindPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangeEmailPasswordArgs = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationSignInWithFacebookArgs = {
  accessToken: Scalars['String'];
};


export type MutationSignInWithGoogleArgs = {
  accessToken: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationCreateWorkspaceArgs = {
  workspace?: Maybe<WorkspaceCreateInput>;
};


export type MutationUpdateWorkspaceArgs = {
  workspace?: Maybe<WorkspaceUpdateInput>;
};


export type MutationDeleteWorkspaceArgs = {
  id: Scalars['String'];
};


export type MutationChangeUserOfWorkspaceArgs = {
  id: Scalars['String'];
  users?: Maybe<Array<ChangeUserInWorkspaceInput>>;
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['Int'];
  token: Scalars['String'];
  device?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  user: User;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type Permission = {
  __typename?: 'Permission';
  id: Scalars['Int'];
  isAdmin?: Maybe<Scalars['Boolean']>;
  basicInfo?: Maybe<PermissionType>;
  product?: Maybe<PermissionType>;
  order?: Maybe<PermissionType>;
  delivery?: Maybe<PermissionType>;
  customer?: Maybe<PermissionType>;
  inventory?: Maybe<PermissionType>;
  sales?: Maybe<PermissionType>;
  user: User;
  workspace: Workspace;
};

export type PermissionCreateInput = {
  isAdmin?: Maybe<Scalars['Boolean']>;
  basicInfo?: Maybe<PermissionType>;
  product?: Maybe<PermissionType>;
  order?: Maybe<PermissionType>;
  delivery?: Maybe<PermissionType>;
  customer?: Maybe<PermissionType>;
  inventory?: Maybe<PermissionType>;
  sales?: Maybe<PermissionType>;
  userId?: Maybe<Scalars['String']>;
  workspaceId?: Maybe<Scalars['String']>;
};

export enum PermissionType {
  None = 'none',
  Read = 'read',
  Write = 'write',
  Admin = 'admin'
}

export type PermissionUpdateInput = {
  id?: Maybe<Scalars['Int']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  basicInfo?: Maybe<PermissionType>;
  product?: Maybe<PermissionType>;
  order?: Maybe<PermissionType>;
  delivery?: Maybe<PermissionType>;
  customer?: Maybe<PermissionType>;
  inventory?: Maybe<PermissionType>;
  sales?: Maybe<PermissionType>;
  userId?: Maybe<Scalars['String']>;
  workspaceId?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  socialId?: Maybe<Scalars['String']>;
  authType?: Maybe<AuthType>;
};

export type Query = {
  __typename?: 'Query';
  notifications?: Maybe<Array<Notification>>;
  permission?: Maybe<Permission>;
  permissions?: Maybe<Array<Permission>>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  workspace?: Maybe<Workspace>;
  workspaces?: Maybe<Array<Workspace>>;
};


export type QueryNotificationsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryPermissionArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryWorkspaceArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  userSignedIn: User;
  userUpdated: User;
};


export type SubscriptionUserSignedInArgs = {
  userId: Scalars['String'];
};


export type SubscriptionUserUpdatedArgs = {
  userId: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  thumbURL?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Scalars['Gender']>;
  phone?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  lastSignedIn?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  profile?: Maybe<Profile>;
  permissions?: Maybe<Array<Permission>>;
  workspaces?: Maybe<Array<Workspace>>;
  notifications?: Maybe<Array<Notification>>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Scalars['Gender']>;
  phone?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type UserUpdateInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  phone?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Gender']>;
};

export type Workspace = {
  __typename?: 'Workspace';
  id: Scalars['String'];
  organization: Scalars['String'];
  representativeName: Scalars['String'];
  registrationNumber: Scalars['String'];
  registrationPhotoURL: Scalars['String'];
  zipCode: Scalars['String'];
  address: Scalars['String'];
  fax?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<Array<User>>;
  permissions?: Maybe<Array<Permission>>;
};

export type WorkspaceCreateInput = {
  organization: Scalars['String'];
  representativeName: Scalars['String'];
  registrationNumber: Scalars['String'];
  registrationPhotoURL: Scalars['String'];
  zipCode: Scalars['String'];
  address: Scalars['String'];
  fax?: Maybe<Scalars['String']>;
};

export type WorkspaceUpdateInput = {
  id?: Maybe<Scalars['String']>;
  organization?: Maybe<Scalars['String']>;
  representativeName?: Maybe<Scalars['String']>;
  registrationNumber?: Maybe<Scalars['String']>;
  registrationPhotoURL?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
};
