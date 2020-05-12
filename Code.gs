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
    if(sheetName != 'Access' && sheetName != 'Home'){
     holderArray.push(sheetName);
    }
   }
  htmlTemplate.data = {
    content: holderArray,
    home: findDataHome()
  }
  var html = htmlTemplate.evaluate().setHeight(600).setWidth(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'My Portal');
}
 
function findName(e) {
    var ss = SpreadsheetApp.openById('1oS0J7f7QdwSLXBRpT8xm7U3y6uR7yxDKCZQfBLuN40U');
    var sheet = ss.getSheetByName('Access');
    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
    var response = {
        valid: false,
        access: 0
    }
    for (var x = 0; x < data.length; x++) {
        if (data[x][0] == e) {
            response = {
                valid: true,
                access: data[x][1]
            }
        }
    }
    return response;
}


function eOutput(data) {
  var ss = SpreadsheetApp.openById('1oS0J7f7QdwSLXBRpT8xm7U3y6uR7yxDKCZQfBLuN40U');
  var sheetName = data.project;
  var message = '';
  var success = false;
  var dataout = {};
  var checkmail = findName(data.email);
  
  var sheet = ss.getSheetByName(sheetName);
  
  if (!checkmail.valid) { message = 'Not valid email';}
  if(sheet == null){ message = "Sheet not found!"; } 
  if(message = ''){
    //they might have access
    var lookup = parseInt(sheetName.substr(-1));
    
    if(checkmail['access']=='All'){
       
       message = 'Sheet Found';
       success = true;
       dataout = sheet.getRange(1,1,sheet.getLastRow(),3).getValues();
    
    }
       
  }
  
  var response = {
    success : success,
    message : message,
    data : dataout,
    checkmail : checkmail
  
  }
  
   Logger.log(response);
   return response;
}

function isInArray(array, search) {
    return array.indexOf(search) >= 0;
}

function findDataHome() {
  var ss = SpreadsheetApp.openById('1oS0J7f7QdwSLXBRpT8xm7U3y6uR7yxDKCZQfBLuN40U');
  var sheet = ss.getSheetByName('Home');
  //get rang start in cell 1,1/ get last row will get everything to the last row. / 2 = get 2 columns. get values
  var dataHome = sheet.getRange(1,1,sheet.getLastRow(),2).getValues();
  return dataHome;
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


// **THIS IS A UTILITY/ HELPER FUNCTION TO INCLUDE HTMLJS PAGES IN THE HTML MASTER PAGE.
// **THIS SHOULD REALLY GO IN A NEW FILE CALLED utils.gs
function include(filename) {
//file name is passed to the html service and we get the content of the file
   return HtmlService.createHtmlOutputFromFile(filename).getContent();

}