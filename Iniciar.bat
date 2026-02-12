@echo off
title Visualizador 3D - Servidor Local
echo ============================================
echo      Visualizador 3D - Servidor Local
echo ============================================
echo.

REM Descobre o drive do pendrive automaticamente
set CURRENT_DIR=%~dp0
cd /d "%CURRENT_DIR%"

REM Testa se o Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python nao encontrado no sistema.
    echo.
    set /p CHOICE="Deseja instalar Python automaticamente? (S/N): "

    if /I "%CHOICE%"=="S" (
        echo Baixando instalador do Python...
        powershell -Command "Invoke-WebRequest -Uri https://www.python.org/ftp/python/3.12.0/python-3.12.0-amd64.exe -OutFile python_installer.exe"

        echo Iniciando instalacao silenciosa...
        start /wait python_installer.exe /quiet InstallAllUsers=1 PrependPath=1 Include_test=0

        echo Removendo instalador...
        del /f /q python_installer.exe

        echo Verificando instalacao...
        python --version >nul 2>&1
        if %errorlevel% neq 0 (
            echo ERRO: Python nao foi instalado corretamente.
            pause
            exit /b
        )

        echo Python instalado com sucesso!
    ) else (
        echo Instalacao cancelada pelo usuario.
        pause
        exit /b
    )
)

echo Iniciando servidor local...
start "" /min python -m http.server 8000

echo Abrindo pagina no navegador...
start "" http://localhost:8000/index.html

exit

