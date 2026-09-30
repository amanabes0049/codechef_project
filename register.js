let events =
    JSON.parse(localStorage.getItem("events")) || [];


let registrations =
    JSON.parse(
        localStorage.getItem("registrations")
    ) || [];


// Get event ID from URL

const params =
    new URLSearchParams(
        window.location.search
    );


const eventId =
    Number(params.get("id"));


// Find event

const event =
    events.find(
        event => event.id === eventId
    );


const eventName =
    document.getElementById("eventName");


if (event) {

    eventName.innerText =
        "Register for: " + event.name;

} else {

    eventName.innerText =
        "Event not found";

}


// Form

const form =
    document.getElementById(
        "registrationForm"
    );


form.addEventListener(
    "submit",
    function(eventSubmit) {

        eventSubmit.preventDefault();


        const registration = {

            id: Date.now(),

            name:
                document.getElementById("name").value,

            email:
                document.getElementById("email").value,

            collegeYear:
                document.getElementById("collegeYear").value,

            phone:
                document.getElementById("phone").value,

            eventId:
                eventId,

            eventName:
                event.name

        };


        registrations.push(registration);


        localStorage.setItem(
            "registrations",
            JSON.stringify(registrations)
        );


        document.getElementById("message")
            .innerText =
            "Registration successful!";


        form.reset();

    }
);