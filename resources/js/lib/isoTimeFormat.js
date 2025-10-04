const isoTimeFormat = (dateTime) => {
    if (!dateTime) return '';

    if (typeof dateTime === 'string') {
        const match = dateTime.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
        if (match) {
            const hours = match[1];
            const minutes = match[2];
            return `${hours}:${minutes}`;
        }
    }

    const date = new Date(dateTime);
    if (Number.isNaN(date.getTime())) {
        return String(dateTime);
    }

    return new Intl.DateTimeFormat('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);
};

export default isoTimeFormat;