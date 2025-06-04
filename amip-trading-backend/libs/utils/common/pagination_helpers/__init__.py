def get_page_params(total: int, page: int, page_size: int):
    total_pages = (total + page_size - 1) // page_size  # Calculate total pages

    # Calculate start and end index
    start = (page - 1) * page_size
    end = start + page_size

    return total_pages, start, end
