(() => {

    
    // Get the navigation container from the HTML
    const $nav = document.getElementById("main-navigation");

    // Function to create HTML for a single navigation link
    function generateHTMLForNavLink(navItem) {
       if (navItem.type === "internal") {
            // Internal links stay on the same website
            return `<a href="${navItem.link}">${navItem.name}</a>`;
        } else if (navItem.type === "external") {
            // External links open in a new tab (target="_blank")
            return `<a href="${navItem.link}" target="_blank">${navItem.name}</a>`;
        }
    }

    // Function to create HTML for all navigation links
    function generateHTMLForNavLinks(navLinks) {
        let html= "";
        // Loop through each navigation link in the array
        for (const navLink of navLinks) {
            html += generateHTMLForNavLink(navLink);
        }
        return html;
    }

    // Put the navigation HTML into the webpage (navigationLink comes from data.js)
    $nav.innerHTML = generateHTMLForNavLinks(navigationLink);

    // Get the countdown timer container from the HTML
    const $timer = document.getElementById("countdown-timer");

    // The target date for Gamescon 2026 (August 26, 2026) in milliseconds
    const gamesconTimestamp = 1787731200000;

    // Function to create the HTML that displays the countdown
    function generateHTMLForTimer(timeRemaining) {
        return `
            ${timeRemaining.days}days
            ${timeRemaining.hours}h
            ${timeRemaining.minutes}m
            ${timeRemaining.seconds}s
            <p>till next edition</p>
        `;
    }

    // Function to calculate how much time is left until Gamescon
    function calculateTimeRemaining() {
        const now = new Date().getTime(); // Get current time in milliseconds
        const difference = gamesconTimestamp - now; // Calculate the difference

        // Convert milliseconds to days, hours, minutes, and seconds
        const days = Math.floor(difference / (1000 * 60* 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Return an object with all the time values
        return { days, hours, minutes, seconds };
    }

    // Function to update the countdown display on the webpage
    function updateCountdownDisplay() {
        const timeRemaining = calculateTimeRemaining();
        $timer.innerHTML = generateHTMLForTimer(timeRemaining);
    }

    // Update the countdown immediately when page loads
    updateCountdownDisplay();
    // Update the countdown every second (1000 milliseconds)
    setInterval(updateCountdownDisplay, 1000);

    // Get the event list container from the HTML
    const $list= document.getElementById("event-list");

    // Function to format timestamps into readable date and time
    function formatEventDateTime(fromTimestamp, toTimestamp) {
        // Convert timestamp strings to actual Date objects
        const startDate = new Date(parseInt(fromTimestamp));
        const endDate = new Date(parseInt(toTimestamp));

        // Get day and month (padStart adds leading zero if needed: 01, 02, etc.)
        const day = startDate.getDate().toString().padStart(2, '0');
        const month = (startDate.getMonth() + 1).toString().padStart(2, '0'); // +1 because months start at 0

        // Get start and end hours and minutes
        const startHours = startDate.getHours().toString().padStart(2, '0');
        const startMinutes = startDate.getMinutes().toString().padStart(2, '0');

        const endHours = endDate.getHours().toString().padStart(2, '0');
        const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

        // Return formatted string like: 26/08 15:00 - 17:00
        return `${day}/${month} ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
    }

    // Function to create HTML for a single event card
    function generateHTMLForEvent(eventData) {
        // Format the event's start and end time
        const dateTimeString = formatEventDateTime(eventData.from, eventData.to)
        
        // Return HTML for one event card (data-id is used later for clicking)
        return `<div class='event-card' data-id="${eventData.id}">
            <img src="${eventData.event.image}" alt="${eventData.event.name} image"/>
            <div class="card-content">
            <h2>${eventData.event.name}</h2>
            <p class="stage">${eventData.stage} | ${dateTimeString} </p>
        </div>
        </div>`

    }
    
    // Function to create HTML for all event cards
    function generateHTMLForEvents(eventcards) {
        let html= "";
        // Loop through each event in the array
        for (const eventcard of eventcards) {
            html += generateHTMLForEvent(eventcard);
        }
        return html;
    }

    // Put all the event cards HTML into the webpage (eventcard comes from data.js)
    $list.innerHTML = generateHTMLForEvents(eventcard);

    // Get the panel element that will slide in from the right
    const $panel = document.getElementById('event-panel');
    
    // Function to get the correct icon file path for each social media platform
    function getSocialIcon(platform) {
        if (platform === 'instagram') {
            return './Images/instagram.svg';
        } else if (platform === 'twitter') {
            return './Images/twitter.svg';
        } else if (platform === 'website') {
            return './Images/link-chain-10470.svg';
        } else if (platform === 'youtube') {
            return './Images/youtube-123.svg';
        }
    }

    // Function to create the basic HTML structure for the panel
    function createPanelContent() {
        const panelHTML = `
            <div class="panel-content">
                <button id="panel-close" class="panel-close">&times;</button>
                <div class="panel-header">
                    <img class="panel-image" id="panel-image" src="" alt="">
                    <div class="panel-info">
                        <p id="panel-stage" class="panel-stage"></p>
                        <p id="panel-datetime" class="panel-datetime"></p>
                        <h2 id="panel-title" class="panel-title"></h2>
                        <div id="panel-socials" class="panel-socials"></div>
                    </div>
                </div>
                <div class="panel-description">
                    <p id="panel-desc"></p>
                </div>
            </div>
        `;
        
        // Put the HTML structure into the panel
        $panel.innerHTML = panelHTML;
    }

    // Function to hide the panel (slide it out to the right)
    function hidePanel() {
        $panel.classList.add('hidden');
    }

    // Function to show the panel with event details (slide it in from the right)
    function showPanel(eventData) {
        // First create the basic HTML structure
        createPanelContent();

        // Fill in the event image
        const $image = document.getElementById('panel-image');
        $image.src = eventData.event.image;
        $image.alt = eventData.event.name;

        // Fill in the stage name
        const $stage = document.getElementById('panel-stage');
        $stage.innerHTML = eventData.stage;

        // Fill in the date and time
        const $datetime = document.getElementById('panel-datetime');
        $datetime.innerHTML = formatEventDateTime(eventData.from, eventData.to);

        // Fill in the event title
        const $title = document.getElementById('panel-title');
        $title.innerHTML = eventData.event.name;
        // Fill in the event description
        const $description = document.getElementById('panel-desc');
        $description.innerHTML = eventData.event.description;

        // Create social media icons if the event has social links
        const $socialsContainer = document.getElementById('panel-socials');

        if (eventData.event.socials) {
            let socialsHTML = '';
            // Loop through each social media platform
            for (const platform in eventData.event.socials) {
                const url = eventData.event.socials[platform];
                const iconPath = getSocialIcon(platform);

                // Create a clickable icon for each social media platform
                socialsHTML += `
                    <a href="${url}" target="_blank" class="social-link">
                        <img class="social-icon" src="${iconPath}" alt="${platform} link">
                    </a>
                `;
            }

            $socialsContainer.innerHTML = socialsHTML;
        } else {
            // If no social links, leave empty
            $socialsContainer.innerHTML = '';
        }

        // Show the panel by removing the 'hidden' class
        $panel.classList.remove('hidden');

        // Add click handler to the close button (×)
        const $closeButton = document.getElementById('panel-close');
        $closeButton.addEventListener('click', function() {
            hidePanel();
        });
    }

    // Function to make event cards clickable
    function setupEventCardClickHandlers(){
        // Find all event cards on the page
        const $eventCards = document.querySelectorAll('.event-card');

        // Add a click listener to each event card
        $eventCards.forEach(function(card) {
            card.addEventListener('click', function() {
                // Get the event ID from the card's data-id attribute
                const eventId = card.getAttribute('data-id');
                
                // Find the full event data from the eventcard array
                const eventData = eventcard.find(function(event) {
                    return event.id === eventId;
                });
                
                // If we found the event data, show the panel with that event's details
                if (eventData) {
                    showPanel(eventData);
                }
            });
        });
    }

    // Call the function to set up all the click handlers
    setupEventCardClickHandlers();

})();