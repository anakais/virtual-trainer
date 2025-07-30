# 💪 Virtual Personal Trainer

Uma aplicação web moderna para acompanhamento de treinos, desenvolvida com **Nuxt 4** e **Tailwind CSS**.

## ✨ Funcionalidades

### 🏋️‍♂️ Treinos Personalizados

- **Treino Superior**: Pull-ups, Australian Pull-ups, Bíceps, Push-ups, Shoulders
- **Treino Inferior**: Squats, Flexor, Extensor, Calves, Abs
- **3 séries por exercício** com repetições configuráveis
- **Dicas técnicas** para cada exercício

### 📊 Sistema de Acompanhamento

- **Salvamento automático** do progresso
- **Histórico organizado por dia**
- **Estatísticas detalhadas** (séries concluídas, taxa de conclusão)
- **Edição e exclusão** de treinos individuais

### 🎨 Interface Moderna

- **Design responsivo** para desktop e mobile
- **Gradientes atrativos** e animações suaves
- **Navegação intuitiva** entre páginas
- **Feedback visual** em tempo real

## 🚀 Tecnologias Utilizadas

- **Nuxt 4** - Framework Vue.js para SSR
- **Tailwind CSS** - Framework CSS utilitário
- **Vue 3** - Framework JavaScript reativo
- **localStorage** - Persistência de dados no navegador

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/virtual-trainer.git
cd virtual-trainer
```

2. **Instale as dependências**

```bash
pnpm install
# ou
npm install
```

3. **Execute em modo desenvolvimento**

```bash
pnpm dev
# ou
npm run dev
```

4. **Acesse a aplicação**

```
http://localhost:3000
```

## 🎯 Como Usar

### 1. Página Inicial

- Escolha entre **Treino Superior** ou **Treino Inferior**
- Acesse o **Histórico** para ver seu progresso

### 2. Durante o Treino

- Configure o número de **repetições** para cada série
- Marque as séries como **concluídas** ao terminar
- O progresso é **salvo automaticamente**

### 3. Histórico

- Visualize treinos **organizados por dia**
- Expanda os detalhes clicando em **"Ver Detalhes"**
- **Edite** ou **apague** treinos individuais
- Acompanhe suas **estatísticas gerais**

## 📁 Estrutura do Projeto

```
virtual-trainer/
├── app.vue                 # Layout principal
├── pages/                  # Páginas da aplicação
│   ├── index.vue          # Página inicial
│   ├── history.vue        # Histórico de treinos
│   └── workout/           # Páginas de treino
│       ├── upper.vue      # Treino superior
│       └── lower.vue      # Treino inferior
├── composables/           # Lógica reutilizável
│   └── useWorkout.js     # Gerenciamento de treinos
├── assets/               # Recursos estáticos
│   └── main.css         # Estilos globais
├── public/              # Arquivos públicos
└── nuxt.config.ts       # Configuração do Nuxt
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview

# Geração estática
pnpm generate
```

## 💾 Persistência de Dados

A aplicação utiliza **localStorage** para salvar:

- Configurações de repetições
- Status de conclusão das séries
- Histórico completo de treinos
- Estatísticas de progresso

**Nota**: Os dados são salvos localmente no navegador e não são sincronizados entre dispositivos.

## 🎨 Personalização

### Cores e Temas

- **Treino Superior**: Gradiente laranja/vermelho
- **Treino Inferior**: Gradiente verde/azul
- **Histórico**: Gradiente roxo/azul

### Exercícios

Os exercícios podem ser facilmente modificados editando os arrays em:

- `pages/workout/upper.vue` (treino superior)
- `pages/workout/lower.vue` (treino inferior)

## 🤝 Contribuindo

1. Faça um **fork** do projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- **Nuxt Team** pelo framework incrível
- **Tailwind CSS** pelos estilos utilitários
- **Vue.js** pela reatividade e componentes

---

**Desenvolvido com ❤️ para ajudar você a alcançar seus objetivos fitness!** 🏋️‍♂️💪
