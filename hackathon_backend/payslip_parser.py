
import re
import fitz


def extract_payslip_text(pdf_bytes: bytes) -> str:
    """Extract selectable text from an uploaded PDF."""
    text_parts = []

    with fitz.open(stream=pdf_bytes, filetype="pdf") as pdf:
        for page in pdf:
            text_parts.append(page.get_text())

    return "\n".join(text_parts)


def extract_payslip_fields(text: str) -> dict:
    """Extract common salary fields when clearly labelled."""
    patterns = {
        "gross_salary": [
            r"(?:gross\s+(?:salary|earnings)|total\s+earnings)\s*[:\-]?\s*(?:₹|Rs\.?\s*)?([\d,]+(?:\.\d{1,2})?)"
        ],
        "total_deductions": [
            r"total\s+deductions\s*[:\-]?\s*(?:₹|Rs\.?\s*)?([\d,]+(?:\.\d{1,2})?)"
        ],
        
        "take_home_pay": [
            r"(?:net\s+pay|take[\s-]*home\s+pay|net\s+salary)\s*[:\-]?\s*(?:₹|Rs\.?\s*)?([\d,]+(?:\.\d{1,2})?)",
            r"(?:net\s+pay|take[\s-]*home\s+pay|net\s+salary)[^\d₹]{0,50}(?:₹|Rs\.?\s*)?([\d,]+(?:\.\d{1,2})?)"
        ],

    }

    result = {}

    for field, expressions in patterns.items():
        for expression in expressions:
            match = re.search(expression, text, flags=re.IGNORECASE)

            if match:
                result[field] = float(match.group(1).replace(",", ""))
                break

    return result
