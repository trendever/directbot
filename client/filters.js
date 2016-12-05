export const curency_spaces = value => {
  return (value + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

export const caption_spaces = (val) => {
  return val.replace(/\r\n\r\n/g,"<br/><br/>");
}

