(function() {
    const formInputs = document.querySelectorAll(".container input");
    const id = document.querySelector("#id");
    const dataForm = document.querySelector("#data-form");
    const dataTable = document.querySelector("#data-table");

    function createUserFromFormObj(dataObject) {
        const address = new Address(
            dataObject.street,
            dataObject.city,
            dataObject.suite,
            dataObject.zipcode,
            new Geolatitude(dataObject.lat, dataObject.lng)
        );
        const company = new Company(
            dataObject["company-name"],
            dataObject.bs,
            dataObject["catch-phrase"]
        );
        const user = new User(
            dataObject.name,
            dataObject.username,
            dataObject.email,
            dataObject.phone,
            address,
            dataObject.website,
            company,
            dataObject.id
        );
        return user;
    }

    function updateUser() {
        const formData = new FormData(dataForm);
        const formDataObject = Object.fromEntries(formData.entries());

        setStatus("PREPARING UPDATE REQUEST");

        fetch(`https://jsonplaceholder.typicode.com/users/${id.value}`, {
                method: "PUT", // request method
                body: JSON.stringify(createUserFromFormObj(formDataObject)),
                headers: {
                    "Content-type": "application/json", // has json data in the body
                },
            })
            .then((response) => {
                setStatus("RECEIVED RESPONSE");
                // response.ok checks if the response code is between 200 - 206
                // - returns a true value if it is, otherwise false
                if (response.ok) return response.json();
                else throw new Error("Uh oh, something went wrong...");
            })
            .then((user) => {
                setStatus("RENDERING TABLE");
                // user is put in an array because renderUserTable() accepts an array of users
                renderUserTable([user], dataTable);
                setStatus("RESPONSE RENDERED INTO TABLE");
            })
            .catch((error) => {
                setStatus("ERROR ENCOUNTERED");
                handleError(error);
            });
    }

    function readById() {
        setStatus("PREPARING GET REQUEST");

        return fetch(`https://jsonplaceholder.typicode.com/users/${id.value}`, {
                method: "GET",
            })
            .then((response) => {
                setStatus("RECEIVED RESPONSE");
                if (response.ok) return response.json();
                else throw new Error("Uh oh, something went wrong...");
            })
            .then((user) => {
                return user;
            })
            .catch((error) => {
                setStatus("ERROR ENCOUNTERED");
                handleError(error);
            });
    }

    // default initialisation

    id.addEventListener("change", function(event) {
        readById(id.value).then((user) => {
            // setting the input boxes below

            formInputs[1].value = user.name;
            formInputs[2].value = user.username;
            formInputs[3].value = user.email;
            formInputs[4].value = user.phone;
            formInputs[5].value = user.website;

            formInputs[6].value = user.address.street;
            formInputs[7].value = user.address.city;
            formInputs[8].value = user.address.suite;
            formInputs[9].value = user.address.zipcode;
            formInputs[10].value = user.address.geo.lat;
            formInputs[11].value = user.address.geo.long;

            formInputs[12].value = user.company.name;
            formInputs[13].value = user.company.bs;
            formInputs[14].value = user.company.catchPhrase;
        });
    });

    function handleFormSubmission(event) {
        // prevent form submission from refreshing page in this case, returning false also does the same
        // - more generally, preventDefault() prevents default behaviours of an event
        event.preventDefault();
        updateUser();
        //return false;
    }

    dataForm.addEventListener("submit", handleFormSubmission);
})();