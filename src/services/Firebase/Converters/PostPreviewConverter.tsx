import { DocumentData } from 'firebase/firestore';
import { IpostPreview } from '../../../types/types';

// Firestore data converter
export const postPreviewConverter = {
  // not used
  toFirestore: (post: IpostPreview): DocumentData => {
    // Note, we don't simply return post because post contains id field which
    // we do not wish DocumentData to contain.
    return {
      postType: post.postType,
      accessId: post.accessId,
      accessByTokenCollection: post.accessByTokenCollection,
      minimumAccessBalance: post.minimumAccessBalance,
      authorUserId: post.authorUserId,
      authorUserName: post.authorUserName,
      authorPublicKey: post.authorPublicKey,
      authorProfileImageUrl: post.authorProfileImageUrl,
      title: post.title,
      category: post.category,
      creationDate: post.creationDate,
      upVoteUserIds: post.upVoteUserIds,
      downVoteUserIds: post.downVoteUserIds,
      numberOfComments: post.numberOfComments,
    };
  },
  fromFirestore: (snapshot: DocumentData): IpostPreview => {
    // Note, we don't simply return data because IpostData requires id field
    // which is missing from snapshot data.
    const data = snapshot.data();
    return {
      id: snapshot.id,
      postType: data.postType,
      accessId: data.accessId,
      accessByTokenCollection: data.accessByTokenCollection,
      minimumAccessBalance: data.minimumAccessBalance,
      authorUserId: data.authorUserId,
      authorUserName: data.authorUserName,
      authorPublicKey: data.authorPublicKey,
      authorProfileImageUrl: data.authorProfileImageUrl,
      title: data.title,
      category: data.category,
      creationDate: data.creationDate,
      upVoteUserIds: data.upVoteUserIds,
      downVoteUserIds: data.downVoteUserIds,
      numberOfComments: data.numberOfComments,
    } as IpostPreview;
  },
};
