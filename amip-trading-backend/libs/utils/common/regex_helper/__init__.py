import re


def build_regex_query(search_text: str) -> dict:
    # Tokenize the search string into words
    tokens = search_text.strip().split()

    # Escape each token for regex safety
    escaped_tokens = [re.escape(token) for token in tokens]

    # Build regex pattern: (?=.*token1)(?=.*token2)...
    regex_pattern = "".join([f"(?=.*{token})" for token in escaped_tokens])

    return {
        "$regex": regex_pattern,
        "$options": "i"
    }
