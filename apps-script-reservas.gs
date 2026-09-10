// ============================================================
// APPS SCRIPT — Pousada Constelação
// Este código faz a ponte entre o site e a planilha do Google Sheets.
// Instruções completas de instalação estão no README.md
// ============================================================

// Troque por uma chave secreta sua, difícil de adivinhar.
// É ela que protege o painel de admin contra acesso indevido.
var ADMIN_KEY = 'Admin';

var SHEET_NAME = 'Reservas';
var SPREADSHEET_ID = '1MTmXeWpegG0NSMNXrPpuyspOyowwmVDxfUXEVdJBpJY';

// Recebe uma nova reserva do formulário do site e grava na planilha
function doPost(e) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.guest_name || '',
    data.guest_contact || '',
    data.check_in || '',
    data.check_out || '',
    data.guests || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Devolve a lista de reservas para o painel de admin (protegido por chave)
function doGet(e) {
  var key = e.parameter.key;
  if (key !== ADMIN_KEY) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'chave inválida' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var values = sheet.getDataRange().getValues();
  var headers = values.shift();

  var result = values.map(function (row) {
    var obj = {};
    headers.forEach(function (h, i) {
      var v = row[i];
      if (v instanceof Date) v = v.toISOString();
      obj[h] = v;
    });
    return obj;
  }).reverse(); // mais recentes primeiro

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
