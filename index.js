window.onload=main;

class cardHandler
{
    constructor()
    {
        var doc=document;
        this.displayImg=doc.querySelector(".img-zone img");

        var infoZone=doc.querySelector(".info-zone");
        this.infoBoxes=infoZone.querySelectorAll(".info-box");
        this.infoTexts=infoZone.querySelectorAll(".info-text");
        this.infoButtons=infoZone.querySelectorAll(".hide-label");
        this.initinfoButtons();
    }

    initinfoButtons()
    {
        this.infoButtons.forEach((i,x)=>{
            i.addEventListener("click",(e)=>{
                this.infoBoxes[x].classList.add("show");
            });
        });
    }
}

var cardhandler;

function main()
{
    var cardhandler=new cardHandler();
}