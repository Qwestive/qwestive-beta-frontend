import { TokenInfoMap } from '@solana/spl-token-registry';
import ReadTokenWallet from './ReadTokenWallet';

import { ItokenOwned } from '../../../types';
import { getCommunityInfo } from '../../Firebase/GetData/CommunityUtil';
import defaultUserProfileImage from '../../../../assets/defaultUserProfileImage.png';

/* TODO:
Once you get the community db design 
Fetch the community member count
*/
export default async function GenerateTokenOwnedList(
  tokenRegistry: TokenInfoMap,
  publicKey: string
): Promise<ItokenOwned[]> {
  const tokenOwned = await ReadTokenWallet(publicKey);
  const tokenOwnedList = new Array<ItokenOwned>();

  const getCommunityThreads = [];
  for (let i = 0; i < tokenOwned.length; i += 1) {
    getCommunityThreads.push(getCommunityInfo(tokenOwned[i].mint));
  }
  const communitiesData = await Promise.all(getCommunityThreads);
  for (let i = 0; i < tokenOwned.length; i += 1) {
    const tokenInfos = tokenRegistry.get(tokenOwned[i].mint);

    if (tokenInfos !== undefined) {
      tokenOwnedList.unshift({
        mint: tokenOwned[i].mint,
        name: tokenInfos.symbol,
        amountHeld: tokenOwned[i].uiAmount,
        imageUrl: tokenInfos.logoURI,
        communityData: communitiesData[i],
      });
    } else {
      tokenOwnedList.push({
        mint: tokenOwned[i].mint,
        name: 'Unknown',
        amountHeld: tokenOwned[i].uiAmount,
        imageUrl: defaultUserProfileImage,
        communityData: communitiesData[i],
      });
    }
  }

  return tokenOwnedList;
}
