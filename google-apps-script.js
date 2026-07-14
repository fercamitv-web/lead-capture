// PASSO 1: Crie uma planilha no Google Sheets
// PASSO 2: Vá em Extensoes > Apps Script
// PASSO 3: Cole este codigo e salve
// PASSO 4: Implante > Nova implantacao > Web app
// PASSO 5: Copie a URL e cole no index.html (SCRIPT_URL)

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Cria cabecalhos se estiver vazia
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Nome', 'Email']);
    }

    sheet.appendRow([data.timestamp || new Date().toLocaleString('pt-BR'), data.nome, data.email]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Funcionando!');
}
