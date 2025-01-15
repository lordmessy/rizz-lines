let btn1 = document.querySelector(".btn1");

let btn2 = document.querySelector(".btn2");

let ul = document.querySelector("ul");

btn1.addEventListener("click", function () {
  let result = callGeminiAPI();
  result.then((pickupLine) => {
    if (pickupLine) {
      // let li = document.createElement("li");
      ul.innerHTML = pickupLine;
      // ul.appendChild(pickupLine);
    }
    else {
      console.error("No pickup line received.");

    }
  })

})

let input_take = "Generate 10 pickup lines in the following structure:\
  <li>Pickup line 1</li>\
  <li>Pickup line 2</li>\
  <li>Pickup line 3</li>\
  <li>Pickup line 4</li>\
  <li>Pickup line 5</li>\
    <li>Pickup line 6</li>\
  <li>Pickup line 7</li>\
  <li>Pickup line 8</li>\
  <li>Pickup line 9</li>\
  <li>Pickup line 10</li>\
  Only provide the HTML code with no extra text or explanation. Ensure the pickup lines are creative and lighthearted.";
// function callGeminiAPI(){
//   let a = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries "
//   return a;
// }

function callGeminiAPI() {
  const apiKey = "AIzaSyBWKyMvFfON_2HsuaXRxhjSVWSuvO_4wBs"; // Replace with your API key
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts:
          [
            {
              text: input_take,
            }
            ,
          ],
      },
    ],
  };


  return fetch(apiUrl, {
    method: 'POST',  // Set method to POST
    headers: {
      'Content-Type': 'application/json',  // Specify that the body is JSON
      // Add any other necessary headers (e.g., Authorization token)
    },
    body: JSON.stringify(payload),  // Convert the payload to a JSON string
  })

    .then((res) => {

      return res.json();
    }).then((data) => {
      console.log("this is data", data);
      pickupLine = data.candidates[0].content.parts[0].text;
      console.log(pickupLine);

      return pickupLine;


    })

  const headers = {
    "Content-Type": "application/json",
  };
}


