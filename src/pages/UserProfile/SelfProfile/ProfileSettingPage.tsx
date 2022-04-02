import React, { useState } from 'react';

import UserInfoSetting from '../../../components/SelfProfile/ProfileSettings/UserInfoSetting';
import UserNameSetting from '../../../components/SelfProfile/ProfileSettings/UserNameSetting';

export default function ProfileSettingPage(): JSX.Element {
  // Username seperated because user should
  // not change it often and not by accident
  const [isEditingUserName, setIsEditingUserName] = useState<boolean>(false);

  return (
    <div className="page-frame max-w-5xl pb-8">
      {isEditingUserName ? (
        <UserNameSetting setIsEditingUserName={setIsEditingUserName} />
      ) : (
        <UserInfoSetting setIsEditingUserName={setIsEditingUserName} />
      )}
    </div>
  );
}
