from datetime import datetime, timezone


def get_current_utc_timestamp() -> datetime:
    return datetime.now(timezone.utc)


def convert_ms_to_readable_format(execution_time_ms: float) -> str:
    milliseconds = execution_time_ms % 1000
    seconds = int((execution_time_ms // 1000) % 60)
    minutes = int((execution_time_ms // (1000 * 60)) % 60)
    hours = int((execution_time_ms // (1000 * 60 * 60)) % 24)

    time_str = ""
    if hours > 0:
        time_str += f"{hours}h "
    if minutes > 0:
        time_str += f"{minutes}m "
    if seconds > 0:
        time_str += f"{seconds}s "
    if milliseconds > 0 or time_str == "":
        time_str += f"{milliseconds:.0f}ms"

    return time_str.strip()


def get_execution_time_in_seconds(start_time: datetime) -> float:
    if start_time.tzinfo is timezone.utc:
        return round(
            (get_current_utc_timestamp() - start_time).total_seconds(), 2
        )
    else:
        return round((datetime.now() - start_time).total_seconds(), 2)
