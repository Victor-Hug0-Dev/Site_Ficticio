

## 🚀 INICIALIZAÇÃO DO PROJETO SHOPFLOW DEVOPS

Este repositório centraliza a infraestrutura, CI/CD e orquestração dos repositórios do projeto Shopflow.

Ele utiliza **submódulos Git** para integrar os projetos de backend e frontend.

---

📦 SUBMÓDULOS INCLUÍDOS:

- backend/shopflow-backend
- frontend/shopflow-frontend

---

✅ COMO CLONAR O PROJETO COM TODOS OS SUBMÓDULOS

1. Clone o repositório principal:

```bash
git clone --recurse-submodules https://gitlab.grauea.com.br/shopflow/shopflow-devops.git
```

2. Acesse o diretório clonado:

```bash
cd shopflow-devops
```

3. (Opcional) Se você já clonou o repositório SEM os submódulos, execute:

```bash
git submodule update --init --recursive
```

---

🛠 COMO ADICIONAR SUBMÓDULOS (APENAS UMA VEZ POR PROJETO)

> Use isso apenas se estiver configurando o projeto pela primeira vez ou adicionando novos submódulos.

1. Adicionar os submódulos manualmente:

```
git submodule add http://gitlab.grauea.com.br/shopflow/backend/shopflow-backend.git shopflow-backend
git submodule add http://gitlab.grauea.com.br/shopflow/frontend/shopflow-frontend.git shopflow-frontend
```

2. Fazer o commit e subir para o GitLab:

```
git commit -m "Adiciona submódulos shopflow-backend e shopflow-frontend"
git push origin main
```

---

🔁 ATUALIZANDO OS SUBMÓDULOS POSTERIORMENTE

Se os projetos `shopflow-backend` ou `shopflow-frontend` forem atualizados por outras pessoas, atualize-os com:

```
git submodule update --remote --merge
```
---

📌 OBSERVAÇÕES

- Sempre confirme se os submódulos estão atualizados antes de subir alterações.
- Evite fazer commits diretamente dentro das pastas de submódulo pelo repositório pai.

---


## 👥 COMO CLONAR O PROJETO SHOPFLOW DEVOPS (TIME)


Este repositório é o núcleo de DevOps do projeto Shopflow, e já está configurado com os submódulos de backend e frontend.

---

✅ COMANDO ÚNICO PARA CLONAR TUDO (com submódulos)

Execute:

```
git clone --recurse-submodules http://gitlab.grauea.com.br/shopflow/shopflow-devops.git
```

Ou, se já tiver clonado sem o `--recurse-submodules`, execute:

```
cd shopflow-devops
git submodule update --init --recursive
```

---

🔁 PARA ATUALIZAR OS SUBMÓDULOS MAIS TARDE

```
git submodule update --remote --merge
```

---

📌 NOTAS IMPORTANTES

- Os diretórios `shopflow-backend` e `shopflow-frontend` são repositórios separados.
- Para fazer alterações, entre nas pastas e use os comandos Git normalmente (commit, push, etc).


## 🛠️ COMO RODAR O PROJETO LOCALMENTE (MINICONDA + DJANGO)

Este projeto Django utiliza MariaDB como banco de dados principal e MongoDB como banco secundário. Abaixo está o passo a passo para executar o backend localmente utilizando um ambiente Conda chamado `shopflow`.


## ✅ Pré-requisitos

- Python 3.12+
- [Miniconda](https://docs.conda.io/en/latest/miniconda.html) instalado
- Ambiente Conda criado com o nome `shopflow`
- MySQL/MariaDB (pode ser local ou via Docker)

---

## ⚙️ Passo a Passo

### 1. Ativar o ambiente Conda

```
conda activate shopflow
````

---

### 2. Clonar o repositório e acessar a pasta do backend

```bash
git clone <URL_DO_REPOSITORIO>
cd shopflow-devops
```

---

### 3. Verificar o arquivo `.env.development`

Certifique-se de que o arquivo `.env.development` exista no caminho:

```
shopflow-devops/shopflow-backend/.env.development
```

Caso não exista, crie com base no exemplo:

```bash
cp shopflow-backend/.env.example shopflow-backend/.env.development
```

Exemplo de conteúdo mínimo necessário:

```env
DB_NAME=shopflow
DB_USER=shopflow_user
DB_PASSWORD=graest
DB_HOST=localhost  # ou 'mariadb' se estiver usando Docker
DB_PORT=3306

MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=mongodb
MONGO_USER=root
MONGO_PASS=graest
```

---

### 4. Instalar as dependências Python

```bash
pip install -r shopflow-backend/requirements.txt
```

---

### 5. Rodar o servidor Django

```bash
python shopflow-backend/manage.py runserver 0.0.0.0:8000
```

Ou, se preferir rodar apenas para acesso local:

```bash
python shopflow-backend/manage.py runserver
```

---

### 6. Acessar no navegador

* Localhost: [http://localhost:8000](http://localhost:8000)
* Em outra máquina da rede: `http://<IP-da-sua-máquina>:8000`

---

## 🐳 (Opcional) Usar Docker para os bancos de dados

Caso deseje usar Docker para o MariaDB e MongoDB:

```bash
docker-compose up -d
```

Certifique-se de que os containers `mariadb` e `mongodb` estejam rodando corretamente.

---

## ✅ Pronto!

Seu backend Django estará rodando localmente no ambiente Conda `shopflow` e conectado ao banco de dados.
