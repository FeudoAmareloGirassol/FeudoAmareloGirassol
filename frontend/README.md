# Frontend do projeto

## Como rodar o projeto no Windows

* Para iniciar é preciso ter o Node instalado na máquina

Você pode fazer o download por esse link https://nodejs.org/en/

* Após isso é preciso instalar o Angular no computador.

Para instala-lo é só usar o comando **angular npm install -g @angular/cli**

## Considerações importantes
* Versão do node utilizada: v16.13.2
* Versão do angular: Angular CLI: 13.2.1

# ❗ AVISO ❗
* O .gitignore está ignorando o `node_modules` por ser muito grande, então ao tentar rodar o servidor do Angular `ng serve -o`, não irá funcionar.
* Para instalar o Build do Angular, no arquivo onde está o projeto do Angular, use o seguinte código: `npm install --save-dev @angular-devkit/build-angular`
* Este irá instalar todas as dependências necessárias do **Node** e o Angular voltará a funcionar.
