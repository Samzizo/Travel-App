function checkUrl(inputUrl){
   
    const regex = /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
  
    return regex.test(inputUrl);
}

export { checkUrl };