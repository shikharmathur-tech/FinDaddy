
from fastapi import UploadFile, File, HTTPException, Form
from payslip_parser import extract_payslip_text, extract_payslip_fields


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="FinDaddy API",
    description="Backend for adaptive income allocation and tax planning",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def home():
    return {
        "message": "Welcome to FinDaddy API",
        "project": "FinDaddy",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "FinDaddy Backend",
    }

from pydantic import BaseModel, Field


class BudgetRequest(BaseModel):
    monthly_income: float = Field(gt=0)
    rent: float = Field(default=0, ge=0)
    food: float = Field(default=0, ge=0)
    transport: float = Field(default=0, ge=0)
    utilities: float = Field(default=0, ge=0)
    other_expenses: float = Field(default=0, ge=0)


@app.post("/budget")
def calculate_budget(data: BudgetRequest):
    total_expenses = (
        data.rent
        + data.food
        + data.transport
        + data.utilities
        + data.other_expenses
    )

    remaining = data.monthly_income - total_expenses

    if remaining < 0:
        return {
            "status": "deficit",
            "monthly_income": round(data.monthly_income, 2),
            "total_expenses": round(total_expenses, 2),
            "remaining": round(remaining, 2),
            "message": "Expenses exceed your monthly income."
        }

    return {
        "status": "success",
        "monthly_income": round(data.monthly_income, 2),
        "total_expenses": round(total_expenses, 2),
        "remaining": round(remaining, 2),
        "allocation": {
            "savings": round(remaining * 0.50, 2),
            "investments": round(remaining * 0.30, 2),
            "flexible_spending": round(remaining * 0.20, 2)
        },
        "message": "Budget calculated successfully."
    }

@app.post("/payslip/upload")
async def upload_payslip(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF payslip."
        )

    pdf_bytes = await file.read()

    if not pdf_bytes:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty."
        )

    try:
        text = extract_payslip_text(pdf_bytes)
        print("EXTRACTED PDF xTEXT:", repr(text))
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not read this PDF. Please upload a valid PDF."
        )

    if not text.strip():
        raise HTTPException(
            status_code=422,
            detail="No selectable text found. Scanned PDFs need OCR support."
        )

    fields = extract_payslip_fields(text)

    return {
        "filename": file.filename,
        "extracted_fields": fields,
        "message": (
            "Payslip processed. Please verify the extracted values."
            if fields
            else "PDF read successfully, but salary fields were not recognized."
        )
    }

