export const curency_spaces = value => {

    return (value + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

};

