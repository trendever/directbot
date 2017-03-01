export const searchValue = ( state ) => state.value;

export const tags = ( state ) => {

  return state.selected.concat( state.tags );

};

export const selectedTagsId = ( state ) => {

  return tags(state).filter( ( { active } ) => {

    if ( active ) {

      return true;

    }

  } ).map( ( { id } ) => {

    return id;

  } );

};

export const selectedCount = ( state ) => {

  let count = 0;

  tags(state).forEach( ( { active } ) => {

    if ( active ) {

      count++;

    }

  } );

  return count;

};

export const getPendingStatus = ( state ) => {

  return state.pending;

};
