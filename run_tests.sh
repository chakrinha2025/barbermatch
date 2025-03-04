#!/bin/bash

# Script para executar e testar o BarberMatch

echo "==== BarberMatch - Ambiente de Testes ===="
echo ""

# Verifica se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale-o primeiro."
    exit 1
fi

# Verifica se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    
    if [ $? -ne 0 ]; then
        echo "❌ Falha ao instalar dependências."
        exit 1
    fi
fi

# Menu de opções
echo "Selecione uma opção:"
echo "1. Executar servidor de desenvolvimento"
echo "2. Verificar erros de lint"
echo "3. Iniciar testes automatizados (quando disponíveis)"
echo "4. Testar todas as páginas do barbeiro na bancada de testes"
echo "5. Abrir página específica para teste"
echo "6. Sair"

read -p "Opção: " option

case $option in
    1)
        echo "🚀 Iniciando servidor de desenvolvimento..."
        echo "Acesse http://localhost:5173/test-bench para usar a bancada de testes"
        npm run dev
        ;;
    2)
        echo "🔍 Verificando erros de lint..."
        npm run lint
        ;;
    3)
        echo "🧪 Esta opção ainda não está disponível. Testes automatizados serão implementados em uma versão futura."
        ;;
    4)
        echo "🚀 Iniciando servidor de desenvolvimento..."
        echo "Abrindo a bancada de testes..."
        npm run dev & 
        sleep 5
        xdg-open http://localhost:5173/test-bench 2>/dev/null || open http://localhost:5173/test-bench 2>/dev/null || start http://localhost:5173/test-bench
        ;;
    5)
        echo "Selecione uma página para testar:"
        echo "a. Dashboard"
        echo "b. Agendamentos"
        echo "c. Serviços"
        echo "d. Clientes"
        echo "e. Estatísticas"
        echo "f. Perfil"
        echo "g. Configurações"
        
        read -p "Página: " page
        
        case $page in
            a)
                component="dashboard"
                ;;
            b)
                component="appointments"
                ;;
            c)
                component="services"
                ;;
            d)
                component="clients"
                ;;
            e)
                component="statistics"
                ;;
            f)
                component="profile"
                ;;
            g)
                component="settings"
                ;;
            *)
                echo "❌ Opção inválida."
                exit 1
                ;;
        esac
        
        echo "🚀 Iniciando servidor de desenvolvimento..."
        echo "Abrindo a página específica para teste..."
        npm run dev &
        sleep 5
        xdg-open "http://localhost:5173/test-bench?component=$component" 2>/dev/null || open "http://localhost:5173/test-bench?component=$component" 2>/dev/null || start "http://localhost:5173/test-bench?component=$component"
        ;;
    6)
        echo "👋 Saindo..."
        exit 0
        ;;
    *)
        echo "❌ Opção inválida."
        exit 1
        ;;
esac

echo "✅ Concluído!" 