module.exports = {
  getMonthString: function(){
    switch(new Date().getMonth()+1){
      case 1:
        month = 'janvier';break;
      case 2:
        month = 'fevrier';break;
      case 3:
        month = 'mars';break;
      case 4:
        month = 'avril';break;
      case 5:
        month = 'mai';break;
      case 6:
        month = 'juin';break;
      case 7:
        month = 'juillet';break;
      case 8:
        month = 'aout';break;
      case 9:
        month = 'septembre';break;
      case 10:
        month = 'octobre';break;
      case 11:
        month = 'novembre';break;
      case 12:
        month = 'decembre';break;
    }
    return month;
  }
}
