function onOpen() {
  SpreadsheetApp.getUi().createMenu('Adv').addItem('Tester', 'popup').addToUi();
}

//**THIS POPUP IS A TESTER TO PREP DATA BEFOR GO LIVE**
function popup() {
  var htmlTemplate = HtmlService.createTemplateFromFile('index');
  var ss = SpreadsheetApp.openById('1oS0J7f7QdwSLXBRpT8xm7U3y6uR7yxDKCZQfBLuN40U');
  var sheets = ss.getSheets();
  var holderArray = [];
  for(var x=0; x< sheets.length; x++){
     var sheetName = sheets[x].getName();
    if(sheetName != 'Access'){
     holderArray.push(sheetName);
    }
   }
  htmlTemplate.data = {
    content: holderArray
  }
  var html = htmlTemplate.evaluate().setHeight(600).setWidth(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'My Portal');
}

 //***COMMENTED OUT THIS CODE BUT KEEPING HERE FOR REFERENCE***
 //function popup() {
 // var holder = '';
 // var ui = SpreadsheetApp.getUi()
 // var response = ui.alert('Hola El Mundo', ui.ButtonSet.YES_NO);
 // if(response ==ui.Button.YES) {
 //   holder = "You got it!";
 // } else {
 //   holder = "NO!";
 // }
 //  var htmlOutput = HtmlService.createHtmlOutput(holder).setTitle('Your response');
 // //this will create a window in the sidebar with your message 
 // ui.showSidebar(htmlOutput);
 //}