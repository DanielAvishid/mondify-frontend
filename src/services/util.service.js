export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getAssetSrc,
    getDateToShow,
    formatString,
    getTimePassed,
    lowercaseFirstLetter,
    calculateDaysDifference,
    getRandomColor,
    isEmailValid,
    darkenColor
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// util function
function getAssetSrc(name) {
    const path = `/src/assets/${name}`
    const modules = import.meta.glob('/src/assets/*', { eager: true })
    const mod = modules[path]
    return mod.default
}

function getDateToShow(timeStamps = []) {
    if (!timeStamps || timeStamps.length === 0) {
        return ''
    }

    const currentDate = new Date()
    const date1 = new Date(timeStamps[0])
    const date2 = new Date(timeStamps[1])

    const formatDateDay = (date) => {
        const day = date.getDate()
        return day
    }

    const totalDays = (date2 - date1) / (1000 * 60 * 60 * 24);
    const daysPassed = (currentDate - date1) / (1000 * 60 * 60 * 24);
    let percentage = ((daysPassed / totalDays) * 100).toFixed(0);

    const formatDateMonth = (date) => {
        const month = date.toLocaleString('en-US', { month: 'short' })
        return month
    }

    if (date1.getFullYear() === currentDate.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        formatDateDay(date1) === formatDateDay(date2)) {
        percentage = (currentDate > date2) ? 100 : 0
        return { text: `${formatDateDay(date1)} ${formatDateMonth(date1)}`, percentage }
    }

    if (date1.getFullYear() === currentDate.getFullYear() && date1.getMonth() === date2.getMonth()) {
        return { text: `${formatDateDay(date1)} - ${formatDateDay(date2)} ${formatDateMonth(date2)}`, percentage }
    }

    if (date1.getFullYear() === date2.getFullYear()) {
        return { text: `${formatDateDay(date1)} ${formatDateMonth(date1)} - ${formatDateDay(date2)} ${formatDateMonth(date2)}`, percentage }
    }

    const getShortYear = (date) => {
        const year = date.getFullYear().toString().slice(-2);
        return year;
    };

    const year1 = getShortYear(date1)
    const year2 = getShortYear(date2)

    return { text: `${formatDateMonth(date1)} ${formatDateDay(date1)}, '${year1} - ${formatDateMonth(date2)} ${formatDateDay(date2)}, '${year2}`, percentage }
}

function formatString(inputString) {
    // Remove spaces and convert to lowercase
    const formattedString = inputString.replace(/ /g, "-").toLowerCase();
    return formattedString;
}

function getTimePassed(timestamp) {
    const now = new Date().getTime();
    const timeDifference = now - timestamp;
    if (timeDifference < 0) return "Invalid timestamp";

    const minutes = Math.floor(timeDifference / 60 / 1000);
    const hours = Math.floor(minutes / 60);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;

    const date = new Date(timestamp);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;

}

function lowercaseFirstLetter(inputString) {
    if (inputString.length === 0) {
        return inputString; // Return an empty string if input is empty
    }
    return inputString.charAt(0).toLowerCase() + inputString.slice(1);
}

function calculateDaysDifference(timeStamps) {
    const [minDate, maxDate] = timeStamps;
    return Math.floor((new Date(maxDate) - new Date(minDate)) / (1000 * 60 * 60 * 24));
}

function getRandomColor() {
    const colors = ['#00c875', '#00b36b', '#c9f7e9', '#b3f0df', '#ff4d4d', '#ff3333', '#ffd6d6', '#ffc2c2', '#ffc82c', '#ffb31a', '#fff2cc', '#ffe5b3', '#f65e7c']
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

function isEmailValid(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailRegex.test(email)
}

function darkenColor(color, factor = 0.2) {
    // Check if the color is in the format "#RRGGBB" or "#RRGGBBAA"
    const isHexWithAlpha = color.length === 9;

    // Remove the hash symbol (#) and convert the color to a 6-digit or 8-digit format
    const hexColor = color.slice(1, isHexWithAlpha ? 7 : undefined);

    // Convert the hex color to an integer
    const hexValue = parseInt(hexColor, 16);

    // Extract the red, green, and blue components
    const red = (hexValue >> 16) & 255;
    const green = (hexValue >> 8) & 255;
    const blue = hexValue & 255;

    // Darken the color by reducing the RGB values
    const newRed = Math.max(0, Math.round(red - red * factor));
    const newGreen = Math.max(0, Math.round(green - green * factor));
    const newBlue = Math.max(0, Math.round(blue - blue * factor));

    // Convert the new RGB values back to a hex color
    const newHexColor = `#${(newRed << 16 | newGreen << 8 | newBlue).toString(16).padStart(6, '0')}`;

    // If the input color had an alpha component, add it to the result
    return isHexWithAlpha ? `${newHexColor}${color.slice(7)}` : newHexColor;
}



