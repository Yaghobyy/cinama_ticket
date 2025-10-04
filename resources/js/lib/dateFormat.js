const dateFormat = (input)=>{
    if (!input) return '';

    let date;
    if (typeof input === 'string') {
        // If it's a plain date like YYYY-MM-DD, avoid timezone shifts by anchoring to midnight local
        const ymd = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (ymd.test(input)) {
            date = new Date(`${input}T00:00:00`);
        } else {
            date = new Date(input);
        }
    } else {
        date = new Date(input);
    }

    if (Number.isNaN(date.getTime())) return String(input);

    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        timeZone: 'Asia/Tehran',
    }).format(date);
}

export default dateFormat;