# Sistema de Gestão de Licenciamento

Sistema web completo para gestão de licenciamentos de software com alertas automáticos de expiração.

## 🚀 Funcionalidades

- **Dashboard Interativo**: Visualização de estatísticas em tempo real
- **Gestão de Licenças**: CRUD completo de licenciamentos
- **Sistema de Alertas**: Notificações automáticas antes da expiração
- **Importação/Exportação**: Suporte para Excel/CSV
- **Relatórios**: Analytics e visualizações de dados
- **Multi-usuário**: Sistema de permissões (Admin/Editor/Viewer)

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilização**: Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API Routes, Supabase
- **Autenticação**: NextAuth.js
- **Deploy**: Vercel

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Joak81/licenciamento-app.git
cd licenciamento-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (.env.local):
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# NextAuth
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your_database_url
```

4. Execute o projeto:
```bash
npm run dev
```

## 🗄️ Configuração do Banco de Dados

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute o schema SQL localizado em `src/lib/supabase/schema.sql`
3. Configure as políticas de RLS conforme necessário

## 🚀 Deploy no Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Joak81/licenciamento-app)

### Deploy Manual:

1. Instale a Vercel CLI:
```bash
npm i -g vercel
```

2. Faça login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Configure as variáveis de ambiente no painel do Vercel:
   - Vá para Settings > Environment Variables
   - Adicione todas as variáveis do .env.local

## 📊 Estrutura do Projeto

```
licenciamento-app/
├── src/
│   ├── app/              # App Router pages
│   ├── components/        # Componentes React
│   │   └── ui/           # Componentes UI base
│   ├── lib/              # Utilitários e configurações
│   │   └── supabase/     # Schema e cliente Supabase
│   └── types/            # TypeScript types
├── public/               # Arquivos públicos
└── package.json          # Dependências
```

## 🔒 Segurança

- Autenticação via NextAuth.js
- Row Level Security (RLS) no Supabase
- Validação de dados com Zod
- Sanitização de inputs
- HTTPS em produção

## 📝 Licença

MIT

## 👤 Autor

- GitHub: [@Joak81](https://github.com/Joak81)

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests.
