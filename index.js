window.onload=main;

class cardHandler
{
    constructor()
    {
        var doc=document;

        this.imgZone=doc.querySelector(".img-zone");
        this.displayImg=this.imgZone.children[0];
        this.navButtons=this.imgZone.querySelectorAll(".nav-button");

        var infoZone=doc.querySelector(".info-zone");
        this.infoBoxes=infoZone.querySelectorAll(".info-box");
        this.infoTexts=infoZone.querySelectorAll(".info-text");
        this.infoButtons=infoZone.querySelectorAll(".hide-label");

        this.initEvents();

        this.cards;
        this.currentCard=0;

        this.keyControl(doc);
    }

    initEvents()
    {
        //show/hide label buttons
        this.infoButtons.forEach((i,x)=>{
            i.addEventListener("click",(e)=>{
                this.infoBoxes[x].classList.add("show");
            });
        });

        this.displayImg.addEventListener("load",()=>{
            this.fitImg();
        });

        window.addEventListener("resize",()=>{
            this.fitImg();
        });

        this.navButtons[0].addEventListener("click",(e)=>{
            this.navigateCard(this.currentCard-1);
        });

        this.navButtons[1].addEventListener("click",(e)=>{
            this.navigateCard(this.currentCard+1);
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
                this.navigateCard(this.currentCard+1);
            }

            else if (e.key=="ArrowLeft")
            {
                this.navigateCard(this.currentCard-1);
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

    navigateCard(pos)
    {
        if (pos>=0 && pos<this.cards.length)
        {
            this.resetInfoButtons();
            this.loadCard(this.cards[pos]);
            this.currentCard=pos;
        }
    }

    fitImg()
    {
        if ((this.imgZone.offsetWidth/this.imgZone.offsetHeight)>(this.displayImg.naturalWidth/this.displayImg.naturalHeight))
        {
            this.displayImg.classList.add("tall");
            this.displayImg.style.marginTop=0;
        }

        else
        {
            this.displayImg.classList.remove("tall");
            this.displayImg.style.marginTop=(this.imgZone.offsetHeight-this.displayImg.offsetHeight)/2+"px";
        }
    }
}

var cardhandler;

function main()
{
    cardhandler=new cardHandler();

    loadCardData("rm-quiz1.json",(res)=>{
        cardhandler.loadData(res);
    });
}

function loadCardData(datafile,callback)
{
    var r=new XMLHttpRequest();
    r.open("GET",datafile);

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(JSON.parse(r.response).data);
        }
    };

    r.send();
}