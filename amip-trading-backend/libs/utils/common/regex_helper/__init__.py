import re


def build_regex_query(search_text: str, anchor_start: bool = True) -> dict:
    # Only take the first word or the full phrase depending on your UX goal
    escaped = re.escape(search_text.strip())

    if anchor_start:
        regex_pattern = f"^{escaped}"  # Anchored regex for index usage
    else:
        regex_pattern = escaped  # Non-anchored fallback

    return {
        "$regex": regex_pattern,
        "$options": "i"
    }
