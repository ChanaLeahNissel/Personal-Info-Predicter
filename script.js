document.addEventListener('DOMContentLoaded', function() {

    /*Checks if  a string contains a digit*/
    function containsDigits(str) {
        const regex = /\d/;
        return regex.test(str);
    }

    async function getPrediction(url, type) {

        try {
            /*API call*/
            const response = await fetch(url); 
            
            /*Parses response from JSON to JS*/
            const data = await response.json();

            if (type=="gender"){
                return data.gender;
            }

            if (type=="age"){
                return data.age;
            }
            
        /*Displays error if there was an error fetching the data*/
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    /*Handles "Predict my info" button*/
    document.getElementById('predictBtn').addEventListener('click', async function(e){

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

        /*Gets predictions from APIs*/
        const gender = await getPrediction(`https://api.genderize.io?name=${nameInput}`,"gender");
        const age = await getPrediction(`https://api.agify.io?name=${nameInput}`,"age");
  
        /*Prints gender in "genderResult" paragraph*/
        document.getElementById('genderResult').innerHTML = `<strong>Gender:</strong> ${gender}`;

        /*Prints age in "ageResult" paragraph*/
        document.getElementById('ageResult').innerHTML = `<strong>Age:</strong> ${age}`;
    });
});