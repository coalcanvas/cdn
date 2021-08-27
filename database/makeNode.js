const ipt = document.querySelector(".input");
const html = document.querySelector("html");

const btn = document.querySelector("#btn-profiles");

const contents = { pg: 1 };

const baseUrl = "https://reqres.in/api/";
function loadData() {
  const para = "users?page=" + contents.pg;
  const url = baseUrl + para;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      buildPage(data);
    }, 1500);
}

async function buildPage(data) {
  let output = document.querySelector("#output");
  output.innerHTML = "";
  await data.data.forEach((user) => {
    console.log(user);
    const html = `${user.first_name} ${user.last_name} ${user.id} <br/> ${user.email}`;
    const div1 = makeNode(output, "div", html);
    const img1 = makeNode(output, "img", "");

    img1.setAttribute("src", user.avatar);
    console.log(img1);
  });

  const div2 = makeNode(output, "div", html);

  for (let i = 0; i < data.total_pages; i++) {
    const span = makeNode(div2, "span", i + 1);
    span.classList.add("ind");
  }
}
function makeNode(parent, nodeType, content) {
  const el = document.createElement(nodeType);
  parent.append(el);
  el.innerHTML = content;
  return parent.appendChild(el);
}

function uniq(a) {
  var prims = { boolean: {}, number: {}, string: {} },
    objs = [];

  return a.filter(function (item) {
    var type = typeof item;
    if (type in prims)
      return prims[type].hasOwnProperty(item)
        ? false
        : (prims[type][item] = true);
    else return objs.indexOf(item) >= 0 ? false : objs.push(item);
  });
}

const Generate = {
  /**
   * Render the page content.
   */
  render: async () => {
    return /*html*/ `

<section onload="scrollTop()" id='profiles' class='col-md-10 col-10 offset-md-1 text-center offset-md-1 offset-1 col-auto col-md-auto'>
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

    btn.addEventListener("click", (e) => {
      console.log("ready");
    });

    btn.addEventListener("click", loadData);

    window.addEventListener("DOMContentLoaded", loadData);
  },
};
export default Generate;
