export const isAuth = ( user ) => {

  return user.isAuth;

};

export const isAuthUserSupplier = ( user ) => {

  if (user.all[user.myId].supplier_of !== null) {

    return true;

  }

  return false;

}

export const isDone = ( user ) => {

  return user.done;

};

export const isFake = ( state ) => {
  const userData = user( state );
  let username = userData.name;
  let is_fake = false;
  if (username && username.indexOf("customer_") >= 0){
    is_fake = true;
  }
  return is_fake;
};

export const user = ( user ) => {

  if ( user.all.hasOwnProperty( user.id ) ) {

    return user.all[ user.id ];

  }

  if ( user.all[ user.myId ] ) {

    return user.all[ user.myId ];

  }

  return {instagram_username:"",name:""};
};

export const userShopId =  (state) => {

  let shop = user(state)

  if(shop !== null) {

    return shop.id;

  }

  return null;

}

export const userID = ( state ) => {

  const userData = user( state );

  if ( userData !== null ) {

    return userData.id;

  }

  return null;

};

export const getUserName = ( state ) => {

  const { instagram_username, name } = user( state );

  if ( typeof instagram_username === 'string' ) {
    return instagram_username;
  }

  if ( typeof name === 'string' ) {
    return name;
  }

  return "anonymous";

};

export const getUserPhoto = ( state ) => {

  const { avatar_url } = user( state );

  if ( typeof avatar_url === 'string' ) {
    return avatar_url;
  }

};

export const getUserCaption = ( state ) => {

  const { caption } = user( state );

  if ( typeof caption === 'string' ) {
    return caption;
  }

};

export const getSlogan = ( state ) => {

  const { slogan } = user( state );

  if ( typeof slogan === 'string' ) {
    return slogan;
  }

};

export const getProfile = ( user, id = null ) => {

  if ( id !== null ) {
    if ( user.all.hasOwnProperty( id ) ) {
      return user.all[ id ];
    }
  }
  return null;

};

export const getPhotoConfig = ( user ) => {

  if ( user.photoConfigs.hasOwnProperty( user.id ) ) {

    return user.photoConfigs[ user.id ];

  } else {

    console.warn( `[ GET PHOTO CONFIG FOR PROFILE ] - profile with id: ${user.id}, not found`, user );

  }

  return user.photoConfigs[ user.myId ];

};



export const getMyCurrentList = ( user ) => {

  return user.myCurrentList;

}


export const getTooltips = ( user ) => {

  return user.tooltips;

}

export const getPayment = ( user ) => {

  return user.payment;

}

export const authUserId = ( user ) => {

  return user.myId;

}


export const getAuthUser = ( user ) => {

  return user.all[user.myId];

}


export const getUseDays = ( user ) => {

  return user.useDays;

}

export const supplierStatus = ( user ) => {

  return user.supplierStatus;

}

export const showMenu = ( user ) => {
  return user.showMenu;
}
