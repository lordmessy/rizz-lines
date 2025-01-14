    let btn= document.querySelector(".btn");
    let  input_take='';
    
    btn.addEventListener("click",function hello(){
        let input = document.querySelector("input");
         input_take= input.value;
       console.log(input_take);
       callGeminiAPI();
    }
)
    
    async function callGeminiAPI() {
    const apiKey = "AIzaSyBWKyMvFfON_2HsuaXRxhjSVWSuvO_4wBs"; // Replace with your API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
    const payload = {
        contents: [
          {
            parts: [
              {
                text:  input_take,
              },
            ],
          },
        ],
      };

      const headers = {
        "Content-Type": "application/json",
      };


     
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload), // Important: Stringify the payload
        })
        console.log(response.text);
    
        if (!response.ok) {
          const errorText = await response.text(); // Get error text from the response
          throw new Error(`HTTP error ${response.status}: ${errorText}`);
        }
    
        const responseJson = await response.json();
    
        if (responseJson.candidates && responseJson.candidates.length > 0) {
            responseJson.candidates.forEach(candidate => {
                if(candidate.content){
                    console.log("Generated Text:");
                    console.log(candidate.content.parts[0].text);
                    let create_p = document.createElement("p");
                    create_p.innerText= candidate.content.parts[0].text;

                    let select_div= document.querySelector(".a");

                    select_div.appendChild(create_p);
                } else {
                    console.log("No content found in this candidate")
                }
            })
        } else {
          console.log("No candidates found in the response.");
        }
      } catch (error) {
        console.error("Error calling Gemini API:", error);
      }
    }
    
    
    
    
