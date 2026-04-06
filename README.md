#Automação de Importação de Dados com Google Apps Script

## 📌 Sobre o projeto

Este projeto automatiza a transferência de dados entre planilhas no Google Sheets, substituindo o uso de fórmulas como `IMPORTRANGE` por uma solução mais performática e controlada via script.

A automação realiza a atualização dos dados de forma programada, garantindo maior confiabilidade, performance e escalabilidade.

---

## ⚙️ Tecnologias utilizadas

* Google Apps Script
* Google Sheets

---

## 🚀 Funcionalidades

* Importação automática de dados entre planilhas
* Atualização programada via trigger diário
* Tratamento de erros durante execução
* Redução de dependência de fórmulas pesadas

---

## 🧠 Problema resolvido

O uso excessivo de `IMPORTRANGE` pode causar:

* Lentidão nas planilhas;
* Falhas de carregamento;
* Limitação de escalabilidade;
* Famoso "Erro interno no intervalo de importação".

Este script resolve esses problemas ao consolidar os dados diretamente via backend.

---

## ▶️ Como usar

### 1. Configurar o script

* Acesse o editor de Apps Script
* Cole o código do arquivo `(nome do seu script).gs`

### 2. Atualizar os IDs das planilhas

Substitua pelos IDs das suas planilhas:

* Planilha de origem + nome da aba
* Planilha de destino + nome da aba

---

### 3. Criar trigger automático

1. No Apps Script, vá em **Relógio (Acionadores)**
2. Clique em **"Adicionar acionador"**
3. Configure:

   * Função: `suaFuncao`
   * Origem do evento: Baseado no tempo
   * Tipo de acionador: Contador de dias
   * Hora do dia: "Definir conforme necessidade"

---

## 📸 Acionador configurado
![Trigger configurado](images/acionador-configurado.png)

## 📸 Funcionabilidade do Script
![Funcionabilidade do Script](images/funcionabilidade-script.png)

---

## 💡 Melhorias futuras

* Log de execução
* Notificação por e-mail em caso de erro
* Interface para configuração

---

## 👨‍💻 Autor

Mateus Schmitz
