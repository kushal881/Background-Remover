let fileInput = document.getElementById("filepicker")
let innerImage=document.querySelector(".inner-upload-image")
let image=null
let url=null
let inputImg=document.getElementById("input-image")
let icon=document.querySelector("#icon")
let span=document.querySelector("span")
let uploadBtn=document.querySelector("#upload-btn")
let OriginalImg=document.querySelector(".resultImg1 img")
let GeneratedImg=document.querySelector(".resultImg2 img")
let style2=document.querySelector(".style2")
let resultPage=document.querySelector(".result")
let downloadBtn=document.querySelector("#download")
let resetBtn=document.querySelector("#reset")

function handleUpload(){
    const formdata = new FormData();
    const ApiKey="FdVjhFeVLSbkbEj6Lx6LPWhP"
    formdata.append("image_file",image);
    formdata.append("size","auto");
    fetch("https://api.remove.bg/v1.0/removebg",{
        method: "POST",
    headers: { "X-Api-Key": ApiKey },
    body: formdata,
    })
    .then(function(response){
        return response.blob();
    })
    .then(function(blob){
        style2.style.display="none"
        resultPage.style.display="flex"
        url = URL.createObjectURL(blob)
        GeneratedImg.src=url;
    })
    .catch()
}

innerImage.addEventListener("click",()=>{
    fileInput.click()
})

fileInput.addEventListener("change",()=>{
    image=fileInput.files[0]
    if(!fileInput) return
    let reader = new FileReader();
    reader.onload=(e)=>{
        inputImg.src=`data:${fileInput.type};base64,${e.target.result.split(",")[1]}`
        inputImg.style.display="block"
        icon.style.display="none"
        span.style.display="none"
        OriginalImg.src=`data:${fileInput.type};base64,${e.target.result.split(",")[1]}`
    }
    reader.readAsDataURL(image)
})

uploadBtn.addEventListener("click",()=>{
    handleUpload();
})

function download(){
    fetch(url)
    .then(res=>res.blob())
    .then(file=>{
        let a = document.createElement("a")
        a.href=URL.createObjectURL(file)
        a.download=new Date().getTime();
        a.click();
    })
    .catch()
}
downloadBtn.addEventListener("click",()=>{
    download();
})
resetBtn.addEventListener("click",()=>{
    window.location.reload();
})