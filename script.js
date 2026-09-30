// Get events from localStorage

let events =
    JSON.parse(localStorage.getItem("events")) || [];


const featuredContainer =
    document.getElementById("featuredEvent");


const upcomingContainer =
    document.getElementById("upcomingEvents");


// If there are no events

if (events.length === 0) {

    featuredContainer.innerHTML =
        "<p>No featured event available.</p>";

    upcomingContainer.innerHTML =
        "<p>No upcoming events.</p>";

}


// Featured event

const featured =
    events.find(event => event.featured === true);


if (featured) {

    featuredContainer.innerHTML =
        createEventCard(featured);

}


// Upcoming events

upcomingContainer.innerHTML =
    events
        .slice(0, 3)
        .map(event => createEventCard(event))
        .join("");


// Event Card Function

function createEventCard(event) {

    return `

        <div class="event-card">

            <h3>${event.name}</h3>

            <p>
                 ${event.category}
            </p>

            <p>
                 ${event.date}
            </p>

            <p>
                 ${event.time}
            </p>

            <p>
                 ${event.venue}
            </p>

            <p>
                ${event.description}
            </p>

            <a
                href="register.html?id=${event.id}"
                class="btn">

                Register Now

            </a>

        </div>

    `;
}