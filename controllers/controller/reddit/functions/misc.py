def chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

def round_hour(ts):
    q, r = divmod(ts, 3600)
    return (q+1 if r >=1800 else q) * 3600

def round_hour_down(ts):
    q, _ = divmod(ts, 3600)
    return q*3600

def dump_datetime(value):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]