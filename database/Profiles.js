
const url =
  "https://raw.githubusercontent.com/coalcanvas/database-schema/main/database/list.json";
let myList = [];
let localData = localStorage.getItem("myList");
async function loadData() {
  const output = document.querySelector(".output");
  output.textContent = "loading...";
  if (localData) {
    myList = JSON.parse(localStorage.getItem("myList"));
    console.log(myList);
    maker();
  } else {
    fetch(url)
      .then((rep) => rep.json())
      .then((data) => {
        myList = data;
        maker();
        localStorage.setItem("myList", JSON.stringify(myList));
      });
  }

  console.log(myList);
}

async function maker() {
  console.log(myList.paticipants);
  output.innerHTML = "";
  myList.participants.forEach((el) => {
    myList.participants.push(el);
    makeList(el);
  });
}
async function makeList(item) {
  const div = document.createElement("div");
  const output = document.querySelector(".output");

  div.innerHTML = `${item.name} <b class='xsmall-text font-weight-bold'>(${item.guests} guests)</b>`;
  output.append(div);
  if (item.status === true) {
    div.classList.add("confirmed");
  } else {
    div.classList.add("notConfirmed");
  }
  div.addEventListener("click", (e, index) => {
    div.classList.toggle("confirmed");
    div.classList.toggle("notConfirmed");
    console.log(div.classList.contains("confirmed"));
    if (div.classList.contains("confirmed")) {
      myList.participants[index].status = true;
    } else {
      myList.participants[index].status = false;
    }
  });
}

// add stylesheet

// Your CSS as text
var pgStyles = `
.confirmed {
  filter: contrast(125%);
  background-color: #acc29d;
  color: #5eb95e;

}
.notConfirmed {

  filter:grayscale(25%);

}
`;

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = pgStyles;
document.body.appendChild(styleSheet);
const Profiles = {
  /**
   * Render the page content.
   */
  render: async () => {
    return /*html*/ `

<section scoped onload="scrollTop()" id='profiles' class='col-md-10 col-10 offset-md-1 text-center offset-md-1 offset-1 col-auto col-md-auto'>
  <h4 class="title-tag text-center blur-bg pt-2" data-aos="zoom-in" data-aos-easing="ease-in-sine" data-aos-duration="800">Profiles</h4>
        <hr class='ultralight-border text-center w-25 higher' />
<div class='contact-form'>  

<output class='output' id='output' </output>
</div>
    <button type="button" id='btn-profiles' class="btn btn-sm isomorph-o pearl d-flex offset-4 align-content-center flex-end">Submit</button>
 
</section>
    `;
  },
  /**
   * All the code related to DOM interactions and controls go in here.
   * This is a separate call as these can be registered only after the DOM has been painted.
   */

  after_render: async () => {
    // setInterval(getItems, 2000);
    const btn = document.querySelector("#btn-profiles");
    const output = document.querySelector(".output");
    console.log(output);

    btn.addEventListener("click", (e) => {
      console.log("ready");
    });

    btn.addEventListener("click", loadData, maker);
  },
};
export default Profiles;
