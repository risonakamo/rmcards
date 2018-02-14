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

        this.cards;
        this.currentCard=0;

        this.keyControl(doc);
    }

    initinfoButtons()
    {
        this.infoButtons.forEach((i,x)=>{
            i.addEventListener("click",(e)=>{
                this.infoBoxes[x].classList.add("show");
            });
        });
    }

    resetInfoButtons()
    {
        this.infoBoxes[0].classList.remove("show");
        this.infoBoxes[1].classList.remove("show");
        this.infoBoxes[2].classList.remove("show");
        this.infoBoxes[3].classList.remove("show");
        this.infoBoxes[4].classList.remove("show");
    }

    keyControl(doc)
    {
        doc.addEventListener("keydown",(e)=>{
            if (e.key=="ArrowRight")
            {
                this.resetInfoButtons();
            }
        });
    }

    loadData(data)
    {
        this.cards=data;
        this.loadCard(data[0]);
    }

    loadCard(card)
    {
        this.resetInfoButtons();
        this.infoTexts[0].innerText=card.name;
        this.infoTexts[1].innerText=card.material;
        this.infoTexts[2].innerText=card.place;
        this.infoTexts[3].innerText=card.time;
        this.displayImg.src=card.img;

        if (card.note)
        {
            this.infoTexts[4].innerText=card.note;
        }
    }
}

var cardhandler;

function main()
{
    cardhandler=new cardHandler();

    loadCardData("testdata.json",(res)=>{
        console.log(res);
    });
}

function loadCardData(path,callback)
{
    var r=new XMLHttpRequest();
    r.open("GET",file);

    r.onreadystatechange=()=>{
        callback(JSON.parse(r.response).data);
    };

    r.send();
}