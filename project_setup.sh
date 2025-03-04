#!/bin/bash

# Script para configurar a estrutura do projeto BarberMatch

echo "==== BarberMatch - Configuração do Projeto ===="
echo ""

# Criar estrutura de pastas para autenticação
mkdir -p src/pages/auth
touch src/pages/auth/Login.tsx
touch src/pages/auth/Register.tsx
touch src/pages/auth/ForgotPassword.tsx
touch src/pages/auth/ResetPassword.tsx

# Criar estrutura de pastas para área do cliente
mkdir -p src/pages/client
touch src/pages/client/Dashboard.tsx
touch src/pages/client/Profile.tsx
touch src/pages/client/Appointments.tsx
touch src/pages/client/VirtualTryOn.tsx
touch src/pages/client/FindBarbers.tsx
touch src/pages/client/BarberProfile.tsx
touch src/pages/client/Booking.tsx

# Criar estrutura de pastas para área administrativa
mkdir -p src/pages/admin
touch src/pages/admin/Dashboard.tsx
touch src/pages/admin/Users.tsx
touch src/pages/admin/Barbers.tsx
touch src/pages/admin/Reports.tsx
touch src/pages/admin/Settings.tsx
touch src/pages/admin/Financial.tsx

# Criar estrutura de pastas para layouts
mkdir -p src/layouts
touch src/layouts/ClientLayout.tsx
touch src/layouts/BarberLayout.tsx
touch src/layouts/AdminLayout.tsx

# Criar estrutura para componentes compartilhados
mkdir -p src/components/shared
touch src/components/PrivateRoute.tsx

# Criar estrutura para as APIs
mkdir -p src/api
touch src/api/index.ts
touch src/api/auth.ts
touch src/api/client.ts
touch src/api/barber.ts
touch src/api/admin.ts

# Criar estrutura para tipos e interfaces
mkdir -p src/types
touch src/types/auth.ts
touch src/types/client.ts
touch src/types/barber.ts
touch src/types/admin.ts
touch src/types/common.ts

# Criar estrutura para utilitários
mkdir -p src/utils
touch src/utils/date.ts
touch src/utils/format.ts
touch src/utils/validation.ts
touch src/utils/storage.ts

# Criar estrutura para hooks personalizados
mkdir -p src/hooks
touch src/hooks/useAuth.ts
touch src/hooks/useForm.ts
touch src/hooks/useToast.ts

echo "✅ Estrutura básica de pastas e arquivos criada com sucesso!" 