document.addEventListener('DOMContentLoaded', function() {

    /*Checks if  a string contains a digit*/
    function containsDigits(str) {
        const regex = /\d/;
        return regex.test(str);
    }

    async function getGender(name) {
        const url = `https://api.genderize.io?name=${name}`;
        try {
            const response = await fetch(url);                        /*What values get stored in here and the next line?*/
            const gender = await response.json();
            return gender;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    /*Handles "Predict my info" button*/
    document.getElementById('predictBtn').addEventListener('click', function(e){

        e.preventDefault();
        let nameInput = document.getElementById('nameInput').value;

        /* Check if the input is empty */
        if (nameInput.trim() === "") {
            alert('Please enter a name.');
            return;
        }

        /*Prevents inacurate name submission*/
        if (containsDigits(nameInput)){
            alert('A name cannot contain a digit.');
            return;
        }
    
        console.log("Name: ",nameInput);

        const gender = getGender(nameInput);


    });
});