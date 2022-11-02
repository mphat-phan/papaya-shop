import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const MessengerChat = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: window ? window : undefined,
    threshold: 150,
  });

  return (
    // trigger && (
    //   <MessengerCustomerChat
    //     pageId='116093864422666'
    //     appId='318297003748360'
    //     themeColor='#F50057'
    //   />
    // )
    <></>
  );
};

export default MessengerChat;