@app.post("/payslip/budget")
async def payslip_budget(
    file: UploadFile = File(...),
    rent: float = Form(0, ge=0),
    food: float = Form(0, ge=0),
    transport: float = Form(0, ge=0),
    utilities: float = Form(0, ge=0),
    other_expenses: float = Form(0, ge=0),
):
    # 1. Check uploaded file
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF payslip."
        )

    pdf_bytes = await file.read()

    if not pdf_bytes:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty."
        )

    # 2. Extract salary from PDF
    try:
        text = extract_payslip_text(pdf_bytes)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not read this PDF."
        )

    if not text.strip():
        raise HTTPException(
            status_code=422,
            detail="No selectable text found in the PDF."
        )

    fields = extract_payslip_fields(text)

    # 3. Take-home salary is required for budgeting
    monthly_income = fields.get("take_home_pay")

    if monthly_income is None or monthly_income <= 0:
        raise HTTPException(
            status_code=422,
            detail="Take-home salary could not be detected. Please verify your payslip."
        )

    # 4. Calculate expenses and remaining money
    total_expenses = (
        rent + food + transport + utilities + other_expenses
    )
    remaining = monthly_income - total_expenses
    
    # Monthly Budget Health Score
    

    if remaining < 0:
        budget_health_score = 0
    else:
        expense_ratio = total_expenses / monthly_income * 100

        if expense_ratio <= 50:
            budget_health_score = 100
        elif expense_ratio <= 70:
            budget_health_score = 80
        elif expense_ratio <= 80:
            budget_health_score = 60
        elif expense_ratio <= 100:
            budget_health_score = 40
        else:
            budget_health_score = 0


    # Smart Budget Insights
    expense_ratio = round(
        total_expenses / monthly_income * 100, 2
    )
    remaining_ratio = round(
        remaining / monthly_income * 100, 2
    )

    expenses = {
        "rent": rent,
        "food": food,
        "transport": transport,
        "utilities": utilities,
        "other_expenses": other_expenses,
    }

    expense_breakdown = {
        category: {
            "amount": round(amount, 2),
            "percent_of_income": round(
                amount / monthly_income * 100, 2
            ),
        }
        for category, amount in expenses.items()
    }

    largest_category = max(expenses, key=expenses.get)
    largest_amount = expenses[largest_category]

    largest_expense = None
    if largest_amount > 0:
        largest_expense = {
            "category": largest_category,
            "amount": round(largest_amount, 2),
            "percent_of_income": round(
                largest_amount / monthly_income * 100, 2
            ),
        }

    insights = []
    
    # Personalized Spending Suggestions
    suggestions = []

    rent_percent = rent / monthly_income * 100
    food_percent = food / monthly_income * 100
    transport_percent = transport / monthly_income * 100

    if rent_percent > 30:
        suggestions.append(
            "Rent is above 30% of your income. "
            "Consider reviewing housing costs."
        )

    if food_percent > 15:
        suggestions.append(
            "Food expenses are above 15% of your income. "
            "Try planning meals and tracking food purchases."
        )

    if transport_percent > 10:
        suggestions.append(
            "Transport expenses are above 10% of your income. "
            "Compare travel options to reduce costs."
        )

    if remaining > 0 and expense_ratio <= 80:
        suggestions.append(
            "Consider setting aside part of your remaining money "
            "for an emergency fund."
        )

    if not suggestions:
        suggestions.append(
            "Your expenses look manageable based on these simple thresholds. "
            "Continue tracking your spending."
        )


    if remaining < 0:
        insights.append(
            "Your expenses exceed your take-home salary. "
            "Review your expenses."
        )
    elif remaining == 0:
        insights.append(
            "Your full income is allocated to expenses. "
            "Consider building a financial buffer."
        )
    else:
        insights.append(
            f"You have ₹{remaining:.2f} remaining after expenses."
        )

    if largest_expense:
        insights.append(
            f"Your largest expense is {largest_category}: "
            f"₹{largest_amount:.2f} "
            f"({largest_expense['percent_of_income']}% of income)."
        )

    if expense_ratio > 80:
        insights.append(
            "More than 80% of your income goes to expenses."
        )
    elif expense_ratio <= 50 and remaining >= 0:
        insights.append(
            "Your recorded expenses use 50% or less of your income."
        )
    else:
        insights.append(
            "Track your spending regularly to understand your expenses."
        )

    # 5. Return the budget
    if remaining < 0:
        budget = {
            "status": "deficit",
            "monthly_income": round(monthly_income, 2),
            "total_expenses": round(total_expenses, 2),
            "remaining": round(remaining, 2),
            "message": "Expenses exceed your take-home salary."
        }
    else:
        budget = {
            "status": "success",
            "monthly_income": round(monthly_income, 2),
            "total_expenses": round(total_expenses, 2),
            "remaining": round(remaining, 2),
            "allocation": {
                "savings": round(remaining * 0.50, 2),
                "investments": round(remaining * 0.30, 2),
                "flexible_spending": round(remaining * 0.20, 2)
            },
            "message": "Budget calculated using extracted take-home salary."
        }

    
    return {
        "filename": file.filename,
        "extracted_fields": fields,
        "budget": budget,
        "budget_health_score": budget_health_score,
        "expense_ratio_percent": expense_ratio,
        "remaining_ratio_percent": remaining_ratio,
        "expense_breakdown": expense_breakdown,
        "largest_expense": largest_expense,
        "insights": insights,
                "suggestions": suggestions,
        "note": (
            "Verify extracted salary values before relying on this budget. "
            "Allocation percentages are illustrative, not financial advice."
        )
    }

