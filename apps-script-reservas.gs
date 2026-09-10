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

// Colunas da planilha, nesta ordem exata na linha 1:
// id | created_at | guest_name | guest_contact | check_in | check_out | guests | status

function getSheet_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
}

// ---------------------------------------------------------------
// POST: usado tanto para criar uma reserva nova (site público)
// quanto para o admin confirmar/cancelar uma reserva existente.
// ---------------------------------------------------------------
function doPost(e) {
  var sheet = getSheet_();
  var data = JSON.parse(e.postData.contents);

  // Ação de administrador: mudar o status de uma reserva já existente
  if (data.action === 'update_status') {
    if (data.key !== ADMIN_KEY) {
      return jsonOutput_({ error: 'chave inválida' });
    }
    var values = sheet.getDataRange().getValues();
    for (var i = 1; i < values.length; i++) {
      if (String(values[i][0]) === String(data.id)) {
        sheet.getRange(i + 1, 8).setValue(data.status); // coluna 8 = status
        return jsonOutput_({ status: 'ok' });
      }
    }
    return jsonOutput_({ error: 'reserva não encontrada' });
  }

  // Ação padrão: nova reserva vinda do formulário do site
  var id = Utilities.getUuid();
  sheet.appendRow([
    id,
    new Date(),
    data.guest_name || '',
    data.guest_contact || '',
    data.check_in || '',
    data.check_out || '',
    data.guests || '',
    'pendente'
  ]);

  return jsonOutput_({ status: 'ok', id: id });
}

// ---------------------------------------------------------------
// GET: duas finalidades diferentes, controladas pelos parâmetros:
//   ?key=ADMIN_KEY            -> lista completa (painel de admin)
//   ?dates=1                  -> só os períodos já confirmados,
//                                sem dados do hóspede (uso público,
//                                para bloquear datas no site)
// ---------------------------------------------------------------
function doGet(e) {
  var sheet = getSheet_();
  var values = sheet.getDataRange().getValues();
  var headers = values.shift();

  var rows = values.map(function (row) {
    var obj = {};
    headers.forEach(function (h, i) {
      var v = row[i];
      if (v instanceof Date) v = v.toISOString();
      obj[h] = v;
    });
    return obj;
  });

  // Uso público: só datas confirmadas, sem nome/contato do hóspede
  if (e.parameter.dates) {
    var busy = rows
      .filter(function (r) { return r.status === 'confirmada'; })
      .map(function (r) { return { check_in: r.check_in, check_out: r.check_out }; });
    return jsonOutput_(busy);
  }

  // Uso administrativo: exige a chave, devolve tudo
  if (e.parameter.key !== ADMIN_KEY) {
    return jsonOutput_({ error: 'chave inválida' });
  }
  return jsonOutput_(rows.reverse()); // mais recentes primeiro
}

function jsonOutput_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
