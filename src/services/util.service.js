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
    getTimePassed
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

    if (timeStamps.length === 1) {
        // If there's only one timestamp, extract it from the array
        timeStamps = timeStamps[0]
    }

    const currentDate = new Date()
    const date1 = new Date(timeStamps[0])
    const date2 = new Date(timeStamps[1])

    // Function to format a date in 'Month Day' format
    const formatDateDay = (date) => {
        const day = date.getDate()
        return day
    }

    const formatDateMonth = (date) => {
        const month = date.toLocaleString('en-US', { month: 'short' })
        return month
    }

    // Check if both dates are from the same year and month
    if (date1.getFullYear() === currentDate.getFullYear() && date1.getMonth() === date2.getMonth()) {
        return `${formatDateMonth(date1)} ${formatDateDay(date1)} - ${formatDateDay(date2)}`
    }

    // Check if both dates are from the same year
    if (date1.getFullYear() === date2.getFullYear()) {
        return `${formatDateMonth(date1)} ${formatDateDay(date1)} - ${formatDateMonth(date2), formatDateDay(date2)}`
    }

    // If one of the dates is from a different year
    const year1 = date1.getFullYear()
    const year2 = date2.getFullYear()

    return `${formatDateMonth(date1)} ${formatDateDay(date1)}, '${year1} - ${formatDateMonth(date2)} ${formatDateDay(date2)}, '${year2}`
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