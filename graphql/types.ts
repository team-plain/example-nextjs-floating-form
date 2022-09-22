/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AcceptWorkspaceInviteInput = {
  inviteId: Scalars['ID'];
};

export type AcceptWorkspaceInviteOutput = {
  __typename?: 'AcceptWorkspaceInviteOutput';
  error?: Maybe<MutationError>;
  invite?: Maybe<WorkspaceInvite>;
};

export type Actor = CustomerActor | MachineUserActor | SystemActor | UserActor;

export type ApiKey = {
  __typename?: 'ApiKey';
  createdAt: DateTime;
  createdBy: InternalActor;
  deletedAt?: Maybe<DateTime>;
  deletedBy?: Maybe<Actor>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  permissions: Array<Scalars['String']>;
  updatedAt: DateTime;
  updatedBy: InternalActor;
};

export type ApiKeyConnection = {
  __typename?: 'ApiKeyConnection';
  edges: Array<ApiKeyEdge>;
  pageInfo: PageInfo;
};

export type ApiKeyEdge = {
  __typename?: 'ApiKeyEdge';
  cursor: Scalars['String'];
  node: ApiKey;
};

export type ArchiveIssueTypeInput = {
  issueTypeId: Scalars['ID'];
};

export type ArchiveIssueTypeOutput = {
  __typename?: 'ArchiveIssueTypeOutput';
  error?: Maybe<MutationError>;
  issueType?: Maybe<IssueType>;
};

export type AssignCustomerToUserInput = {
  customerId: Scalars['ID'];
  userId?: InputMaybe<Scalars['ID']>;
};

export type AssignCustomerToUserOutput = {
  __typename?: 'AssignCustomerToUserOutput';
  customer?: Maybe<Customer>;
  error?: Maybe<MutationError>;
};

export type AssignRolesToUserInput = {
  roleIds: Array<Scalars['ID']>;
  userId: Scalars['ID'];
};

export type AssignRolesToUserOutput = {
  __typename?: 'AssignRolesToUserOutput';
  error?: Maybe<MutationError>;
};

export type Attachment = {
  __typename?: 'Attachment';
  createdAt: DateTime;
  createdBy: Actor;
  fileExtension?: Maybe<Scalars['String']>;
  fileMimeType: Scalars['String'];
  fileName: Scalars['String'];
  fileSize: FileSize;
  id: Scalars['ID'];
  type: AttachmentType;
  updatedAt: DateTime;
  updatedBy: Actor;
};

export type AttachmentDownloadUrl = {
  __typename?: 'AttachmentDownloadUrl';
  attachment: Attachment;
  downloadUrl: Scalars['String'];
  expiresAt: DateTime;
};

export enum AttachmentType {
  Chat = 'CHAT',
  CustomTimelineEntry = 'CUSTOM_TIMELINE_ENTRY',
  Email = 'EMAIL'
}

export type AttachmentUploadUrl = {
  __typename?: 'AttachmentUploadUrl';
  attachment: Attachment;
  expiresAt: DateTime;
  uploadFormData: Array<UploadFormData>;
  uploadFormUrl: Scalars['String'];
};

/** A boolean setting */
export type BooleanSetting = {
  __typename?: 'BooleanSetting';
  /** The value of the setting. This is named uniquely (instead of just `value`) so that the union has unique fields. */
  booleanValue: Scalars['Boolean'];
  /** The setting code, for a full list of codes, please see: https://docs.plain.com/advanced/settings */
  code: Scalars['String'];
  /** The scope of the setting */
  scope: SettingScope;
};

export type ChangeCustomerStatusAsyncInput = {
  customerId: Scalars['ID'];
  status: CustomerStatus;
};

export type ChangeCustomerStatusAsyncOutput = {
  __typename?: 'ChangeCustomerStatusAsyncOutput';
  error?: Maybe<MutationError>;
};

export type ChangeIssueIssueTypeInput = {
  issueId: Scalars['ID'];
  issueTypeId: Scalars['ID'];
};

export type ChangeIssueIssueTypeOutput = {
  __typename?: 'ChangeIssueIssueTypeOutput';
  error?: Maybe<MutationError>;
  issue?: Maybe<Issue>;
};

export enum ChangeType {
  Added = 'ADDED',
  Removed = 'REMOVED',
  Updated = 'UPDATED'
}

export type ChangeUserStatusInput = {
  status: UserStatus;
  userId: Scalars['ID'];
};

export type ChangeUserStatusOutput = {
  __typename?: 'ChangeUserStatusOutput';
  error?: Maybe<MutationError>;
  user?: Maybe<User>;
};

export type Chat = {
  __typename?: 'Chat';
  attachments: Array<Attachment>;
  createdAt: DateTime;
  createdBy: Actor;
  customerReadAt?: Maybe<DateTime>;
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  updatedAt: DateTime;
  updatedBy: Actor;
};

export type ChatEntry = {
  __typename?: 'ChatEntry';
  attachments: Array<Attachment>;
  chatId: Scalars['ID'];
  customerReadAt?: Maybe<DateTime>;
  text?: Maybe<Scalars['String']>;
};

export enum CommunicationChannel {
  Chat = 'CHAT',
  Email = 'EMAIL'
}

export enum CommunicationChannelInput {
  Chat = 'CHAT',
  Email = 'EMAIL',
  None = 'NONE'
}

export type ComponentDivider = {
  __typename?: 'ComponentDivider';
  spacingSize?: Maybe<ComponentDividerSpacingSize>;
};

export type ComponentDividerInput = {
  spacingSize?: InputMaybe<ComponentSpacerSize>;
};

export enum ComponentDividerSpacingSize {
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS'
}

export type ComponentInput = {
  componentDivider?: InputMaybe<ComponentDividerInput>;
  componentLinkButton?: InputMaybe<ComponentLinkInputButton>;
  componentSpacer?: InputMaybe<ComponentSpacerInput>;
  componentText?: InputMaybe<ComponentTextInput>;
};

