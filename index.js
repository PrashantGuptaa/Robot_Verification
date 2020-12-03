let imgCont = document.getElementById("imgContainer");
let timesClickedForReset = 0;
let timesClickedForVerification = 0;
document.getElementById("reset").style.display = "none";
document.getElementById("btn").style.display = "none";
document.getElementById("para").style.display = "none";

let verificationData = [];
const images = () => {
  let imageArray = [
    {
      img:
        "https://cdn.pixabay.com/photo/2016/10/18/21/22/california-1751455__340.jpg",
      tag: "img1"
    },
    {
      img:
        "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg",
      tag: "img2"
    },
    {
      img:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
      tag: "img3"
    },
    {
      img:
        "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg",
      tag: "img4"
    },
    {
      img:
        "https://cdn.pixabay.com/photo/2016/10/21/14/50/plouzane-1758197__340.jpg",
      tag: "img5"
    }
  ];
  return [...imageArray];
};
let imagesIndex = [];

const addImageToArray = () => {
  let imageArray = images();
  let index = Math.floor(Math.random() * imageArray.length);
  imageArray.splice(index, 0, imageArray[index]);
  return [...imageArray];
};

const createImages = () => {
  let i = 0;
  imagesIndex = [];
  verificationData = [];
  imgCont.innerHTML = "";
  let imageArray = addImageToArray();
  while (i < imageArray.length) {
    let index = Math.floor(Math.random() * imageArray.length);
    let img = document.createElement("img");
    if (!imagesIndex.includes(index)) {
      img.src = imageArray[index].img;
      img.setAttribute("class", "images");
      img.setAttribute("id", i);
      img.setAttribute("data-ns-test", imageArray[index].tag);

      imgCont.appendChild(img);
      imagesIndex.push(index);
      i++;
    }
  }
};

const handleImageClick = (event) => {
  if (event.target.getAttribute("id") !== "imgContainer") {
    const obj = {
      id: event.target.getAttribute("id"),
      dataTag: event.target.getAttribute("data-ns-test")
    };
    if (!isAlreadyClicked(event.target.getAttribute("id"))) {
      verificationData.push(obj);
      event.target.style.opacity = "0.7"
      timesClickedForReset++;
      timesClickedForVerification++;
      showResetButton();
      showVerificationButton();
    }
    //event.target.style.display = "none";
  }
};
imgCont.addEventListener("click", handleImageClick);

createImages();

const showResetButton = () => {
  if (timesClickedForReset >= 1)
    document.getElementById("reset").style.display = "flex";
};

const showVerificationButton = () => {
  if (timesClickedForVerification === 2)
    document.getElementById("btn").style.display = "flex";
  else document.getElementById("btn").style.display = "none";
};

const resetData = () => {
  timesClickedForReset = 0;
  timesClickedForVerification = 0;
  document.getElementById("btn").style.display = "none";
  document.getElementById("reset").style.display = "none";
  document.getElementById("para").style.display = "none";

  createImages();
};

const verify = () => {
  document.getElementById("para").style.display = "flex";
  if (verificationData[0].dataTag === verificationData[1].dataTag)
    document.getElementById("para").innerHTML =
      "You are a human. Congratulations!";
  else
    document.getElementById("para").innerHTML =
      "We can't verify you as a human. You selected the non-identical tiles.";
};

const isAlreadyClicked = (id) => {
  verificationData.forEach((element) => {
    if (element.id === id) return true;
  });
  return false;
};