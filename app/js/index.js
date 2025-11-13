(() => {
    
    
    
    
    


    
    const $nav = document.getElementById("main-navigation");

    function generateHTMLForNavLink(navItem) {
        if (navItem.type === "internal") {
            return `<a href="${navItem.link}">${navItem.name}</a>`;
        } else if (navItem.type === "external") {
            return `<a href="${navItem.link}" target="_blank">${navItem.name}</a>`;
        }
    }

    function generateHTMLForNavLinks(navLinks) {
        let html= "";
        for (const navLink of navLinks) {
            html += generateHTMLForNavLink(navLink);
        }
        return html;
    }

    $nav.innerHTML = generateHTMLForNavLinks(navigationLink);

    const $timer = document.getElementById("countdown-timer");

    const gamesconTimestamp = 1787731200000;

    function generateHTMLForTimer(timeRemaining) {
        return `
            ${timeRemaining.days} days
            ${timeRemaining.hours} h
            ${timeRemaining.minutes} m
            ${timeRemaining.seconds} s
            <p>till next edition</p>
        `;
    }

    function calculateTimeRemaining() {
        const now = new Date().getTime();
        const difference = gamesconTimestamp - now;

        // Bereken dagen, uren, minuten en seconden
        const days = Math.floor(difference / (1000 * 60* 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    function updateCountdownDisplay() {
        const timeRemaining = calculateTimeRemaining();
        $timer.innerHTML = generateHTMLForTimer(timeRemaining);
    }

    updateCountdownDisplay();
    setInterval(updateCountdownDisplay, 1000);

    const $list= document.getElementById("event-list");

    function formatEventDateTime(fromTimestamp, toTimestamp) {
        const startDate = new Date(parseInt(fromTimestamp));
        const endDate = new Date(parseInt(toTimestamp));

        // Get day and month
        const day = startDate.getDate().toString().padStart(2, '0');
        const month = (startDate.getMonth() + 1).toString().padStart(2, '0');

        // Get Start/End hours and minutes
        const startHours = startDate.getHours().toString().padStart(2, '0');
        const startMinutes = startDate.getMinutes().toString().padStart(2, '0');

        const endHours = endDate.getHours().toString().padStart(2, '0');
        const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

        return `${day}/${month} ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
    }

    function genereateHTMLForEvent(eventData) {
        const dateTimeString = formatEventDateTime(eventData.from, eventData.to)
        
        return `<div class='event-card' data-id="${eventData.id}">
            <img src="${eventData.event.image}" alt="${eventData.event.name} image"/>
            <div class="card-content">
            <h2>${eventData.event.name}</h2>
            <p class="stage">${eventData.stage} | ${dateTimeString} </p>
        </div>
        </div>`

    }
    function genereateHTMLForEvents(eventcards) {
        let html= "";
        for (const eventcard of eventcards) {
            html += genereateHTMLForEvent(eventcard);
        }
        return html;
    }

    $list.innerHTML = genereateHTMLForEvents(eventcard);

})();