export type ComponentLinkButton = {
  __typename?: 'ComponentLinkButton';
  label: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentLinkInputButton = {
  label: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentSpacer = {
  __typename?: 'ComponentSpacer';
  /** @deprecated Use spacerSize instead, which has the same type */
  size: ComponentSpacerSize;
  spacerSize: ComponentSpacerSize;
};

export type ComponentSpacerInput = {
  size?: InputMaybe<ComponentSpacerSize>;
  spacerSize?: InputMaybe<ComponentSpacerSize>;
};

export enum ComponentSpacerSize {
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS'
}

export type ComponentText = {
  __typename?: 'ComponentText';
  /** @deprecated Use textColor instead, which has the same type */
  color?: Maybe<ComponentTextColor>;
  /** @deprecated Use textSize instead, which has the same type */
  size?: Maybe<ComponentTextSize>;
  text: Scalars['String'];
  textColor?: Maybe<ComponentTextColor>;
  textSize?: Maybe<ComponentTextSize>;
};

export enum ComponentTextColor {
  Error = 'ERROR',
  Muted = 'MUTED',
  Normal = 'NORMAL',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

export type ComponentTextInput = {
  color?: InputMaybe<ComponentTextColor>;
  size?: InputMaybe<ComponentTextSize>;
  text: Scalars['String'];
  textColor?: InputMaybe<ComponentTextColor>;
  textSize?: InputMaybe<ComponentTextSize>;
};

export enum ComponentTextSize {
  L = 'L',
  M = 'M',
  S = 'S'
}

export type CreateApiKeyInput = {
  description?: InputMaybe<Scalars['String']>;
  machineUserId: Scalars['ID'];
  permissions: Array<Scalars['String']>;
};

export type CreateApiKeyOutput = {
  __typename?: 'CreateApiKeyOutput';
  apiKey?: Maybe<ApiKey>;
  apiKeySecret?: Maybe<Scalars['String']>;
  error?: Maybe<MutationError>;
};

export type CreateAttachmentDownloadUrlInput = {
  attachmentId: Scalars['ID'];
};

export type CreateAttachmentDownloadUrlOutput = {
  __typename?: 'CreateAttachmentDownloadUrlOutput';
  attachmentDownloadUrl?: Maybe<AttachmentDownloadUrl>;
  error?: Maybe<MutationError>;
};

export type CreateAttachmentUploadUrlInput = {
  attachmentType: AttachmentType;
  customerId: Scalars['ID'];
  fileName: Scalars['String'];
  fileSizeBytes: Scalars['Int'];
};

export type CreateAttachmentUploadUrlOutput = {
  __typename?: 'CreateAttachmentUploadUrlOutput';
  attachmentUploadUrl?: Maybe<AttachmentUploadUrl>;
  error?: Maybe<MutationError>;
};

export type CreateIssueInput = {
  customerId: Scalars['ID'];
  issueTypeId: Scalars['ID'];
};

export type CreateIssueOutput = {
  __typename?: 'CreateIssueOutput';
  error?: Maybe<MutationError>;
  issue?: Maybe<Issue>;
};

export type CreateIssueTypeInput = {
  publicName: Scalars['String'];
};

export type CreateIssueTypeOutput = {
  __typename?: 'CreateIssueTypeOutput';
  error?: Maybe<MutationError>;
  issueType?: Maybe<IssueType>;
};

export type CreateMachineUserInput = {
  description?: InputMaybe<Scalars['String']>;
  fullName: Scalars['String'];
  publicName: Scalars['String'];
};

export type CreateMachineUserOutput = {
  __typename?: 'CreateMachineUserOutput';
  error?: Maybe<MutationError>;
  machineUser?: Maybe<MachineUser>;
};

export type CreateMySlackIntegrationInput = {
  authCode: Scalars['String'];
  redirectUrl: Scalars['String'];
};

export type CreateMySlackIntegrationOutput = {
  __typename?: 'CreateMySlackIntegrationOutput';
  error?: Maybe<MutationError>;
  integration?: Maybe<UserSlackIntegration>;
};

export type CreateNoteInput = {
  customerId: Scalars['ID'];
  text: Scalars['String'];
};

export type CreateNoteOutput = {
  __typename?: 'CreateNoteOutput';
  error?: Maybe<MutationError>;
  note?: Maybe<Note>;
};

export type CreateSnippetInput = {
  name: Scalars['String'];
  text: Scalars['String'];
};

export type CreateSnippetOutput = {
  __typename?: 'CreateSnippetOutput';
  error?: Maybe<MutationError>;
  snippet?: Maybe<Snippet>;
};

export type CreateUserAccountInput = {
  fullName: Scalars['String'];
  publicName: Scalars['String'];
};

export type CreateUserAccountOutput = {
  __typename?: 'CreateUserAccountOutput';
  error?: Maybe<MutationError>;
  userAccount?: Maybe<UserAccount>;
};

export type CreateWorkspaceAppInput = {
  name: Scalars['String'];
  publicName: Scalars['String'];
};

export type CreateWorkspaceAppOutput = {
  __typename?: 'CreateWorkspaceAppOutput';
  error?: Maybe<MutationError>;
  workspaceApp?: Maybe<WorkspaceApp>;
};

export type CreateWorkspaceAppPublicKeyInput = {
  name: Scalars['String'];
  value: Scalars['String'];
  workspaceAppId: Scalars['ID'];
};

export type CreateWorkspaceAppPublicKeyOutput = {
  __typename?: 'CreateWorkspaceAppPublicKeyOutput';
  error?: Maybe<MutationError>;
  workspaceAppPublicKey?: Maybe<WorkspaceAppPublicKey>;
};

export type CreateWorkspaceDiscordIntegrationInput = {
  name: Scalars['String'];
  webhookUrl: Scalars['String'];
};

export type CreateWorkspaceDiscordIntegrationOutput = {
  __typename?: 'CreateWorkspaceDiscordIntegrationOutput';
  error?: Maybe<MutationError>;
  integration?: Maybe<WorkspaceDiscordIntegration>;
};

export type CreateWorkspaceEmailDomainSettingsInput = {
  supportEmailAddress: Scalars['String'];
};

export type CreateWorkspaceEmailDomainSettingsOutput = {
  __typename?: 'CreateWorkspaceEmailDomainSettingsOutput';
  error?: Maybe<MutationError>;
  workspaceEmailDomainSettings?: Maybe<WorkspaceEmailDomainSettings>;
};

export type CreateWorkspaceInput = {
  name: Scalars['String'];
  publicName: Scalars['String'];
};

export type CreateWorkspaceOutput = {
  __typename?: 'CreateWorkspaceOutput';
  error?: Maybe<MutationError>;
  workspace?: Maybe<Workspace>;
};

export type CreateWorkspaceSlackIntegrationInput = {
  authCode: Scalars['String'];
  redirectUrl: Scalars['String'];
};

export type CreateWorkspaceSlackIntegrationOutput = {
  __typename?: 'CreateWorkspaceSlackIntegrationOutput';
  error?: Maybe<MutationError>;
  integration?: Maybe<WorkspaceSlackIntegration>;
};

export type CustomEntry = {
  __typename?: 'CustomEntry';
  attachments: Array<Attachment>;
  components: Array<CustomTimelineEntryComponent>;
  externalId?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type CustomTimelineEntryComponent = ComponentDivider | ComponentLinkButton | ComponentSpacer | ComponentText;

/**
 * The core customer entity. A customer only exists (ideally) once.
 * Uniqueness is guaranteed on both of these fields:
 * 1. `externalId` if provided
 * 2. `email`
 */
export type Customer = {
  __typename?: 'Customer';
  /** When the customer was assigned to a user */
  assignedAt?: Maybe<DateTime>;
  /** The user the customer is assigned to */
  assignedToUser?: Maybe<UserActor>;
  createdAt: DateTime;
  createdBy: Actor;
  /** The customer's email address */
  email: EmailAddress;
  /** Your system's ID for this customer */
  externalId?: Maybe<Scalars['ID']>;
  /** The full name of the customer */
  fullName: Scalars['String'];
  /** Uniquely identifies a customer in Plain */
  id: Scalars['ID'];
  /** A subquery to fetch the customer's issues */
  issues: IssueConnection;
  /** When the customer was last in the `IDLE` status */
  lastIdleAt?: Maybe<DateTime>;
  /** An optional short name of the customer, typically their first name */
  shortName?: Maybe<Scalars['String']>;
  /** The customer's status */
  status: CustomerStatus;
  /** When the customer's status was last changed */
  statusChangedAt: DateTime;
  /** Metadata about the customer's timeline. This is eventually consistent with the timeline. */
  timelineInfo: TimelineInfo;
  updatedAt: DateTime;
  updatedBy: Actor;
};


/**
 * The core customer entity. A customer only exists (ideally) once.
 * Uniqueness is guaranteed on both of these fields:
 * 1. `externalId` if provided
 * 2. `email`
 */
export type CustomerIssuesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<CustomerIssuesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type CustomerActor = {
  __typename?: 'CustomerActor';
  customer: Customer;
  customerId: Scalars['ID'];
};

export type CustomerAssignmentTransitionedEntry = {
  __typename?: 'CustomerAssignmentTransitionedEntry';
  nextUser?: Maybe<User>;
  nextUserId?: Maybe<Scalars['ID']>;
  previousUser?: Maybe<User>;
  previousUserId?: Maybe<Scalars['ID']>;
};

export type CustomerChange = {
  __typename?: 'CustomerChange';
  changeType: ChangeType;
  customer: Customer;
};

export type CustomerChangesFilter = {
  assignedToUser?: InputMaybe<Array<Scalars['ID']>>;
};

export type CustomerConnection = {
  __typename?: 'CustomerConnection';
  edges: Array<CustomerEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CustomerEdge = {
  __typename?: 'CustomerEdge';
  cursor: Scalars['String'];
  node: Customer;
};

export type CustomerIssuesFilter = {
  statuses?: InputMaybe<Array<IssueStatus>>;
};

/**
 * The customer attributes available for search, each of them mapped to a search expression.
 * Exactly one of them must be provided in a single search condition.
 */
export type CustomerSearchCondition = {
  /** Search expression on the customer's email address */
  email?: InputMaybe<StringSearchExpression>;
  /** Search expression on the customer's external id */
  externalId?: InputMaybe<StringSearchExpression>;
  /** Search expression on the customer's full name */
  fullName?: InputMaybe<StringSearchExpression>;
  /** Search expression on the customer's short name */
  shortName?: InputMaybe<StringSearchExpression>;
};

export type CustomerSearchConnection = {
  __typename?: 'CustomerSearchConnection';
  edges: Array<CustomerSearchEdge>;
  pageInfo: PageInfo;
};

export type CustomerSearchEdge = {
  __typename?: 'CustomerSearchEdge';
  cursor: Scalars['String'];
  node: Customer;
};

/** The core customer life cycle. */
export enum CustomerStatus {
  /** The customer is currently either waiting for help or being helped, depending on if they're assigned to a user or not. */
  Active = 'ACTIVE',
  /** The default status of a customer when they don't have any open issues. Any activity on their timeline will move them into `ACTIVE`. */
  Idle = 'IDLE',
  /** Indicates that a user is waiting for a customer to get back. Any activity on their timeline will move them into `ACTIVE`. */
  Snoozed = 'SNOOZED'
}

export type CustomerStatusTransitionedEntry = {
  __typename?: 'CustomerStatusTransitionedEntry';
  nextStatus?: Maybe<CustomerStatus>;
  previousStatus?: Maybe<CustomerStatus>;
};

export type CustomersFilter = {
  assignedToUser?: InputMaybe<Array<Scalars['ID']>>;
  isAssigned?: InputMaybe<Scalars['Boolean']>;
  lastCommunicationChannels?: InputMaybe<Array<CommunicationChannelInput>>;
  statuses?: InputMaybe<Array<CustomerStatus>>;
};

/**
 * A query to search for customers. Search queries are combinations of search conditions, as defined
 * below. At least one search condition must be provided.
 */
export type CustomersSearchQuery = {
  /** An array of search conditions that will be combined using a 'logical OR' to search for customers. */
  or?: InputMaybe<Array<CustomerSearchCondition>>;
};

export type CustomersSort = {
  direction: SortDirection;
  field: CustomersSortField;
};

export enum CustomersSortField {
  FullName = 'FULL_NAME',
  LastIdleAt = 'LAST_IDLE_AT',
  StatusChangedAt = 'STATUS_CHANGED_AT',
  TimelineInfoCustomerWaitingForReplySince = 'TIMELINE_INFO_CUSTOMER_WAITING_FOR_REPLY_SINCE'
}

export type DateTime = {
  __typename?: 'DateTime';
  iso8601: Scalars['String'];
  unixTimestamp: Scalars['String'];
};

export type DeleteApiKeyInput = {
  apiKeyId: Scalars['ID'];
};

export type DeleteApiKeyOutput = {
  __typename?: 'DeleteApiKeyOutput';
  apiKey?: Maybe<ApiKey>;
  error?: Maybe<MutationError>;
};

export type DeleteIssueInput = {
  issueId: Scalars['ID'];
};

export type DeleteIssueOutput = {
  __typename?: 'DeleteIssueOutput';
  error?: Maybe<MutationError>;
  issue?: Maybe<Issue>;
};

export type DeleteMachineUserInput = {
  machineUserId: Scalars['ID'];
};

export type DeleteMachineUserOutput = {
  __typename?: 'DeleteMachineUserOutput';
  error?: Maybe<MutationError>;
  machineUser?: Maybe<MachineUser>;
};

export type DeleteMySlackIntegrationOutput = {
  __typename?: 'DeleteMySlackIntegrationOutput';
  error?: Maybe<MutationError>;
};

export type DeleteNoteInput = {
  noteId: Scalars['ID'];
};

export type DeleteNoteOutput = {
  __typename?: 'DeleteNoteOutput';
  error?: Maybe<MutationError>;
  note?: Maybe<Note>;
};

export type DeleteSnippetInput = {
  snippetId: Scalars['ID'];
};

export type DeleteSnippetOutput = {
  __typename?: 'DeleteSnippetOutput';
  error?: Maybe<MutationError>;
  snippet?: Maybe<Snippet>;
};

export type DeleteUserInput = {
  userId: Scalars['ID'];
};

export type DeleteUserOutput = {
  __typename?: 'DeleteUserOutput';
  error?: Maybe<MutationError>;
};

export type DeleteWorkspaceAppInput = {
  workspaceAppId: Scalars['ID'];
};

export type DeleteWorkspaceAppOutput = {
  __typename?: 'DeleteWorkspaceAppOutput';
  error?: Maybe<MutationError>;
  workspaceApp?: Maybe<WorkspaceApp>;
};

export type DeleteWorkspaceAppPublicKeyInput = {
  workspaceAppPublicKeyId: Scalars['ID'];
};

export type DeleteWorkspaceAppPublicKeyOutput = {
  __typename?: 'DeleteWorkspaceAppPublicKeyOutput';
  error?: Maybe<MutationError>;
  workspaceAppPublicKey?: Maybe<WorkspaceAppPublicKey>;
};

export type DeleteWorkspaceDiscordIntegrationInput = {
  integrationId: Scalars['ID'];
};

export type DeleteWorkspaceDiscordIntegrationOutput = {
  __typename?: 'DeleteWorkspaceDiscordIntegrationOutput';
  error?: Maybe<MutationError>;
  integration?: Maybe<WorkspaceDiscordIntegration>;
};

export type DeleteWorkspaceEmailDomainSettingsOutput = {
  __typename?: 'DeleteWorkspaceEmailDomainSettingsOutput';
  error?: Maybe<MutationError>;
};

export type DeleteWorkspaceInviteInput = {
  inviteId: Scalars['ID'];
};

export type DeleteWorkspaceInviteOutput = {
  __typename?: 'DeleteWorkspaceInviteOutput';
  error?: Maybe<MutationError>;
  invite?: Maybe<WorkspaceInvite>;
};

export type DeleteWorkspaceSlackIntegrationInput = {
  integrationId: Scalars['ID'];
};

export type DeleteWorkspaceSlackIntegrationOutput = {
  __typename?: 'DeleteWorkspaceSlackIntegrationOutput';
  error?: Maybe<MutationError>;
  integration?: Maybe<WorkspaceSlackIntegration>;
};

export type DnsRecord = {
  __typename?: 'DnsRecord';
  isVerified: Scalars['Boolean'];
  lastCheckedAt?: Maybe<DateTime>;
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
  verifiedAt?: Maybe<DateTime>;
};

export type Email = {
  __typename?: 'Email';
  additionalRecipients: Array<EmailParticipant>;
  attachments: Array<Attachment>;
  createdAt: DateTime;
  createdBy: Actor;
  customer: Customer;
  from: EmailParticipant;
  hiddenRecipients: Array<EmailParticipant>;
  id: Scalars['ID'];
  inReplyToEmailId?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
  textContent?: Maybe<Scalars['String']>;
  to: EmailParticipant;
  updatedAt: DateTime;
  updatedBy: Actor;
};

/** An object modelling an email address and if it's been verified */
export type EmailAddress = {
  __typename?: 'EmailAddress';
  /** The email address. */
  email: Scalars['String'];
  /** If the email address ownership has been verified (e.g. via sending an email with a code). If the email is not verified, Plain may not email this address. */
  isVerified: Scalars['Boolean'];
  /** When the email became verified in Plain. */
  verifiedAt?: Maybe<DateTime>;
};

export type EmailAddressInput = {
  email: Scalars['String'];
  isVerified: Scalars['Boolean'];
};

export enum EmailAuthenticity {
  Fail = 'FAIL',
  Pass = 'PASS',
  Unknown = 'UNKNOWN'
}

export type EmailEntry = {
  __typename?: 'EmailEntry';
  additionalRecipients: Array<EmailParticipant>;
  attachments: Array<Attachment>;
  authenticity: EmailAuthenticity;
  emailId: Scalars['ID'];
  from: EmailParticipant;
  hiddenRecipients: Array<EmailParticipant>;
  markdownContent?: Maybe<Scalars['String']>;
  sentAt?: Maybe<DateTime>;
  subject?: Maybe<Scalars['String']>;
  textContent?: Maybe<Scalars['String']>;
  to: EmailParticipant;
};

export type EmailParticipant = {
  __typename?: 'EmailParticipant';
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type EmailParticipantInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

/** A union of all possible entries that can appear in a timeline. */
export type Entry = ChatEntry | CustomEntry | CustomerAssignmentTransitionedEntry | CustomerStatusTransitionedEntry | EmailEntry | IssueDeletedEntry | IssueIssueTypeChangedEntry | IssueStatusTransitionedEntry | NoteEntry;

export type FileSize = {
  __typename?: 'FileSize';
  bytes: Scalars['Int'];
  kiloBytes: Scalars['Float'];
  megaBytes: Scalars['Float'];
};

export type InternalActor = MachineUserActor | SystemActor | UserActor;

export type InviteUserToWorkspaceInput = {
  email: Scalars['String'];
  roleIds: Array<Scalars['ID']>;
};

export type InviteUserToWorkspaceOutput = {
  __typename?: 'InviteUserToWorkspaceOutput';
  error?: Maybe<MutationError>;
  invite?: Maybe<WorkspaceInvite>;
};

export type Issue = {
  __typename?: 'Issue';
  createdAt: DateTime;
  createdBy: Actor;
  customer: Customer;
  deletedAt?: Maybe<DateTime>;
  deletedBy?: Maybe<Actor>;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  issueKey: Scalars['String'];
  issueType: IssueType;
  status: IssueStatus;
  updatedAt: DateTime;
  updatedBy: Actor;
};

export type IssueChange = {
  __typename?: 'IssueChange';
  changeType: ChangeType;
  issue: Issue;
};

export type IssueConnection = {
  __typename?: 'IssueConnection';
  edges: Array<IssueEdge>;
  pageInfo: PageInfo;
};

export type IssueDeletedEntry = {
  __typename?: 'IssueDeletedEntry';
  issueId: Scalars['ID'];
  issueKey: Scalars['String'];
  issueTypeId: Scalars['ID'];
  issueTypePublicName: Scalars['String'];
  status: IssueStatus;
};

export type IssueEdge = {
  __typename?: 'IssueEdge';
  cursor: Scalars['String'];
  node: Issue;
};

export type IssueIssueTypeChangedEntry = {
  __typename?: 'IssueIssueTypeChangedEntry';
  issueId: Scalars['ID'];
  issueKey: Scalars['String'];
  nextIssueTypeId: Scalars['ID'];
  nextIssueTypePublicName: Scalars['String'];
  previousIssueTypeId: Scalars['ID'];
  previousIssueTypePublicName: Scalars['String'];
  status: IssueStatus;
};

export enum IssueStatus {
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

export type IssueStatusTransitionedEntry = {
  __typename?: 'IssueStatusTransitionedEntry';
  issueId: Scalars['ID'];
  issueKey: Scalars['String'];
  issueTypeId: Scalars['ID'];
  issueTypePublicName: Scalars['String'];
  nextStatus: IssueStatus;
  previousStatus?: Maybe<IssueStatus>;
};

export type IssueType = {
  __typename?: 'IssueType';
  archivedAt?: Maybe<DateTime>;
  archivedBy?: Maybe<InternalActor>;
  createdAt: DateTime;
  createdBy: InternalActor;
  id: Scalars['ID'];
  isArchived: Scalars['Boolean'];
  publicName: Scalars['String'];
  updatedAt: DateTime;
  updatedBy: InternalActor;
};

export type IssueTypeConnection = {
  __typename?: 'IssueTypeConnection';
  edges: Array<IssueTypeEdge>;
  pageInfo: PageInfo;
};

export type IssueTypeEdge = {
  __typename?: 'IssueTypeEdge';
  cursor: Scalars['String'];
  node: IssueType;
};

export type IssueTypeFilter = {
  isArchived?: InputMaybe<Scalars['Boolean']>;
};

export type IssuesFilter = {
  customerId?: InputMaybe<Scalars['ID']>;
  statuses?: InputMaybe<Array<IssueStatus>>;
};

export type MachineUser = {
  __typename?: 'MachineUser';
  apiKey?: Maybe<ApiKey>;
  apiKeys: ApiKeyConnection;
  createdAt: DateTime;
  createdBy: InternalActor;
  deletedAt?: Maybe<DateTime>;
  deletedBy?: Maybe<Actor>;
  description?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  publicName: Scalars['String'];
  updatedAt: DateTime;
  updatedBy: InternalActor;
};


export type MachineUserApiKeyArgs = {
  apiKeyId: Scalars['ID'];
};


export type MachineUserApiKeysArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type MachineUserActor = {
  __typename?: 'MachineUserActor';
  machineUser: MachineUser;
  machineUserId: Scalars['ID'];
};

export type MachineUserConnection = {
  __typename?: 'MachineUserConnection';
  edges: Array<MachineUserEdge>;
  pageInfo: PageInfo;
};

export type MachineUserEdge = {
  __typename?: 'MachineUserEdge';
  cursor: Scalars['String'];
  node: MachineUser;
};

export type MarkTimelineAsReadInput = {
  customerId: Scalars['ID'];
  lastTimelineEntryId: Scalars['ID'];
};

export type MarkTimelineAsReadOutput = {
  __typename?: 'MarkTimelineAsReadOutput';
  error?: Maybe<MutationError>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptWorkspaceInvite: AcceptWorkspaceInviteOutput;
  archiveIssueType: ArchiveIssueTypeOutput;
  assignCustomerToUser: AssignCustomerToUserOutput;
  assignRolesToUser: AssignRolesToUserOutput;
  changeCustomerStatusAsync: ChangeCustomerStatusAsyncOutput;
  changeIssueIssueType: ChangeIssueIssueTypeOutput;
  changeUserStatus: ChangeUserStatusOutput;
  createApiKey: CreateApiKeyOutput;
  createAttachmentDownloadUrl: CreateAttachmentDownloadUrlOutput;
  createAttachmentUploadUrl: CreateAttachmentUploadUrlOutput;
  createIssue: CreateIssueOutput;
  createIssueType: CreateIssueTypeOutput;
  createMachineUser: CreateMachineUserOutput;
  createMySlackIntegration: CreateMySlackIntegrationOutput;
  createNote: CreateNoteOutput;
  createSnippet: CreateSnippetOutput;
  createUserAccount: CreateUserAccountOutput;
  createWorkspace: CreateWorkspaceOutput;
  createWorkspaceApp: CreateWorkspaceAppOutput;
  createWorkspaceAppPublicKey: CreateWorkspaceAppPublicKeyOutput;
  createWorkspaceDiscordIntegration: CreateWorkspaceDiscordIntegrationOutput;
  createWorkspaceEmailDomainSettings: CreateWorkspaceEmailDomainSettingsOutput;
  createWorkspaceSlackIntegration: CreateWorkspaceSlackIntegrationOutput;
  deleteApiKey: DeleteApiKeyOutput;
  deleteIssue: DeleteIssueOutput;
  deleteMachineUser: DeleteMachineUserOutput;
  deleteMySlackIntegration: DeleteMySlackIntegrationOutput;
  deleteNote: DeleteNoteOutput;
  deleteSnippet: DeleteSnippetOutput;
  deleteUser: DeleteUserOutput;
  deleteWorkspaceApp: DeleteWorkspaceAppOutput;
  deleteWorkspaceAppPublicKey: DeleteWorkspaceAppPublicKeyOutput;
  deleteWorkspaceDiscordIntegration: DeleteWorkspaceDiscordIntegrationOutput;
  deleteWorkspaceEmailDomainSettings: DeleteWorkspaceEmailDomainSettingsOutput;
  deleteWorkspaceInvite: DeleteWorkspaceInviteOutput;
  deleteWorkspaceSlackIntegration: DeleteWorkspaceSlackIntegrationOutput;
  inviteUserToWorkspace: InviteUserToWorkspaceOutput;
  markTimelineAsRead: MarkTimelineAsReadOutput;
  reopenIssue: ReopenIssueOutput;
  replyToEmail: ReplyToEmailOutput;
  resolveIssue: ResolveIssueOutput;
  sendChat: SendChatOutput;
  sendNewEmail: SendNewEmailOutput;
  unarchiveIssueType: UnarchiveIssueTypeOutput;
  unassignAllCustomers: UnassignAllCustomersOutput;
  updateIssueType: UpdateIssueTypeOutput;
  updateMachineUser: UpdateMachineUserOutput;
  /** Updates a setting. For more information about this mutation please see: https://docs.plain.com/advanced/settings */
  updateSetting: UpdateSettingOutput;
  updateSnippet: UpdateSnippetOutput;
  updateWorkspace: UpdateWorkspaceOutput;
  updateWorkspaceChatSettings: UpdateWorkspaceChatSettingsOutput;
  updateWorkspaceEmailSettings: UpdateWorkspaceEmailSettingsOutput;
  upsertCustomTimelineEntry: UpsertCustomTimelineEntryOutput;
  upsertCustomer: UpsertCustomerOutput;
  verifyWorkspaceEmailDnsSettings: VerifyWorkspaceEmailDnsSettingsOutput;
  verifyWorkspaceEmailForwardingSettings: VerifyWorkspaceEmailForwardingSettingsOutput;
};


export type MutationAcceptWorkspaceInviteArgs = {
  input: AcceptWorkspaceInviteInput;
};


export type MutationArchiveIssueTypeArgs = {
  input: ArchiveIssueTypeInput;
};


export type MutationAssignCustomerToUserArgs = {
  input: AssignCustomerToUserInput;
};


export type MutationAssignRolesToUserArgs = {
  input: AssignRolesToUserInput;
};


export type MutationChangeCustomerStatusAsyncArgs = {
  input: ChangeCustomerStatusAsyncInput;
};


export type MutationChangeIssueIssueTypeArgs = {
  input: ChangeIssueIssueTypeInput;
};


export type MutationChangeUserStatusArgs = {
  input: ChangeUserStatusInput;
};


export type MutationCreateApiKeyArgs = {
  input: CreateApiKeyInput;
};


export type MutationCreateAttachmentDownloadUrlArgs = {
  input: CreateAttachmentDownloadUrlInput;
};


export type MutationCreateAttachmentUploadUrlArgs = {
  input: CreateAttachmentUploadUrlInput;
};


export type MutationCreateIssueArgs = {
  input: CreateIssueInput;
};


export type MutationCreateIssueTypeArgs = {
  input: CreateIssueTypeInput;
};


export type MutationCreateMachineUserArgs = {
  input: CreateMachineUserInput;
};


export type MutationCreateMySlackIntegrationArgs = {
  input: CreateMySlackIntegrationInput;
};


export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};


export type MutationCreateSnippetArgs = {
  input: CreateSnippetInput;
};


export type MutationCreateUserAccountArgs = {
  input: CreateUserAccountInput;
};


export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


export type MutationCreateWorkspaceAppArgs = {
  input: CreateWorkspaceAppInput;
};


export type MutationCreateWorkspaceAppPublicKeyArgs = {
  input: CreateWorkspaceAppPublicKeyInput;
};


export type MutationCreateWorkspaceDiscordIntegrationArgs = {
  input: CreateWorkspaceDiscordIntegrationInput;
};


export type MutationCreateWorkspaceEmailDomainSettingsArgs = {
  input: CreateWorkspaceEmailDomainSettingsInput;
};


export type MutationCreateWorkspaceSlackIntegrationArgs = {
  input: CreateWorkspaceSlackIntegrationInput;
};


export type MutationDeleteApiKeyArgs = {
  input: DeleteApiKeyInput;
};


export type MutationDeleteIssueArgs = {
  input: DeleteIssueInput;
};


export type MutationDeleteMachineUserArgs = {
  input: DeleteMachineUserInput;
};


export type MutationDeleteNoteArgs = {
  input: DeleteNoteInput;
};


export type MutationDeleteSnippetArgs = {
  input: DeleteSnippetInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationDeleteWorkspaceAppArgs = {
  input: DeleteWorkspaceAppInput;
};


export type MutationDeleteWorkspaceAppPublicKeyArgs = {
  input: DeleteWorkspaceAppPublicKeyInput;
};


export type MutationDeleteWorkspaceDiscordIntegrationArgs = {
  input: DeleteWorkspaceDiscordIntegrationInput;
};


export type MutationDeleteWorkspaceInviteArgs = {
  input: DeleteWorkspaceInviteInput;
};


export type MutationDeleteWorkspaceSlackIntegrationArgs = {
  input: DeleteWorkspaceSlackIntegrationInput;
};


export type MutationInviteUserToWorkspaceArgs = {
  input: InviteUserToWorkspaceInput;
};


export type MutationMarkTimelineAsReadArgs = {
  input: MarkTimelineAsReadInput;
};


export type MutationReopenIssueArgs = {
  input: ReopenIssueInput;
};


export type MutationReplyToEmailArgs = {
  input: ReplyToEmailInput;
};


export type MutationResolveIssueArgs = {
  input: ResolveIssueInput;
};


export type MutationSendChatArgs = {
  input: SendChatInput;
};


export type MutationSendNewEmailArgs = {
  input: SendNewEmailInput;
};


export type MutationUnarchiveIssueTypeArgs = {
  input: UnarchiveIssueTypeInput;
};


export type MutationUnassignAllCustomersArgs = {
  input: UnassignAllCustomersInput;
};


export type MutationUpdateIssueTypeArgs = {
  input: UpdateIssueTypeInput;
};


export type MutationUpdateMachineUserArgs = {
  input: UpdateMachineUserInput;
};


export type MutationUpdateSettingArgs = {
  input: UpdateSettingInput;
};


export type MutationUpdateSnippetArgs = {
  input: UpdateSnippetInput;
};


export type MutationUpdateWorkspaceArgs = {
  input: UpdateWorkspaceInput;
};


export type MutationUpdateWorkspaceChatSettingsArgs = {
  input: UpdateWorkspaceChatSettingsInput;
};


export type MutationUpdateWorkspaceEmailSettingsArgs = {
  input: UpdateWorkspaceEmailSettingsInput;
};


export type MutationUpsertCustomTimelineEntryArgs = {
  input: UpsertCustomTimelineEntryInput;
};


export type MutationUpsertCustomerArgs = {
  input: UpsertCustomerInput;
};


export type MutationVerifyWorkspaceEmailForwardingSettingsArgs = {
  input: VerifyWorkspaceEmailForwardingSettingsInput;
};

/** A type indicating an error has occurred while making a mutation. */
export type MutationError = {
  __typename?: 'MutationError';
  /** A fixed error code that can be used to handle this error, see https://docs.plain.com/error-codes for a description of each code. */
  code: Scalars['String'];
  /** The array of fields that are impacted by this error. */
  fields: Array<MutationFieldError>;
  /** An English technical description of the error. This error is usually meant to be read by a developer and not an end user. */
  message: Scalars['String'];
  /** The type of error. Can be used to display a user friendly error message. */
  type: MutationErrorType;
};

/** An enum for why the mutation failed overall. */
export enum MutationErrorType {
  /** The user is not authorized to do this mutation. See `message` for details on which permissions are missing. */
  Forbidden = 'FORBIDDEN',
  /** An unknown internal server error occurred. Retry the mutation and if it persists, please email help@plain.com */
  Internal = 'INTERNAL',
  /** Input validation failed, see the `fields` for details on why the input was invalid. */
  Validation = 'VALIDATION'
}

/** A type indicating an error has occurred with a specific field in the input. */
export type MutationFieldError = {
  __typename?: 'MutationFieldError';
  /** The name of the field for which the error happened. */
  field: Scalars['String'];
  /** An English technical description of the error. This error is usually meant to be read by a developer and not an end user. */
  message: Scalars['String'];
  /** The type of the error. Can be used to display a user friendly error message. */
  type: MutationFieldErrorType;
};

/** An enum specific to each field, explaining why validation failed. */
export enum MutationFieldErrorType {
  /** The input field referenced an entity that wasn't found. */
  NotFound = 'NOT_FOUND',
  /** The field is required to be provided. String inputs may be trimmed and checked for emptyness. */
  Required = 'REQUIRED',
  /** The field was provided, but didn't pass the requirements of the field. See `message` for details on why. */
  Validation = 'VALIDATION'
}

export type Note = {
  __typename?: 'Note';
  createdAt: DateTime;
  createdBy: Actor;
  customer: Customer;
  deletedAt?: Maybe<DateTime>;
  deletedBy?: Maybe<Actor>;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  text: Scalars['String'];
  updatedAt: DateTime;
  updatedBy: Actor;
};

export type NoteEntry = {
  __typename?: 'NoteEntry';
  noteId: Scalars['ID'];
  text: Scalars['String'];
};

export type OptionalStringInput = {
  value?: InputMaybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Permissions = {
  __typename?: 'Permissions';
  permissions: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  customer?: Maybe<Customer>;
  customerByEmail?: Maybe<Customer>;
  customerByExternalId?: Maybe<Customer>;
  customers: CustomerConnection;
  issue?: Maybe<Issue>;
  issueTypes: IssueTypeConnection;
  issues: IssueConnection;
  machineUser?: Maybe<MachineUser>;
  machineUsers: MachineUserConnection;
  mySlackInstallationInfo: UserSlackInstallationInfo;
  mySlackIntegration?: Maybe<UserSlackIntegration>;
  myUser?: Maybe<User>;
  myUserAccount?: Maybe<UserAccount>;
  myWorkspaceInvites: WorkspaceInviteConnection;
  myWorkspaces: WorkspaceConnection;
  permissions: Permissions;
  roles: RoleConnection;
  /**
   * Search for customers based on the provided query. Returned customers are sorted by how recently
   * they changed status (most recent first).
   */
  searchCustomers: CustomerSearchConnection;
  /**
   * Gets a single setting based on the code and the scope.
   * For a list of codes and more details, please see: https://docs.plain.com/advanced/settings
   */
  setting?: Maybe<Setting>;
  snippet?: Maybe<Snippet>;
  snippets: SnippetConnection;
  timelineEntries: TimelineEntryConnection;
  user?: Maybe<User>;
  users: UserConnection;
  workspace?: Maybe<Workspace>;
  workspaceApp?: Maybe<WorkspaceApp>;
  workspaceAppPublicKeys: WorkspaceAppPublicKeyConnection;
  workspaceApps: WorkspaceAppConnection;
  workspaceChatSettings: WorkspaceChatSettings;
  workspaceDiscordIntegration?: Maybe<WorkspaceDiscordIntegration>;
  workspaceDiscordIntegrations: WorkspaceDiscordIntegrationConnection;
  workspaceEmailSettings: WorkspaceEmailSettings;
  workspaceInvites: WorkspaceInviteConnection;
  workspaceSlackInstallationInfo: WorkspaceSlackInstallationInfo;
  workspaceSlackIntegration?: Maybe<WorkspaceSlackIntegration>;
  workspaceSlackIntegrations: WorkspaceSlackIntegrationConnection;
};


export type QueryCustomerArgs = {
  customerId: Scalars['ID'];
};


export type QueryCustomerByEmailArgs = {
  email: Scalars['String'];
};


export type QueryCustomerByExternalIdArgs = {
  externalId: Scalars['ID'];
};


export type QueryCustomersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<CustomersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<CustomersSort>;
};


export type QueryIssueArgs = {
  issueId: Scalars['ID'];
};


export type QueryIssueTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<IssueTypeFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryIssuesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<IssuesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryMachineUserArgs = {
  machineUserId: Scalars['ID'];
};


export type QueryMachineUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryMySlackInstallationInfoArgs = {
  redirectUrl: Scalars['String'];
};


export type QueryMyWorkspaceInvitesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryMyWorkspacesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchCustomersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  searchQuery: CustomersSearchQuery;
};


export type QuerySettingArgs = {
  code: Scalars['String'];
  scope: SettingScopeInput;
};


export type QuerySnippetArgs = {
  snippetId: Scalars['ID'];
};


export type QuerySnippetsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryTimelineEntriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  customerId: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<UsersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryWorkspaceArgs = {
  workspaceId: Scalars['ID'];
};


export type QueryWorkspaceAppArgs = {
  workspaceAppId: Scalars['ID'];
};


export type QueryWorkspaceAppPublicKeysArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  workspaceAppId: Scalars['ID'];
};


export type QueryWorkspaceAppsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryWorkspaceDiscordIntegrationArgs = {
  integrationId: Scalars['ID'];
};


export type QueryWorkspaceDiscordIntegrationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryWorkspaceInvitesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryWorkspaceSlackInstallationInfoArgs = {
  redirectUrl: Scalars['String'];
};


export type QueryWorkspaceSlackIntegrationArgs = {
  integrationId: Scalars['ID'];
};


export type QueryWorkspaceSlackIntegrationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ReopenIssueInput = {
  issueId: Scalars['ID'];
};

export type ReopenIssueOutput = {
  __typename?: 'ReopenIssueOutput';
  error?: Maybe<MutationError>;
  issue?: Maybe<Issue>;
};

export type ReplyToEmailInput = {
  additionalRecipients?: InputMaybe<Array<EmailParticipantInput>>;
  attachmentIds?: InputMaybe<Array<Scalars['ID']>>;
  customerId: Scalars['ID'];
  hiddenRecipients?: InputMaybe<Array<EmailParticipantInput>>;
  inReplyToEmailId: Scalars['ID'];
  textContent: Scalars['String'];
};

export type ReplyToEmailOutput = {
  __typename?: 'ReplyToEmailOutput';
  email?: Maybe<Email>;
  error?: Maybe<MutationError>;
};

export type ResolveIssueInput = {
  issueId: Scalars['ID'];
};

export type ResolveIssueOutput = {
  __typename?: 'ResolveIssueOutput';
  error?: Maybe<MutationError>;
  issue?: Maybe<Issue>;
};

export type Role = {
  __typename?: 'Role';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isAssignableToCustomer: Scalars['Boolean'];
  name: Scalars['String'];
  permissions: Array<Scalars['String']>;
};

export type RoleConnection = {
  __typename?: 'RoleConnection';
  edges: Array<RoleEdge>;
  pageInfo: PageInfo;
};

export type RoleEdge = {
  __typename?: 'RoleEdge';
  cursor: Scalars['String'];
  node: Role;
};

export type SendChatInput = {
  attachmentIds?: InputMaybe<Array<Scalars['ID']>>;
  customerId: Scalars['ID'];
  text?: InputMaybe<Scalars['String']>;
};

export type SendChatOutput = {
  __typename?: 'SendChatOutput';
  chat?: Maybe<Chat>;
  error?: Maybe<MutationError>;
};

export type SendNewEmailInput = {
  additionalRecipients?: InputMaybe<Array<EmailParticipantInput>>;
  attachmentIds?: InputMaybe<Array<Scalars['ID']>>;
  customerId: Scalars['ID'];
  hiddenRecipients?: InputMaybe<Array<EmailParticipantInput>>;
  subject: Scalars['String'];
  textContent: Scalars['String'];
};

export type SendNewEmailOutput = {
  __typename?: 'SendNewEmailOutput';
  email?: Maybe<Email>;
  error?: Maybe<MutationError>;
};

/** A union of different types of settings */
export type Setting = BooleanSetting;

export type SettingScope = {
  __typename?: 'SettingScope';
  id?: Maybe<Scalars['ID']>;
  scopeType: SettingScopeType;
};

/** An input to specify the scope for a setting. */
export type SettingScopeInput = {
  /** An optional ID input. Depends on the type of scope if this is required. */
  id?: InputMaybe<Scalars['ID']>;
  /** Determines the type of the scope */
  scopeType: SettingScopeType;
};

/** An enum to describe the type of scope the setting is for. */
export enum SettingScopeType {
  /**
   * Scope for the authenticated user's email notification settings.
   * An `id` is not needed as it will implicitly be the authenticated user's id.
   */
  UserEmailNotifications = 'USER_EMAIL_NOTIFICATIONS',
  /**
   * Scope for the authenticated user's slack notification settings.
   * An `id` is not needed as it will implicitly be the authenticated user's id.
   */
  UserSlackNotifications = 'USER_SLACK_NOTIFICATIONS',
  /**
   * Scope for discord notifications configured for the whole workspace.
   * An `id` is mandatory and should be a workspace discord integration id (`wsDiscordInt_123`)
   */
  WorkspaceDiscordNotifications = 'WORKSPACE_DISCORD_NOTIFICATIONS',
  /**
   * Scope for slack notifications configured for the whole workspace.
   * An `id` is mandatory and should be a workspace slack integration id (`wsSlackInt_123`)
   */
  WorkspaceSlackNotifications = 'WORKSPACE_SLACK_NOTIFICATIONS'
}

/**
 * An input "union" where exactly one field may be be provided as an input
 * Current API only supports booleans but as the API expands more optional fields will be added.
 */
export type SettingValueInput = {
  /** If the setting is a boolean value then this field should be set. */
  boolean?: InputMaybe<Scalars['Boolean']>;
};

export type Snippet = {
  __typename?: 'Snippet';
  createdAt: DateTime;
  createdBy: InternalActor;
  deletedAt?: Maybe<DateTime>;
  deletedBy?: Maybe<InternalActor>;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  name: Scalars['String'];
  text: Scalars['String'];
  updatedAt: DateTime;
  updatedBy: InternalActor;
};

export type SnippetConnection = {
  __typename?: 'SnippetConnection';
  edges: Array<SnippetEdge>;
  pageInfo: PageInfo;
};

export type SnippetEdge = {
  __typename?: 'SnippetEdge';
  cursor: Scalars['String'];
  node: Snippet;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringInput = {
  value: Scalars['String'];
};

/**
 * The different ways in which a string is matched.
 * Exactly one of these must be provided in a single search expression.
 */
export type StringSearchExpression = {
  /** Case-insensitive match values containing the provided string. */
  caseInsensitiveContains?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  customerChanges: CustomerChange;
  issueChanges: IssueChange;
  timelineChanges: TimelineEntryChange;
  userChanges: UserChange;
};


export type SubscriptionCustomerChangesArgs = {
  filters?: InputMaybe<CustomerChangesFilter>;
};


export type SubscriptionTimelineChangesArgs = {
  customerId: Scalars['ID'];
};

export type SystemActor = {
  __typename?: 'SystemActor';
  systemId: Scalars['ID'];
};

export type TimelineEntry = {
  __typename?: 'TimelineEntry';
  actor: Actor;
  customerId: Scalars['ID'];
  entry: Entry;
  id: Scalars['ID'];
  timestamp: DateTime;
};

export type TimelineEntryChange = {
  __typename?: 'TimelineEntryChange';
  changeType: ChangeType;
  timelineEntry: TimelineEntry;
};

export type TimelineEntryConnection = {
  __typename?: 'TimelineEntryConnection';
  edges: Array<TimelineEntryEdge>;
  pageInfo: PageInfo;
};

export type TimelineEntryEdge = {
  __typename?: 'TimelineEntryEdge';
  cursor: Scalars['String'];
  node: TimelineEntry;
};

export type TimelineEntryPreview = {
  __typename?: 'TimelineEntryPreview';
  actor: Actor;
  previewText?: Maybe<Scalars['String']>;
  timestamp: DateTime;
};

export type TimelineInfo = {
  __typename?: 'TimelineInfo';
  assignedUserUnreadCount: Scalars['Int'];
  createdAt: DateTime;
  createdBy: Actor;
  customerWaitingForReplySince?: Maybe<DateTime>;
  lastCommunication?: Maybe<TimelineInfoCommunication>;
  lastTimelineEntryPreview?: Maybe<TimelineEntryPreview>;
  updatedAt: DateTime;
  updatedBy: Actor;
};

export type TimelineInfoCommunication = {
  __typename?: 'TimelineInfoCommunication';
  actor: Actor;
  communicationChannel: CommunicationChannel;
  previewText?: Maybe<Scalars['String']>;
  timestamp: DateTime;
};

export type UnarchiveIssueTypeInput = {
  issueTypeId: Scalars['ID'];
};

export type UnarchiveIssueTypeOutput = {
  __typename?: 'UnarchiveIssueTypeOutput';
  error?: Maybe<MutationError>;
  issueType?: Maybe<IssueType>;
};

export type UnassignAllCustomersInput = {
  userId: Scalars['ID'];
};

export type UnassignAllCustomersOutput = {
  __typename?: 'UnassignAllCustomersOutput';
  error?: Maybe<MutationError>;
  unassignedCustomerCount?: Maybe<Scalars['Int']>;
};

export type UpdateIssueTypeInput = {
  issueTypeId: Scalars['ID'];
  publicName?: InputMaybe<StringInput>;
};

export type UpdateIssueTypeOutput = {
  __typename?: 'UpdateIssueTypeOutput';
  error?: Maybe<MutationError>;
  issueType?: Maybe<IssueType>;
};

export type UpdateMachineUserInput = {
  description?: InputMaybe<StringInput>;
  fullName?: InputMaybe<StringInput>;
  machineUserId: Scalars['ID'];
  publicName?: InputMaybe<StringInput>;
};

export type UpdateMachineUserOutput = {
  __typename?: 'UpdateMachineUserOutput';
  error?: Maybe<MutationError>;
  machineUser?: Maybe<MachineUser>;
};

/**
 * An input provided to the `updateSetting` mutation.
 * For more info on settings, please see: https://docs.plain.com/advanced/settings
 */
export type UpdateSettingInput = {
  /** A code for the setting */
  code: Scalars['String'];
  /** A valid scope for the setting code. To see what the valid scopes are for a specific setting, please see: https://docs.plain.com/advanced/settings */
  scope: SettingScopeInput;
  /** The setting value */
  value: SettingValueInput;
};

/**
 * An output type provided by the `updateSetting` mutation.
 * Returns the updated setting or an error.
 */
export type UpdateSettingOutput = {
  __typename?: 'UpdateSettingOutput';
  error?: Maybe<MutationError>;
  /** The updated setting */
  setting?: Maybe<Setting>;
};

export type UpdateSnippetInput = {
  name?: InputMaybe<StringInput>;
  snippetId: Scalars['ID'];
  text?: InputMaybe<StringInput>;
};

export type UpdateSnippetOutput = {
  __typename?: 'UpdateSnippetOutput';
  error?: Maybe<MutationError>;
  snippet?: Maybe<Snippet>;
};

export type UpdateWorkspaceChatSettingsInput = {
  isEnabled: Scalars['Boolean'];
};

export type UpdateWorkspaceChatSettingsOutput = {
  __typename?: 'UpdateWorkspaceChatSettingsOutput';
  error?: Maybe<MutationError>;
  workspaceChatSettings?: Maybe<WorkspaceChatSettings>;
};

export type UpdateWorkspaceEmailSettingsInput = {
  isEnabled: Scalars['Boolean'];
};

export type UpdateWorkspaceEmailSettingsOutput = {
  __typename?: 'UpdateWorkspaceEmailSettingsOutput';
  error?: Maybe<MutationError>;
  workspaceEmailSettings?: Maybe<WorkspaceEmailSettings>;
};

export type UpdateWorkspaceInput = {
  name?: InputMaybe<StringInput>;
  publicName?: InputMaybe<StringInput>;
};

export type UpdateWorkspaceOutput = {
  __typename?: 'UpdateWorkspaceOutput';
  error?: Maybe<MutationError>;
  workspace?: Maybe<Workspace>;
};

export type UploadFormData = {
  __typename?: 'UploadFormData';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type UpsertCustomTimelineEntryInput = {
  attachmentIds?: InputMaybe<Array<Scalars['ID']>>;
  components: Array<ComponentInput>;
  customerId: Scalars['ID'];
  expiresAt?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['ID']>;
  timestamp?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};

export type UpsertCustomTimelineEntryOutput = {
  __typename?: 'UpsertCustomTimelineEntryOutput';
  error?: Maybe<MutationError>;
  result?: Maybe<UpsertResult>;
  timelineEntry?: Maybe<TimelineEntry>;
};

export type UpsertCustomerIdentifierInput = {
  customerId?: InputMaybe<Scalars['ID']>;
  emailAddress?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['ID']>;
};

export type UpsertCustomerInput = {
  identifier: UpsertCustomerIdentifierInput;
  onCreate: UpsertCustomerOnCreateInput;
  onUpdate: UpsertCustomerOnUpdateInput;
};

export type UpsertCustomerOnCreateInput = {
  email: EmailAddressInput;
  externalId?: InputMaybe<Scalars['ID']>;
  fullName: Scalars['String'];
  shortName?: InputMaybe<Scalars['String']>;
};

export type UpsertCustomerOnUpdateInput = {
  email?: InputMaybe<EmailAddressInput>;
  externalId?: InputMaybe<OptionalStringInput>;
  fullName?: InputMaybe<StringInput>;
  shortName?: InputMaybe<OptionalStringInput>;
};

export type UpsertCustomerOutput = {
  __typename?: 'UpsertCustomerOutput';
  customer?: Maybe<Customer>;
  error?: Maybe<MutationError>;
  result?: Maybe<UpsertResult>;
};

export enum UpsertResult {
  Created = 'CREATED',
  Noop = 'NOOP',
  Updated = 'UPDATED'
}

export type User = {
  __typename?: 'User';
  createdAt: DateTime;
  createdBy: InternalActor;
  deletedAt?: Maybe<DateTime>;
  deletedBy?: Maybe<Actor>;
  /** The email associated with this user. Email is unique per user */
  email: Scalars['String'];
  /** The full name e.g. Grace Hopper */
  fullName: Scalars['String'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  /** A short name for use in UI e.g. Grace */
  publicName: Scalars['String'];
  /** Retrieve roles for a specific workspace + user. */
  roles: Array<Role>;
  status: UserStatus;
  statusChangedAt: DateTime;
  updatedAt: DateTime;
  updatedBy: InternalActor;
};

export type UserAccount = {
  __typename?: 'UserAccount';
  /** The email associated with this user. Email is unique per user */
  email: Scalars['String'];
  /** The full name e.g. Grace Hopper */
  fullName: Scalars['String'];
  id: Scalars['ID'];
  /** A short name for use in UI e.g. Grace */
  publicName: Scalars['String'];
};

export type UserActor = {
  __typename?: 'UserActor';
  user: User;
  userId: Scalars['ID'];
};

export type UserChange = {
  __typename?: 'UserChange';
  changeType: ChangeType;
  user: User;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserSlackInstallationInfo = {
  __typename?: 'UserSlackInstallationInfo';
  installationUrl: Scalars['String'];
};

export type UserSlackIntegration = {
  __typename?: 'UserSlackIntegration';
  createdAt: DateTime;
  createdBy: InternalActor;
  integrationId: Scalars['ID'];
  isReinstallRequired: Scalars['Boolean'];
  slackTeamName: Scalars['String'];
  updatedAt: DateTime;
  updatedBy: InternalActor;
};

export enum UserStatus {
  Break = 'BREAK',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type UsersFilter = {
  isAssignableToCustomer?: InputMaybe<Scalars['Boolean']>;
};

export type VerifyWorkspaceEmailDnsSettingsOutput = {
  __typename?: 'VerifyWorkspaceEmailDnsSettingsOutput';
  error?: Maybe<MutationError>;
  workspaceEmailDomainSettings?: Maybe<WorkspaceEmailDomainSettings>;
};

export type VerifyWorkspaceEmailForwardingSettingsInput = {
  isForwardingConfigured: Scalars['Boolean'];
};

export type VerifyWorkspaceEmailForwardingSettingsOutput = {
  __typename?: 'VerifyWorkspaceEmailForwardingSettingsOutput';
  error?: Maybe<MutationError>;
  workspaceEmailDomainSettings?: Maybe<WorkspaceEmailDomainSettings>;
};

export type Workspace = {
  __typename?: 'Workspace';
  createdAt: DateTime;
  createdBy: InternalActor;
  id: Scalars['ID'];
  name: Scalars['String'];
  publicName: Scalars['String'];
  updatedAt: DateTime;
  updatedBy: InternalActor;
  workspaceChatSettings: WorkspaceChatSettings;
  workspaceEmailSettings: WorkspaceEmailSettings;
};

export type WorkspaceApp = {
  __typename?: 'WorkspaceApp';
  appKey: Scalars['String'];
  createdAt: DateTime;
  createdBy: InternalActor;
  id: Scalars['ID'];
  name: Scalars['String'];
  publicName: Scalars['String'];
  updatedAt: DateTime;
  updatedBy: InternalActor;
};

export type WorkspaceAppConnection = {
  __typename?: 'WorkspaceAppConnection';
  edges: Array<WorkspaceAppEdge>;
  pageInfo: PageInfo;
};

export type WorkspaceAppEdge = {
  __typename?: 'WorkspaceAppEdge';
  cursor: Scalars['String'];
  node: WorkspaceApp;
};

export type WorkspaceAppPublicKey = {
  __typename?: 'WorkspaceAppPublicKey';
  createdAt: DateTime;
  createdBy: InternalActor;
  fingerprint: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: DateTime;
  updatedBy: InternalActor;
};

export type WorkspaceAppPublicKeyConnection = {
  __typename?: 'WorkspaceAppPublicKeyConnection';
  edges: Array<WorkspaceAppPublicKeyEdge>;
  pageInfo: PageInfo;
};

export type WorkspaceAppPublicKeyEdge = {
  __typename?: 'WorkspaceAppPublicKeyEdge';
  cursor: Scalars['String'];
  node: WorkspaceAppPublicKey;
};

export type WorkspaceChatSettings = {
  __typename?: 'WorkspaceChatSettings';
  isEnabled: Scalars['Boolean'];
};

export type WorkspaceConnection = {
  __typename?: 'WorkspaceConnection';
  edges: Array<WorkspaceEdge>;
  pageInfo: PageInfo;
};

export type WorkspaceDiscordIntegration = {
  __typename?: 'WorkspaceDiscordIntegration';
  createdAt: DateTime;
  createdBy: InternalActor;
  integrationId: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: DateTime;
  updatedBy: InternalActor;
  webhookUrl: Scalars['String'];
};

export type WorkspaceDiscordIntegrationConnection = {
  __typename?: 'WorkspaceDiscordIntegrationConnection';
  edges: Array<WorkspaceDiscordIntegrationEdge>;
  pageInfo: PageInfo;
};

export type WorkspaceDiscordIntegrationEdge = {
  __typename?: 'WorkspaceDiscordIntegrationEdge';
  cursor: Scalars['String'];
  node: WorkspaceDiscordIntegration;
};

export type WorkspaceEdge = {
  __typename?: 'WorkspaceEdge';
  cursor: Scalars['String'];
  node: Workspace;
};

export type WorkspaceEmailDomainSettings = {
  __typename?: 'WorkspaceEmailDomainSettings';
  dkimDnsRecord: DnsRecord;
  domainName: Scalars['String'];
  inboundForwardingEmail: Scalars['String'];
  isDomainConfigured: Scalars['Boolean'];
  isForwardingConfigured: Scalars['Boolean'];
  returnPathDnsRecord: DnsRecord;
  supportEmailAddress: Scalars['String'];
};

export type WorkspaceEmailSettings = {
  __typename?: 'WorkspaceEmailSettings';
  isEnabled: Scalars['Boolean'];
  workspaceEmailDomainSettings?: Maybe<WorkspaceEmailDomainSettings>;
};

export type WorkspaceInvite = {
  __typename?: 'WorkspaceInvite';
  /** When the invite was created */
  createdAt: DateTime;
  /** Who sent this invite */
  createdBy: InternalActor;
  /** The email that is being invited */
  email: Scalars['String'];
  id: Scalars['ID'];
  /** Whether the person has accepted the invite */
  isAccepted: Scalars['Boolean'];
  /** The roles that the invite will assign on workspace joining */
  roles: Array<Role>;
  /** When the invite was updated */
  updatedAt: DateTime;
  /** Who updated this invite */
  updatedBy: InternalActor;
  /** The workspace they are being invited to */
  workspace: Workspace;
};

export type WorkspaceInviteConnection = {
  __typename?: 'WorkspaceInviteConnection';
  edges: Array<WorkspaceInviteEdge>;
  pageInfo: PageInfo;
};

export type WorkspaceInviteEdge = {
  __typename?: 'WorkspaceInviteEdge';
  cursor: Scalars['String'];
  node: WorkspaceInvite;
};

export type WorkspaceSlackInstallationInfo = {
  __typename?: 'WorkspaceSlackInstallationInfo';
  installationUrl: Scalars['String'];
};

export type WorkspaceSlackIntegration = {
  __typename?: 'WorkspaceSlackIntegration';
  createdAt: DateTime;
  createdBy: InternalActor;
  integrationId: Scalars['ID'];
  isReinstallRequired: Scalars['Boolean'];
  slackChannelName: Scalars['String'];
  slackTeamName: Scalars['String'];
  updatedAt: DateTime;
  updatedBy: InternalActor;
};

export type WorkspaceSlackIntegrationConnection = {
  __typename?: 'WorkspaceSlackIntegrationConnection';
  edges: Array<WorkspaceSlackIntegrationEdge>;
  pageInfo: PageInfo;
};

export type WorkspaceSlackIntegrationEdge = {
  __typename?: 'WorkspaceSlackIntegrationEdge';
  cursor: Scalars['String'];
  node: WorkspaceSlackIntegration;
};

export type ChangeCustomerStatusMutationVariables = Exact<{
  customerId: Scalars['ID'];
  status: CustomerStatus;
}>;


export type ChangeCustomerStatusMutation = { __typename?: 'Mutation', changeCustomerStatusAsync: { __typename?: 'ChangeCustomerStatusAsyncOutput', error?: { __typename?: 'MutationError', message: string } | null } };

export type UpsertCustomTimelineEntryMutationVariables = Exact<{
  input: UpsertCustomTimelineEntryInput;
}>;


export type UpsertCustomTimelineEntryMutation = { __typename?: 'Mutation', upsertCustomTimelineEntry: { __typename?: 'UpsertCustomTimelineEntryOutput', result?: UpsertResult | null, timelineEntry?: { __typename?: 'TimelineEntry', id: string, customerId: string, timestamp: { __typename?: 'DateTime', iso8601: string }, entry: { __typename?: 'ChatEntry' } | { __typename?: 'CustomEntry', title: string, components: Array<{ __typename: 'ComponentDivider', spacingSize?: ComponentDividerSpacingSize | null } | { __typename: 'ComponentLinkButton', url: string, label: string } | { __typename: 'ComponentSpacer', spacerSize: ComponentSpacerSize } | { __typename: 'ComponentText', text: string, textSize?: ComponentTextSize | null, textColor?: ComponentTextColor | null }> } | { __typename?: 'CustomerAssignmentTransitionedEntry' } | { __typename?: 'CustomerStatusTransitionedEntry' } | { __typename?: 'EmailEntry' } | { __typename?: 'IssueDeletedEntry' } | { __typename?: 'IssueIssueTypeChangedEntry' } | { __typename?: 'IssueStatusTransitionedEntry' } | { __typename?: 'NoteEntry' }, actor: { __typename?: 'CustomerActor' } | { __typename?: 'MachineUserActor', machineUser: { __typename?: 'MachineUser', id: string, fullName: string, publicName: string } } | { __typename?: 'SystemActor' } | { __typename?: 'UserActor' } } | null, error?: { __typename?: 'MutationError', message: string, type: MutationErrorType, code: string, fields: Array<{ __typename?: 'MutationFieldError', field: string, message: string, type: MutationFieldErrorType }> } | null } };

export type UpsertCustomerMutationVariables = Exact<{
  input: UpsertCustomerInput;
}>;


export type UpsertCustomerMutation = { __typename?: 'Mutation', upsertCustomer: { __typename?: 'UpsertCustomerOutput', result?: UpsertResult | null, customer?: { __typename?: 'Customer', id: string, externalId?: string | null, shortName?: string | null, fullName: string, status: CustomerStatus, email: { __typename?: 'EmailAddress', email: string, isVerified: boolean } } | null, error?: { __typename?: 'MutationError', message: string, type: MutationErrorType, code: string, fields: Array<{ __typename?: 'MutationFieldError', field: string, message: string, type: MutationFieldErrorType }> } | null } };


export const ChangeCustomerStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changeCustomerStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerStatus"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeCustomerStatusAsync"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ChangeCustomerStatusMutation, ChangeCustomerStatusMutationVariables>;
export const UpsertCustomTimelineEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertCustomTimelineEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertCustomTimelineEntryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertCustomTimelineEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"timelineEntry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iso8601"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"textSize"}},{"kind":"Field","name":{"kind":"Name","value":"textColor"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentSpacer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"spacerSize"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentDivider"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"spacingSize"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentLinkButton"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"actor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MachineUserActor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"machineUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"publicName"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpsertCustomTimelineEntryMutation, UpsertCustomTimelineEntryMutationVariables>;
export const UpsertCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertCustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpsertCustomerMutation, UpsertCustomerMutationVariables>;