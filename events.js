let events =
    JSON.parse(localStorage.getItem("events")) || [];


const container =
    document.getElementById("eventsContainer");


const search =
    document.getElementById("search");


const category =
    document.getElementById("category");


// Display Events

function displayEvents(data) {

    if (data.length === 0) {

        container.innerHTML =
            "<p>No events found.</p>";

        return;

    }


    container.innerHTML =
        data.map(event => `

        <div class="event-card">

            <h3>
                ${event.name}
            </h3>

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

    `).join("");

}


// Search + Filter

function filterEvents() {

    const searchText =
        search.value.toLowerCase();


    const selectedCategory =
        category.value;


    const filtered =
        events.filter(event => {

            const nameMatch =
                event.name
                .toLowerCase()
                .includes(searchText);


            const categoryMatch =
                selectedCategory === "All" ||
                event.category === selectedCategory;


            return nameMatch && categoryMatch;

        });


    displayEvents(filtered);

}


search.addEventListener(
    "input",
    filterEvents
);


category.addEventListener(
    "change",
    filterEvents
);


displayEvents(events);