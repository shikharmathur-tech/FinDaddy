# FinDaddy

FinDaddy is a salary, tax, budgeting, and payslip-processing project.

## Project structure

- `frontend/` — React + TypeScript + Vite application
- `hackathon_backend/` — FastAPI backend and PDF payslip parser

## Frontend: run locally

Requirements: Node.js (use a current supported LTS version).

```bash
cd frontend
npm install
npm run dev
```

Build the frontend:

```bash
npm run build
```

## Python backend: run locally

Requirements: Python 3.10+ recommended.

```bash
cd hackathon_backend
python -m venv .venv
```

Windows:

```powershell
.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies and start the API:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

API root: `http://127.0.0.1:8000`
Interactive API docs: `http://127.0.0.1:8000/docs`

## Deployment notes

Deploy the frontend and FastAPI backend as separate services unless you deliberately configure a single-server setup. Set the frontend's API base URL to the deployed backend URL wherever API requests are made. Configure secrets only in the hosting provider's environment-variable settings; never commit real `.env` files or API keys.

The backend currently enables permissive CORS (`allow_origins=["*"]`). Before production, restrict allowed origins to the actual deployed frontend domain.

## Important

- Do not commit `node_modules/`, `.venv/`, API keys, passwords, or private payslip data.
- The payslip parser extracts selectable text from PDFs; scanned/image-only PDFs require OCR support.
- Verify tax and financial calculations before relying on them.
