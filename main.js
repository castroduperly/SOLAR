let base_url = 
"https://www.youtube.com/embed/9d3qFZdGnwo?autoplay=1&start=153&end=160";
let base_url1 = 
"https://www.youtube.com/embed/iwhx2gZ5fBE?&start=142&end=152&autoplay=1";
var player;

function setup() {
  createCanvas(200,200);
  background(0);
  //createVideo(base_url);
  player = select("#yt_video");
  
  player.attribute('src', base_url);
  player.position(0,0);  

}

function draw() {

}

function mousePressed () {

  
	var iframes = document.querySelectorAll('iframe');
	//for (var i = 0; i < iframes.length; i++) {
	iframes[0].parentNode.removeChild(iframes[0]);
	//}//got code here: https://stackoverflow.com/questions/15103552/remove-iframe-with-javascript
	select("#yt_video2").attribute('src', base_url1);
	select("#yt_video2").position(0,0);
	 
}






const provider = new ethers.providers.Web3Provider(window.ethereum);

// the person signed into metamask is the 'signer'
const signer = provider.getSigner();
console.log(signer);
const contract = new ethers.Contract(contractAddress, contractABI, provider);

viewStatus();
viewVotes();

$('#contractAddress').text(contractAddress);

setInterval(function () {
  viewStatus();
  viewVotes();
}, 2000);


$('#voteYes').click(function () {
  voteYes();
})

$('#voteNo').click(function () {
  voteNo();
})

async function viewVotes() {
  const voteCount = await contract.viewVotes();
  $('#yesVotes').text(`${voteCount[0]}`);
  $('#noVotes').text(`${voteCount[1]}`);
}


async function viewStatus() {
  const artStatus = await contract.viewStatus();

  // console.log(artStatus)

  if (artStatus == true) {
    $('#status').text('is giving light to a sunflower').css('color', 'black');
  } else if (artStatus == false) {
    $('#status').text('is denying light to a sunflower').css('color', 'black');
  } else {
    $('#status').text('gray area...more votes are required').css('color', 'gray');
  }

  return artStatus;
}

async function voteYes() {
  await provider.send("eth_requestAccounts", []);
  const tokenWithSigner = contract.connect(signer);
  tokenWithSigner.voteYes();
  
}

async function voteNo() {
  await provider.send("eth_requestAccounts", []);
  const tokenWithSigner = contract.connect(signer);
  tokenWithSigner.voteNo();
}