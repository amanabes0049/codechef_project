let events =
    JSON.parse(localStorage.getItem("events")) || [];


let registrations =
    JSON.parse(
        localStorage.getItem("registrations")
    ) || [];


let editId = null;


// Get elements

const nameInput =
    document.getElementById("eventName");

const categoryInput =
    document.getElementById("eventCategory");

const dateInput =
    document.getElementById("eventDate");

const timeInput =
    document.getElementById("eventTime");

const venueInput =
    document.getElementById("eventVenue");

const descriptionInput =
    document.getElementById("eventDescription");

const featuredInput =
    document.getElementById("featured");


// Save Event

function saveEvent() {

    const name =
        nameInput.value;

    const category =
        categoryInput.value;

    const date =
        dateInput.value;

    const time =
        timeInput.value;

    const venue =
        venueInput.value;

    const description =
        descriptionInput.value;

    const featured =
        featuredInput.checked;


    if (
        name === "" ||
        date === "" ||
        time === "" ||
        venue === "" ||
        description === ""
    ) {

        alert("Please fill all fields");

        return;

    }


    // Edit

    if (editId !== null) {

        const event =
            events.find(
                event => event.id === editId
            );


        event.name = name;

        event.category = category;

        event.date = date;

        event.time = time;

        event.venue = venue;

        event.description = description;

        event.featured = featured;


        editId = null;


    }

    // Add

    else {

        const newEvent = {

            id: Date.now(),

            name: name,

            category: category,

            date: date,

            time: time,

            venue: venue,

            description: description,

            featured: featured

        };


        events.push(newEvent);

    }


    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );


    clearForm();

    displayEvents();

}


// Display Events

function displayEvents() {

    const container =
        document.getElementById(
            "adminEvents"
        );


    container.innerHTML =
        events.map(event => `

        <div class="admin-event">

            <div>

                <h3>
                    ${event.name}
                </h3>

                <p>
                    ${event.category}
                </p>

                <p>
                    ${event.date}
                    ${event.time}
                </p>

                <p>
                    ${event.venue}
                </p>

            </div>


            <div>

                <button
                    class="edit-btn"
                    onclick="editEvent(${event.id})">

                    Edit

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteEvent(${event.id})">

                    Delete

                </button>

            </div>

        </div>

    `).join("");

}


// Edit Event

function editEvent(id) {

    const event =
        events.find(
            event => event.id === id
        );


    nameInput.value =
        event.name;

    categoryInput.value =
        event.category;

    dateInput.value =
        event.date;

    timeInput.value =
        event.time;

    venueInput.value =
        event.venue;

    descriptionInput.value =
        event.description;

    featuredInput.checked =
        event.featured;


    editId = id;

}


// Delete Event

function deleteEvent(id) {

    if (
        !confirm(
            "Are you sure you want to delete this event?"
        )
    ) {

        return;

    }


    events =
        events.filter(
            event => event.id !== id
        );


    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );


    displayEvents();

}


// Clear Form

function clearForm() {

    nameInput.value = "";

    dateInput.value = "";

    timeInput.value = "";

    venueInput.value = "";

    descriptionInput.value = "";

    featuredInput.checked = false;

    editId = null;

}


// Cancel

function cancelEdit() {

    clearForm();

}


// ============================
// REGISTRATIONS
// ============================

function displayRegistrations(data) {

    const container =
        document.getElementById(
            "registrations"
        );


    if (data.length === 0) {

        container.innerHTML =
            "<p>No registrations found.</p>";

        return;

    }


    container.innerHTML =
        data.map(reg => `

        <div class="event-card">

            <h3>
                ${reg.name}
            </h3>

            <p>
                 ${reg.email}
            </p>

            <p>
                 ${reg.collegeYear}
            </p>

            <p>
                 ${reg.phone}
            </p>

            <p>
                ${reg.eventName}
            </p>

        </div>

    `).join("");

}


// Search Registrations

document
    .getElementById(
        "registrationSearch"
    )
    .addEventListener(
        "input",
        function() {

            const text =
                this.value.toLowerCase();


            const filtered =
                registrations.filter(reg =>

                    reg.name
                        .toLowerCase()
                        .includes(text)

                    ||

                    reg.email
                        .toLowerCase()
                        .includes(text)

                    ||

                    reg.eventName
                        .toLowerCase()
                        .includes(text)

                );


            displayRegistrations(
                filtered
            );

        }
    );


// Initial display

displayEvents();

displayRegistrations(registrations);