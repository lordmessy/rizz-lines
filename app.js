
let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");

let ul = document.querySelector("ul");
let displayedLines = [];


let pickupLines = [];
let currentIndex = 0;

btn1.addEventListener("click", function () {
  text_process()
});

btn2.addEventListener("click", function () {
  text_process()
});


function text_process() {
  if (currentIndex >= pickupLines.length) {
    callGeminiAPI().then((newPickupLines) => {
      if (newPickupLines) {

        const lines = newPickupLines
          .replace(/<\/?ul>/g, "")
          .replace("```html", "")
          .replace("```\n", "") 
          .split("</li>") 
          .filter((line) => line.trim()) 
          .map((line) => line.trim() + "</li>"); 

        pickupLines = pickupLines.concat(
          lines.filter((line) => !pickupLines.includes(line))
        );
        currentIndex = 0; 
        displayNextFive(); 
      } else {
        console.error("Failed to fetch new pickup lines.");
      }
    });
  } else {
    displayNextFive();
  }
};

function displayNextFive() {
  const nextLines = pickupLines.slice(currentIndex, currentIndex + 5);
  currentIndex += 5;

  ul.innerHTML = nextLines.join("");
  addCopyButtonsToList();
}

function addCopyButtonsToList() {
  const listItems = document.querySelectorAll("li");

  listItems.forEach((li) => {
    if (!li.querySelector(".copy-btn")) { 
      const btn = document.createElement("button");
      btn.classList.add("copy-btn");
      btn.innerHTML = '<i class="fa-regular fa-copy"></i>';

      li.appendChild(btn);

      btn.addEventListener("click", () => {
        const textToCopy = li.textContent.replace("Copy", "").trim(); 
        navigator.clipboard.writeText(textToCopy).then(() => {
          alert("Copied to clipboard: " + textToCopy);
        }).catch(err => {
          alert("Failed to copy: " + err);
        });
      });
    }
  });
}

function callGeminiAPI() {
  const apiKey = "AIzaSyBWKyMvFfON_2HsuaXRxhjSVWSuvO_4wBs"; // Replace with your API key
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;


  const excludeText = `Exclude the following pickup lines from the response:\n${displayedLines}`;
  console.log("this is display line22222", excludeText);


  const payload = {
    contents: [
      {
        parts: [
          {
            text: `${excludeText} Generate 40 quirky and funny pickup lines that appeal to Gen Z. Include references to social media platforms, trending memes, popular culture, and casual slang. Ensure the lines are lighthearted, clever, and relatable. They should feel modern, conversational, and playful, often blending humor with flirtation. Use contemporary phrases like 'slay,' 'vibes,' 'low-key,' 'no cap,' or 'on fleek,' and reference everyday Gen Z experiences like binge-watching Netflix, viral TikToks, emojis, gaming, or texting culture. Structure them as:
<li>Pickup line 1</li>
<li>Pickup line 2</li>
<li>Pickup line 3</li>
<li>Pickup line 4</li>
<li>Pickup line 5</li>
<li>Pickup line 6</li>
<li>Pickup line 7</li>
<li>Pickup line 8</li>
<li>Pickup line 9</li>
<li>Pickup line 10</li>
<li>Pickup line 11</li>
<li>Pickup line 12</li>
<li>Pickup line 13</li>
<li>Pickup line 14</li>
<li>Pickup line 15</li>
<li>Pickup line 16</li>
<li>Pickup line 17</li>
<li>Pickup line 18</li>
<li>Pickup line 19</li>
<li>Pickup line 20</li>
<li>Pickup line 21</li>
<li>Pickup line 22</li>
<li>Pickup line 23</li>
<li>Pickup line 24</li>
<li>Pickup line 25</li>
<li>Pickup line 26</li>
<li>Pickup line 27</li>
<li>Pickup line 28</li>
<li>Pickup line 29</li>
<li>Pickup line 30</li>
<li>Pickup line 31</li>
<li>Pickup line 32</li>
<li>Pickup line 33</li>
<li>Pickup line 34</li>
<li>Pickup line 35</li>
<li>Pickup line 36</li>
<li>Pickup line 37</li>
<li>Pickup line 38</li>
<li>Pickup line 39</li>
<li>Pickup line 40</li>
Only provide the HTML code with no extra text or explanation. Ensure the pickup lines are creative and lighthearted.`,
          },
        ],
      },
    ],
  };

  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("API Response:", data);
      const pickupLine = data.candidates[0].content.parts[0].text;
      // console.log("pickupline", pickupLine.length);
      displayedLines = pickupLine;


      return pickupLine;
    })
    .catch((error) => {
      console.error("Error fetching pickup lines:", error);
      return null;
    });
}
