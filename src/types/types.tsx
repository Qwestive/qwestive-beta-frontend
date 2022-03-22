import { PublicKey } from '@solana/web3.js';
import { ReactNode, Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';

/* 
  Community types
*/
export interface Icategory {
  name: string;
  count: number;
}

export interface Icommunity {
  cId: string;
  categories: Icategory[];
}

export interface IcommunityTokenInfo {
  name: string | undefined;
  symbol: string | undefined;
  logoUrl: string | undefined;
  address: string | undefined;
}

export interface ItokenOwnedCommunity {
  mint: string;
  amountHeld: number;
  name: string | undefined;
  imageUrl: string | undefined;
  communityData: Icommunity | undefined;
}

/**
 * Token types
 */

export interface InonFungibleToken {
  mint: string;
  imageUrl: string;
}

export interface InonFungibleTokenOwned {
  collectionName: string;
  creatorMints: Array<string>;
  tokensHeld: Array<InonFungibleToken>;
}

export interface IfungibleTokenOwned {
  mint: string;
  name: string | undefined;
  imageUrl: string | undefined;
  amountHeld: number;
}

export interface ItokenOwned {
  fungibleTokens: Array<IfungibleTokenOwned>;
  nonFungibleTokens: Array<InonFungibleTokenOwned>;
}

/* 
  User setting types
*/

export interface IimageCropper {
  setImageEditingModalOpen: Dispatch<SetStateAction<boolean>>;
  image: string;
  setImage: SetterOrUpdater<string | undefined>;
  imageSaver(fileToUpload: File): Promise<string>;
  cropShape: 'rect' | 'round' | undefined;
  successMessage: string;
  cropperLgWidth: number;
  cropperLgHeight: number;
  cropperSmWidth: number;
  cropperSmHeight: number;
  maxZoom: number;
}

export interface IimageEditing {
  setImageEditingModalOpen: Dispatch<SetStateAction<boolean>>;
  image: string;
  setImage: SetterOrUpdater<string | undefined>;
}

export interface IimageEditingModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

/* 
  Auth types
*/

export interface IsignoutWithWallet {
  disconnect: () => Promise<void>;
  connected: boolean;
}

export interface IwalletPropForSignin {
  uid: string;
  publicKey: PublicKey;
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}

export interface ImessageToSign {
  uid: string;
  message: string;
  publicKey: PublicKey;
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}

export interface IsignedMessage {
  uid: string;
  encodedMessage: Uint8Array;
  signature: Uint8Array | undefined;
  publicKeyBytes: Uint8Array | undefined;
}

/* 
  Post types
*/

export type TpostSorting = 'New' | 'Top' | 'Poll' | 'Bounty';

export type TpostType = 'article' | 'poll' | 'bounty' | 'vote';

export const ARTICLE_TYPE: TpostType = 'article';
export const POLL_TYPE: TpostType = 'poll';
export const BOUNTY_TYPE: TpostType = 'bounty';
export const VOTE_TYPE: TpostType = 'vote';

export interface Icategories {
  name: string;
  count: number;
}

/// The preview of a post that is submitted to the DB as a new post for a
/// community.
export interface IpostPreviewSubmission {
  postType: TpostType;
  accessTokenId: string;
  accessMinimumTokenBalance: number;
  authorUserId: string;
  authorUserName: string;
  authorPublicKey: string;
  authorProfileImageUrl: string;
  title: string;
  creationDate: number;
  category: string;
  upVoteUserIds: Array<string>;
  downVoteUserIds: Array<string>;
  numberOfComments: number;
}

/// An article that is submitted to the DB as a new post for a community.
export interface IpostArticleSubmission extends IpostPreviewSubmission {
  content: string;
}

/// A poll that is submitted to the DB as a new post for a community.
export interface IpostPollSubmission extends IpostPreviewSubmission {
  content: string;
  options: Array<IpollOption>;
}

/// A post preview that is retrieved from the DB. It differs from
/// IpostPreviewSubmission in that it has an ID since it was already added
/// to DB.
export interface IpostPreview extends IpostPreviewSubmission {
  id: string;
}

/// An article that is retrieved from the DB. It differs from
/// IpostArticleSubmission in that it has an ID since it was already added
/// to DB.
export interface IpostArticle extends IpostPreview {
  content: string;
}

export interface IpollOption {
  id: string;
  name: string;
  voteUserIds: Array<string>;
}

/// A post that is retrieved from the DB. It differs from
/// IpostPollSubmission in that it has an ID since it was already added
/// to DB.
export interface IpostPoll extends IpostPreview {
  content: string;
  options: Array<IpollOption>;
}

export interface IpostData {
  id: string;
  postType: string;
  accessTokenId: string;
  accessMinimumTokenBalance: number;
  authorUserId: string;
  authorUserName: string;
  authorPublicKey: string;
  authorProfileImageUrl: string;
  title: string;
  contents: string;
  creationDate: Date;
  upVoteUserIds: Array<string>;
  downVoteUserIds: Array<string>;
  numberOfComments: number;
}

/// A comment that is submitted to the DB as a new comment for a post.
export interface IpostCommentSubmission {
  postId: string;
  depth: number;
  parentCommentId: string;
  authorUserId: string;
  authorUserName: string;
  authorPublicKey: string;
  authorProfileImageUrl: string;
  body: string;
  upVoteUserIds: Array<string>;
  downVoteUserIds: Array<string>;
}

/// A comment that is submitted to the DB as a new comment for a post. It
///  differs from IpostCommentSubmission in that it has an ID since it was
/// already added to DB.
export interface IpostComment extends IpostCommentSubmission {
  id: string;
}
