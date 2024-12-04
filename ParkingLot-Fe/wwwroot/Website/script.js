    function convertTo12HourFormat(time) {
        const [hours, minutes] = time.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes} ${period}`;
    }

    function convertTo24HourFormat(time) {
        const [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
    if (period === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
        } else if (period === 'AM' && hours === '12') {
        hours = '00';
        }
    return `${hours}:${minutes}`;
    }

    document.getElementById('OpenTime').addEventListener('blur', function () {
        this.value = convertTo12HourFormat(this.value);
    });

    document.getElementById('CloseTime').addEventListener('blur', function () {
        this.value = convertTo12HourFormat(this.value);
    });

    document.getElementById('btnLuu').addEventListener('click', function (event) {
        const openTimeInput = document.getElementById('OpenTime');
    const closeTimeInput = document.getElementById('CloseTime');
    openTimeInput.value = convertTo24HourFormat(openTimeInput.value);
    closeTimeInput.value = convertTo24HourFormat(closeTimeInput.value);
    });

