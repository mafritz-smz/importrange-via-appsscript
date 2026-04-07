function onChangeTrigger(e) {
  atualizarTabela();
}

/*********************************
 * ATUALIZAÇÃO DA ABA *
 *********************************/
function atualizarTabela() {
  try {
    // Destino
    var ssDestino = SpreadsheetApp.getActiveSpreadsheet();
    var abaDestino = ssDestino.getSheetByName('NOME DA ABA DA PLANILHA DESTINO');
    if (!abaDestino) return;

    // Origem
    var urlOrigem = 'URL DA PLANILHA ORIGEM';
    var ssOrigem = SpreadsheetApp.openByUrl(urlOrigem);
    var abaOrigem = ssOrigem.getSheetByName('NOME DA ABA DA PLANILHA ORIGEM');
    if (!abaOrigem) return;

    var ultimaLinha = abaOrigem.getLastRow();
    if (ultimaLinha < 2) {
      limparDestino_(abaDestino);
      return;
    }

    var qtdLinhas = ultimaLinha - 1;

    // Leituras (AQUI É ONDE FICAM AS COLUNAS QUE SERÃO PUXADAS PARA A PLANILHA DESTINO)
    var valoresCDEF = abaOrigem.getRange(2, 3, qtdLinhas, 4).getValues(); // C:F
    var valoresL = abaOrigem.getRange(2, 12, qtdLinhas, 1).getValues();   // L
    var valoresR = abaOrigem.getRange(2, 18, qtdLinhas, 1).getValues();   // R
    var valoresA = abaOrigem.getRange(2, 1, qtdLinhas, 1).getValues();    // A
    var valoresM = abaOrigem.getRange(2, 13, qtdLinhas, 1).getValues();   // M

    var dadosFormatados = [];

    for (var i = 0; i < qtdLinhas; i++) {
      var linhaCDEF = valoresCDEF[i];
      var linhaL = valoresL[i][0];
      var linhaR = valoresR[i][0];
      var linhaA = valoresA[i][0];
      var linhaM = valoresM[i][0];

      // Ajuste de data (evita -1 dia) (CASO HAJA COLUNA COM DATAS ESSE AQUI É UM CONVERSOR)
      if (linhaA instanceof Date) {
        linhaA.setHours(12, 0, 0, 0);
      }

      var vazia = (
        !linhaCDEF[0] &&
        !linhaCDEF[1] &&
        !linhaCDEF[2] &&
        !linhaCDEF[3] &&
        !linhaL &&
        !linhaR
      );
      if (vazia) continue;

      dadosFormatados.push([
        linhaCDEF[0], // A
        linhaCDEF[1], // B
        linhaCDEF[2], // C
        linhaCDEF[3], // D
        linhaL,       // E
        linhaR,       // F
        linhaA,       // G
        linhaM        // H
      ]);
    }

    //  A PARTIR DAQUI, FORA DO LOOP 
    limparDestino_(abaDestino);

    if (dadosFormatados.length === 0) return;

    garantirLinhas_(abaDestino, dadosFormatados.length + 1);

    abaDestino
      .getRange(2, 1, dadosFormatados.length, 8)
      .setValues(dadosFormatados);

  } catch (e) {
    console.error('Erro ao atualizar tabela:', e);
  }
}

/*****************************************
 * Funções auxiliares
 *****************************************/
function limparDestino_(abaDestino) {
  var lastRow = abaDestino.getLastRow();
  if (lastRow >= 2) {
    abaDestino.getRange(2, 1, lastRow - 1, 8).clearContent();
  }
}

function garantirLinhas_(aba, minTotalRows) {
  var maxRows = aba.getMaxRows();
  if (maxRows < minTotalRows) {
    aba.insertRowsAfter(maxRows, minTotalRows - maxRows);
  }
}
