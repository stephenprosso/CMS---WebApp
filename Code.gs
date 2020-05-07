function onOpen() {
  SpreadsheetApp.getUi().createMenu('Adv').addItem('Tester', 'popup').addToUi();
}

function popup() {
  var holder = '';
  var ui = SpreadsheetApp.getUi()
  var response = ui.alert('Hola El Mundo', ui.ButtonSet.YES_NO);
  if(response ==ui.Button.YES) {
    holder = "You got it!";
  } else {
    holder = "NO!";
  }
   var htmlOutput = HtmlService.createHtmlOutput(holder).setTitle('Your response');
   ui.showSidebar(htmlOutput);
}
